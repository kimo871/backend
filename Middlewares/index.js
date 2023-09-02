const OtpHandler= require("./Otp");

const {SignUp}= require("./SignUp")

const {Check}= require("./Check")

console.log("func",OtpHandler)

module.exports = {
    Otp : OtpHandler ,
    SignUp : SignUp ,
    Check  : Check
}

