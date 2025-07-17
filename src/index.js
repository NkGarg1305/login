const express= require('express');
const path= require('path');
const bycrypt= require('bcrypt');
const collection= require("./config");
const { urlencoded } = require('body-parser');

const app=express();
// convert data to json format
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set('view engine','ejs');

app.use(express.static('public'))
app.get("/",(req,res)=>{
    res.render("login");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

//register user
app.post("/signup",async (req, res)=>{
    const data={
        name:req.body.username,
        password: req.body.password
    }

    // check if user already exists
    const checker= await collection.findOne({name: data.name});
    if(checker){
        res.send("user already exists, please try another username");
    }else{
        // hashing the password
        const saltRounds=10;
        const hashpasswrd=await bycrypt.hash(data.password,saltRounds);
        data.password=hashpasswrd;
        const Userdata=await collection.insertMany(data);
        console.log(Userdata);
    }
})

//login user 

app.post("/login",async (req,res)=>{
    try{
        const check= await collection.findOne({name: req.body.username})
        if(! check){
            res.send("username cannot be found")
        }
        // compare hashed psswd with plain text
        const pswdMatch= await bycrypt.compare(req.body.password,check.password);
        if(pswdMatch){
            res.render("home")
        }else{
            res.send("wrong password")
        }
    }catch{
        res.send("wrong details")
    }
})

app.listen(5000,()=>{
    console.log("Server is running....")
})