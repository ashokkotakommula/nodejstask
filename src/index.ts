//import axios and validations
import axios from "axios";
import {  doBvalidations, validateExpiryNames, validateStateoFIssue } from './validations/validate'

interface userData {
    birthDate : String,
    givenName : String,
    middleName? : String,
    familyName : String,
    licenceNumber : String,
    stateOfIssue :String,
    expiryDate? : String
}

//sample data
const sampleData = {
    "birthDate" : "1985-02-08",
    "givenName" : "James",
    "middleName" : "Robert",
    "familyName" : "Smith",
    "licenceNumber" : "949000",
    "stateOfIssue" : "NSW",
    "expiryDate" : "2020-01-01"
}

//given access token
const accessToken = "Access token here";

//check result *kyc
const keyResults = (value: String) => {
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

//check kyc
const checkKyc = async (infor: userData) => {
    doBvalidations(infor.birthDate)
    validateExpiryNames(infor.givenName, infor.familyName, infor.licenceNumber)
    validateStateoFIssue(infor.stateOfIssue)
    await axios({
        method: 'post',
        url: 'https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence',
        data: infor,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type":" application/json"
        }
    })
    .then((res) =>{ 
        // console.log(res.data)
        console.log(keyResults(res.data.verificationResultCode))
    })
    .catch((err) => console.log(err.message))
}

checkKyc(sampleData)
