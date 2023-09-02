import  mongoose from "mongoose"

let Category_scheme= new mongoose.Schema({
    category : {type:String , required:true , unique:true},
    Description : {type:String }
})



let Category = new mongoose.model("Category",Category_scheme)

Category.updateOne({category:"Sales & Business Development"},{$unset:{"jobs":""}}).then(res=>console.log(res))




export default Category