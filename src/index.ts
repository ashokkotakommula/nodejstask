//import axios and validations
import axios from "axios";
import http from "http"
import {  doBvalidations, validateExpiryNames, validateStateoFIssue } from './validations/validate'

//localhost
const PORT = 8000;

//check kyc results
const kycResults = (value: String) => {
    if(value === "Y") {
        return {
           details: {
            "result": "Success",
            "kycResult": "true"
           }
        }     
    } else if(value === "N") {
        return {
            details: {
                "result": "Success",
                "kycResult": "false"
            }
        }            
    } else if(value === "D" || "S") {
        return {
            details: {
                "result": "Success",
                "code": `"D" or "S"`,
                "message": `"Document Error" or "Server Error"`
            }
        }
    }
}

const server = http.createServer((req, res) => {
    //check route and make post request
   if(req.url === "/checkkyc" && req.method === "POST") {
    let body = '';
    //
    req.on('data', buffer => {
        body += buffer.toString() // convert Buffer to string
        
        //validations
        if( doBvalidations(JSON.parse(buffer.toLocaleString()).birthDate)) {
            res.end(doBvalidations(JSON.parse(buffer.toLocaleString()).birthDate))
        }
        if( validateExpiryNames(JSON.parse(buffer.toLocaleString()).givenName, JSON.parse(buffer.toLocaleString()).familyName, JSON.parse(buffer.toLocaleString()).licenceNumber)) {
            res.end(validateExpiryNames(JSON.parse(buffer.toLocaleString()).givenName, JSON.parse(buffer.toLocaleString()).familyName, JSON.parse(buffer.toLocaleString()).licenceNumber))
        }
        if( validateStateoFIssue(JSON.parse(buffer.toLocaleString()).stateOfIssue)) {
            res.end(validateStateoFIssue(JSON.parse(buffer.toLocaleString()).stateOfIssue))
        }

    });

    req.on('end', async () => {
        const sampleDatafromBody = body;
        
        await axios({
            method: 'post',
            url: 'https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence',
            data: sampleDatafromBody,  
            headers: {
                "Authorization": "Bearer 03aa7ba718da920e0ea362c876505c6df32197940669c5b150711b03650a78cf",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            //console.log(res.data)
            let resText = kycResults(response.data.verificationResultCode)
            const det = resText?.details;
           res.end(JSON.stringify(det))
        })
        .catch(err => {
            console.log("error:", err.message)
        })
      
    });
   } else {
       res.statusCode = 400;
       res.end("bad request")
   }
});

server.listen(PORT, () => {
    console.log("server running on PORT", PORT);
})
