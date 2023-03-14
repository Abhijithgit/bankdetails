// import dataservice file
const dataservice=require('./service/dataservice')

// import cors

const cors=require("cors")

//import json web token
const jwt = require("jsonwebtoken")


// import express

const express=require("express");
// const req = require("express/lib/request");

// // create app using express
 const app=express()


//  conection string to frontend intergration

app.use(cors({orgin:'http://localhost:4200'}))

//  to parse json data from from req body
app.use(express.json())




//middleware
const jwtmiddleware = (req, res, next) => {
    try {
       const token = req.headers['access_token']
       //verify token
       const data = jwt.verify(token, "secretkey1")
       //to continue to the next step
       next()
    }
    catch {
       res.status(422).json({
          statuscode:422,
          status:false,
          message:"Please LogIn First"
       })
    }
 
 }

//  register - post

 
app.post('/register',(req,res)=>{
    dataservice.register(req.body.user,req.body.pass,req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
//    convert object to json and send as response
//    if(result){
//     res.send("registered")
//    }
//    else{
//     res.send("user already exists")
//    }
    // console.log(req.body);
    // res.send("success")
    // res.status(result.statusCode).json(result)
    
})
// //request

// app.get('/',(req,res)=>{
//     res.send('Get Method...123')
// })
// app.put('/',(req,res)=>{
//     res.send('Put Method...123')
// })
// app.patch('/',(req,res)=>{
//     res.send('Patch Method...123')
// })
// app.delete('/',(req,res)=>{
//     res.send('Delete Method...123')
// })


//login

app.post('/login',(req,res)=>{
    dataservice.login(req.body.acno,req.body.pass).then(result=>{
        res.status(result.statusCode).json(result)
     })
})

// deposit
app.post('/deposit',(req,res)=>{
    dataservice.deposit(req.body.acnum,req.body.password,req.body.amount).then(result=>{

    res.status(result.statusCode).json(result)
})
})
//withdraw

app.post('/withdraw', jwtmiddleware, (req, res) => {


    dataservice.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result=>{
        res.status(result.statuscode).json(result)
    })
 
    
 
 
 })
 
 //get transaction
 
 app.post('/transaction', jwtmiddleware, (req, res) => {
 
 
     dataservice.getTransaction(req.body.acno).then(result=>{
        res.status(result.statuscode).json(result)
     })
 
    
 
 
 })
//  delete
app.delete('/delete/:acno',jwtmiddleware,(req,res)=>{
    dataservice.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })
})
 

// // create port
app.listen(3000,()=>{console.log("server started at port number 3000");})
    
    