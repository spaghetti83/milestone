const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Stone = require('./models/stone.js')
const User = require('./models/new-user.js')
const userData = require('./models/user-data.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded()) //decode forms data
app.use(express.static(path.join(__dirname, '../public')))

console.log(path.join(__dirname, '../public/', 'index.html'))

const dbURI = 'mongodb+srv://spaghetto:1234@sandbox.szx8f.mongodb.net/?retryWrites=true&w=majority&appName=sandbox'
mongoose.connect(dbURI)
    .then(response => console.log('connected to sandbox'))
    .catch(err => console.log(err))



app.get('/index', (req, res) => {

    Stone.find()
        .then(response => {
            res.send(response)
            console.log('got data')
        })
        .catch(err => console.log(err))


})




const saveUserCrediential = ((req, res,next) => {
    /* data sent from the form the client filled */
    const newUser = new User()
    newUser.email = req.body.email
    newUser.password = req.body.password
    console.log(req.body.email, req.body.password)

    newUser.save()
        .then(response => {
            
            if (res.statusCode === 200) {
                const credentialResponse = { status: 200, message: 'account created.' }
                console.log('user signed in successfully')
                next()
            }
        })
        .catch(err => {
            if (err.code === 11000) {
                const credentialErr = { status: 11000, message: 'this account already exists.' }
            }
        })
        
})
const saveUserData = ((req, res,next) => {
    /* data generated to generate the user-data database */
    const newUserData = new userData()
    newUserData.email = req.body.email
    newUserData.nickname = ''
    newUserData.pictureID = ''
    newUserData.milestonesIDs = ''
    newUserData.stonesNumber = ''

    newUserData.save()
    .then(response => {
        
        if (res.statusCode === 200) {
            response = { status: 200, message: 'user data created.' }
            console.log('user data saved')
            next()
        }
    })
    .catch(err => {
        console.log('ERROR GENERATING USER DATA!', err)
        response = err
        
    })
    
})

app.post('/signin-data',saveUserCrediential,saveUserData,(req,res)=>{
    console.log(req.body)
    res.send({ status: 100, message: 'Creation Completed' })

})


app.get('/login', (req, res) => {
    


})

app.listen(5000, () => {
    try {
        console.log("listening the server...")
    } catch (err) {
        console.log(err)
    }
})