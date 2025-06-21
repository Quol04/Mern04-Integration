const mongoose=require('mongoose');

const userschema= new mongoose.Schema({
    email: {type:String, required:true, unique },
    password: {type:String, required:true},
    role: {type:String, enum:["Admin","Developer"], default:"Developer" }
})




module.exports=  mongoose.model("User", userschema)