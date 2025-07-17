const { log } = require('console');
const mongoose= require('mongoose');
const { type } = require('os');
const connect= mongoose.connect("mongodb://localhost:27017/crud")

connect.then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log(err);
})

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        reqired: true
    },
    password:{
        type:String,
        reqired: true
    }
})

const collection= new mongoose.model("users",loginSchema);

module.exports= collection;