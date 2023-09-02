const {Poster,Seeker} = require("../Models/index")

module.exports.Check = (req,res,next)=>{
    const y = req.url
    if(y.startsWith("/employee/")){
      req.role = "Seeker";
    }
    else if(y.startsWith("/employer/")){
      req.role = "Poster";
    }
    next();
   };