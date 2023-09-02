import {Poster,Seeker} from "../Models/index.js"

export default Check = (req,res,next)=>{
    const y = req.url
    if(y.startsWith("/employee/")){
      req.role = "Seeker";
    }
    else if(y.startsWith("/employer/")){
      req.role = "Poster";
    }
    next();
   };