const path = require('path')
const express = require('express')
const  app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Stone = require('./models/stone.js')
const User = require('./models/new-user.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded()) //decode forms data
app.use(express.static(path.join(__dirname,'../public')))

console.log(path.join(__dirname,'../public/','index.html'))

const dbURI = 'mongodb+srv://spaghetto:1234@sandbox.szx8f.mongodb.net/?retryWrites=true&w=majority&appName=sandbox'
mongoose.connect(dbURI)
.then(response => console.log('connected to sandbox'))
.catch(err => console.log(err))



app.get('/index',(req,res) => {
        
     Stone.find()
     .then(response =>  {
        res.send(response)
        console.log('got data')
     })
     .catch(err => console.log(err))
     

})
app.post('/signin-data',(req,res)=>{
    const newUser = new User()
    newUser.email = req.body.email
    newUser.password = req.body.password
    console.log(req.body.email,req.body.password)
    let status = ''
    let responseMsg = ''
    newUser.save()
    .then( response => {
        console.log('user signed in successfully')
        if(res.statusCode === 200){
            res.send({status: 200, message: 'account created.'})
           
        }

        
    })
    .catch(err => {
        if(err.code === 11000){
            res.send({status: 11000, message: 'this account already exists.'})
        }
    })

})


app.post('/login', (req,res)=>{
    console.log(req.body)
    
   
    
})

app.listen(5000, ()=>{
    try{
    console.log("listening the server...")
    }catch (err){
        console.log(err)    }
})