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
            "kycResult": true
        }      
    } else if(value === "N") {
        return {
            "kycResult": false
        }            
    } else if(value === "D" || "S") {
        return {
            code: `"D" or "S"`,
            message: `"Document Error" or "Server Error"`
        }
    }
}

const server = http.createServer((req, res) => {
   if(req.url === "/checkkyc" && req.method === "POST") {
    let body = '';
    req.on('data', buffer => {
        body += buffer.toString() // convert Buffer to string
        //validations
        doBvalidations(JSON.parse(buffer.toLocaleString()).birthDate);
        validateExpiryNames(JSON.parse(buffer.toLocaleString()).givenName, JSON.parse(buffer.toLocaleString()).familyName, JSON.parse(buffer.toLocaleString()).licenceNumber)
        validateStateoFIssue(JSON.parse(buffer.toLocaleString()).stateOfIssue)   
    });

    req.on('end', async () => {
        const sampleDatafromBody = body;
        const accessToken = req.headers.authorization;
        const contentType = req.headers["content-type"];
        await axios({
            method: 'post',
            url: 'https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence',
            data: sampleDatafromBody, 
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": `${contentType}`
            }
        })
        .then(response => {
            //console.log(res.data)
            
            console.log(kycResults(response.data.verificationResultCode))
            res.statusCode = 200;
            res.end(JSON.stringify(response.data))
        })
        .catch(err => {
            console.log(err.message)
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
