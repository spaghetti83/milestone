const express = require('express')
const  app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Stone = require('./models/stone.js')

app.use(cors())
app.use(express.json())

const dbURI = 'mongodb+srv://spaghetto:1234@sandbox.szx8f.mongodb.net/?retryWrites=true&w=majority&appName=sandbox'
mongoose.connect(dbURI)
.then(response => console.log('connected to sandbox'))
.catch(err => console.log(err))



app.get('/new-stone',(req,res) => {
        
     Stone.find()
     .then(response =>  {
        res.send(response)
        console.log('got data')
     })
     .catch(err => console.log(err))
     

})
/* app.get('/get-stones',(req,res)=>{
    const allData =new Stone()
    allData.find()
}) */ 

app.listen(5000, ()=>{
    console.log("listening the server...")
})