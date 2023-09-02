import mongoose from "mongoose"
import pkg from 'dotenv';
const {dotenv} = pkg;
dotenv.config({path:"../Config/.env"})
import {v4 as uuidv4} from "uuid"
let RefreshTokenscheme= new mongoose.Schema({
    token:  {type:String , required:true , unique:true},
    expiredAt : {type:Date , required:true},
})

RefreshTokenscheme.statics.createToken = async function (){
    const Token = uuidv4();
    
    let Token_Model = new this({
      token : Token ,
      expiredAt : new Date().getTime()+86400000
    })
  
    try{
      await Token_Model.save()
      return Token_Model;
    }
    catch(err){
      return Error("dd")
    }
  
  }


  RefreshTokenscheme.statics.deleteToken = function(token){
    return RefreshToken.deleteOne({token:token})
  }


  let RefreshToken = new mongoose.model("RefreshToken",RefreshTokenscheme)


module.exports = RefreshToken