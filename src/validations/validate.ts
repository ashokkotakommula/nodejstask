export const doBvalidations = (dob: String) => {
    const dobRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    const matchDob = function() {
        return dob.match(dobRegex)
    }
    if(matchDob() === null) {
        console.log("Enter valid Date of Birth")
        return
    }
}

export const validateExpiryNames = (fname: String, lName: String, licenceNo: String ) => {
    if(fname === "" || fname.length > 100) {
        console.log("Enter valid first name")
        return
    } 
    if(lName === "" || lName.length > 100) {
        console.log("Enter valid last name")
        return
    }
    if(licenceNo === "") {
        console.log("Enter valid Licence number")
        return
    }
    
}

export const validateStateoFIssue = (issueState: String) => {
    const listOfStates = ["NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"]
    const bool = listOfStates.find(state => state === issueState)
    if(bool === undefined) {
        console.log('Enter a valid state')
        return
    }
}
