//imprt mongoose
const mongoose=require("mongoose")

// state connection string
mongoose.connect('mongodb://127.0.0.1:27017/bankServer',{useNewUrlParser:true})

// model(schema)creation (model name musy be singular of collection and fisrt letter capital)
//schema means feilds and values
const User=mongoose.model('User',{
    acno:Number,
     username:String, 
     password:String, 
     balance:Number, 
     transaction: [] 
})

module.exports={
    User
}