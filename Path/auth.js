
const express = require('express')

const Router= express.Router()

const {SignUp,Otp} = require("../Middlewares/index.js")

const SignUpController= require("../Controllers/SignUp.js")

const SignInController = require("../Controllers/SignIn.js")

const Authentication = require("../Middlewares/Authnetication.js")
const { RefreshToken, User } = require("../Models/index.js")
const  { jwtDecode } = require("jwt-decode")


Router.post("/SignUp",[SignUp],SignUpController)

Router.post("/refresh-token",async (req,res)=>{
    let {refresh_token,Email} = req.cookies ;
    if(!refresh_token && !Email) res.status(401).send()
    const result = await RefreshToken.find({token:refresh_token}).then(res=>res)
    if(result){
        const token = jwt.sign({Email:Email},SECRET_KEY,{expiresIn:EXP_PER})
        res.status(200)
        res.cookie("access-token",token,{path:"/"})
        res.send()
    }
    else{
        res.status(400)
        res.send()
    }
     
})

Router.get("/Logout",(req,res)=>{
    console.log(req.headers)
    res.send("ok")
})




Router.post("/SignIn",SignInController)

Router.post("/Logout",Authentication,(req,res)=>{
    let {access_token , refresh_token} = req.cookies;
    RefreshToken.deleteOne({token:refresh_token}).then((result)=> res.status(200).send()).catch(err=> res.status(401).send())

})





Router.get("/login",Authentication,(req,res)=>{
    const {user_id} = req.cookies;
    User.findOne({_id:user_id}).then(result=>{
        //let obj=Object.assign({},{_id:result._id,Name:result.Name,Email:result.Email,DateOfBirth:result.DateOfBirth,Phone:result.Phone,Role:result.Role,Image:result.Image});
        let obj  = result;
        if(obj)  {delete obj.Password; delete obj.Token}  ;
        res.status(200);
    res.cookie("access_token",req.token,{path:"/"})
    res.json({"user":obj});
}).catch(err=> res.status(400).send())

})

   





module.exports = Router