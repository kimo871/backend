import  mongoose from "mongoose"
import  bcrypt from "bcrypt"

import  {User} from "../Models/index.js"

export default SignUp =  async (req,res,next)=>{
   const {Email,Phone , Name , Password} = req.body

   const Check  = await User.CheckExisted(Email,Phone)

   let errors=[];
   
   Check.forEach((check)=>{
     if(check instanceof Error) errors.push(check.message)
   }) 

   if(errors.length) {res.status(409); console.log(errors);return res.json({err:errors})}

   else {return next();}
}

  

    