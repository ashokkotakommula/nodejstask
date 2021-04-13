export const doBvalidations =  (dob: String) => {
    const dobRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    const matchDob = function() {
        return dob.match(dobRegex)
    }
    if(matchDob() === null) {
        return "Enter valid Date of Birth"
        
    }
}

export const validateExpiryNames = (fname: String, lName: String, licenceNo: String ) => {
    if(fname === "" || fname.length > 100) {
        return "Enter valid first name"
    } 
    if(lName === "" || lName.length > 100) {
        return "Enter valid last name"
    }
    if(licenceNo === "") {
        return "Enter valid Licence number"
    }
    
}

export const validateStateoFIssue = (issueState: String) => {
    const listOfStates = ["NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"]
    const bool = listOfStates.find(state => state === issueState)
    if(bool === undefined) {
        return 'Enter a valid state'
        
    }
}
