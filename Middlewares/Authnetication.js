import  jwt from "jsonwebtoken"


import  {decode} from "jwt-decode"
import { RefreshToken } from "../Models/index.js"

import  {SECRET_KEY , EXP_PER} from "../Config/Config.js"

let Authenticate = (req,res,next)=>{
   
   let {access_token,refresh_token,email} = req.cookies
   req.token = access_token;
   

    if(!access_token || !refresh_token || !email) return res.status(403).json({err:["Invalid"]})
  
    jwt.verify(access_token,SECRET_KEY,(err,decoded)=>{
        if(err){
          RefreshToken.find({token:refresh_token}).then(result=> {
            if(result){
             const token = jwt.sign({Email:email},SECRET_KEY,{expiresIn:EXP_PER});
             req.token=token;
            }
          })
        }
        return next();
       
    });

}

export default  Authenticate;