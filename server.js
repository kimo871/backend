const express = require('express')

const process = require('process')

const cors =  require('cors')


const mongoose = require('mongoose')

const Router = require("./Path/auth.js")

const Router2 = require("./Path/employer.js")

const path = require("path")

const {PORT_NO , DB_USERNAME , DB_PASSWORD} = require("./Config/Config.js")
console.log(DB_USERNAME,DB_PASSWORD)

const cookie = require("cookie-parser")

const session = require("express-session")

const Authentication = require("./Middlewares/Authnetication.js")
const { User, RefreshToken , Role , Category , City  ,Country , Job, Application } = require("./Models/index.js")

 
const  app = express();


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.vgv6oyv.mongodb.net/?retryWrites=true&w=majority`;



app.use(express.json({limit: "50mb", extended: true, parameterLimit:50000}))

app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


app.use(cookie())

app.use(session({
    secret:"secret",
    resave:false,
    cookie:{
        secure:true,
        maxAge:1000*60*60*24,
        sameSite:"lax",
        httpOnly:true
    }
}))


app.post("/Logout",Authentication,(req,res)=>{
    let {email,refresh_token} = req.cookies;
    Promise.all([User.LogOut(email),RefreshToken.deleteToken(refresh_token)]).then(()=>{
        res.status(200);
        return res.send("Logout Successfully")
    }).catch(err=>{
        res.status(402)
        return res.send("Fauled Try Again!")
    })
})



app.use("/auth",Router)

app.use("/role",Router2)



app.post("/Profile",[Authentication],(req,res)=>{
    res.status(200).cookie("access_token",req.token);
    return res.send();
})


app.get("/categories",async(req,res)=>{
  const result = await Category.find({}).then(res=>{
    const map = new Map();
    res.forEach((item)=> map.set(item.category,item));
    return map;
  })
  let y = Object.fromEntries(result);
  return res.json({"categories":y})
})

app.get("/job-titles",async(req,res)=>{
    const result = await Role.find({}).then(res=>{
        const map = new Map();
        res.forEach((item)=> map.set(item.Title,item));
        
        return map;
      })
      let y = Object.fromEntries(result);
      return res.json({"jobs":y})
})





app.get("/countries/",async(req,res)=>{
    
    const result = await Country.find({}).then(res=>{
        const map = new Map();
        res.forEach((item)=> map.set(item.Name,item));
       
        return map;
      })
      let y = Object.fromEntries(result);
      return res.json({"countries":y})
})

app.get("/cities/",async(req,res)=>{
    const {country} = req.query
    console.log(req.query)
    let result;
   
        result = await City.find({country:country}).then(res=>{
        const map = new Map();
        res.forEach((item)=> map.set(item.Name,item));
        return map;
      })
      let y = Object.fromEntries(result);
      return res.json({"cities":y})
})

app.get("/jobs/",async(req,res)=>{
    let {page_no=1 , limit=5 , Country='none' , City='none' , Category='none' , Title='none'}=req.query;

    let obj = {Country:Country , City:City , Title:Title , Category:Category}
    

    Object.keys(obj).forEach((item)=> obj[item] === "none" ? delete obj[item]: false);
    console.log(obj)

    let count_doc = await Job.countDocuments(obj).then(res=>res);
    let total_no_pages = Math.ceil(count_doc/limit);


    let result = await Job.find(obj).skip((page_no-1)*limit*1).limit(limit*1).populate("Company","Name Image ").populate("Country").populate("City").populate("Title").populate("Category").then(res=>res);
    if(result){
        res.status(200)
        res.json({"jobs":result,
                  "page_no":page_no,
                  "count_doc":count_doc,
                  "total_no_pages":total_no_pages})
    }
    else{
        res.status(400)
        res.send()
    }
})

app.get("/job/",async(req,res)=>{
    const {id}=req.query
    console.log(id)
        let job = await Job.findOne({_id:id}).populate("Company").populate("Category").populate("City").populate("Country").populate("Title").then(res=>res)
        if(job){ console.log(job); res.status(200).json({"jobs":[job]})}
        else res.sendStatus(500);
    
})



app.get("/jobs/app/",async(req,res)=>{
    const {id} = req.query;
    console.log(id)
    await Job.find({Company:id})
    .populate("Company","Name Image ")
    .populate("Country")
    .populate("City")
    .populate("Title").populate("Category")
    .then(res=>res).then((result)=>{ res.status(200); res.json({"jobs":result}); })
    .catch((err)=>{ res.status(500); res.json({"err":["Internal Server Error !"]})})
      
 })





app.listen(PORT_NO , ()=>{

    console.log(`Server Listening Successfully on ${PORT_NO} !`)
    mongoose.connect(uri).then(()=>{
       console.log("Database Connected !")
    }).catch(err=>{
        console.log(err.message)
    })
})

module.exports = {
    PORT_NO : process.env.PORT_NO,

    DB_URL : process.env.DB_URL,
    
    DB_NAME : process.env.DB_NAME,
    
    HASH_KEY : process.env.HASH_KEY,
    
    EXP_PER : process.env.EXP_PER,
    
    SECRET_KEY : process.env.SECRET_KEY,
    
    MAIL_USERNAME :  process.env.MAIL_USERNAME,
    
    MAIL_PASSWORD : process.env.MAIL_PASSWORD,
    
    TIME_STAMP :  process.env.TIME_STAMP
    
}

