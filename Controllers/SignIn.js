import { User ,  RefreshToken } from "../Models/index.js"
import  bcrypt  from "bcrypt"
import  jwt from "jsonwebtoken"

import {SECRET_KEY , EXP_PER} from "../Config/Config.js"

console.log(process.env.SECRET_KEY)

const SignIn =  async(req,res)=>{
    const {email , password} = req.body
    //let [access_token,refresh_token] = req.headers.cookie.split(";")
    //access_token = access_token.split("=")[1]
    //refresh_token = refresh_token.split("=")[1]
    //console.log(access_token,refresh_token)

    try{

    const result  = await User.findOne({Email:email});
    console.log(result)

    if(result){
        const match =  bcrypt.compareSync(password , result.Password)
        if(match){
           
            const refresh = await RefreshToken.createToken();
            let token;

          if(refresh){
            token = jwt.sign({Email:email},SECRET_KEY,{expiresIn:EXP_PER})
            const ans = await User.updateOne({Email:email},{$set:{"Token":refresh}})
          }

          else return res.status(408);

            res.status(200)
            res.cookie("access_token",token,{path:"/"})
            res.cookie("refresh_token",refresh.token,{path:"/"})
            res.cookie("email",email,{path:"/"})
            res.cookie("user_id",result._id,{path:"/"})

            let obj = Object.assign({},result._doc)
            delete obj.Password; delete obj.Token;
            console.log(obj)

            return res.json({"user":obj})
        }

          else{
            res.status(401)
            return res.json({"err":["Invalid Credentials"]})
          }
            
        }
        
    else{
         res.status(400)
         return res.json({"err":[" Account doesnot exist !"]})
    }

}
catch(err){
    console.log(err);
}

}

export default SignIn

