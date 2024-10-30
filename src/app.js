const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Stone = require('./models/stone.js')
const Milestone = require('./models/milestone.js')
const User = require('./models/new-user.js')
const userData = require('./models/user-data.js')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded()) //decode forms data
app.use(express.static(path.join(__dirname, '../public')))

console.log(path.join(__dirname, '../public/', 'index.html'))


//CONNECTIONO TO THE DATABASE
const dbURI = 'mongodb+srv://spaghetto:1234@sandbox.szx8f.mongodb.net/?retryWrites=true&w=majority&appName=sandbox'
mongoose.connect(dbURI)
    .then(response => console.log('connected to sandbox'))
    .catch(err => console.log(err))
//NEW MONGODB-STORE TO STORE THE SESSIONS IN MONGODB (CONNECT-MONGODB-SESSION)
const store = new MongoDbStore({
    uri: dbURI,
    databaseName: 'test',
    collection: 'session'
})
//START A SESSION IN EXPRESS-SESSION
app.use(session({
    secret: 'secret string to change later',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false},
    store: store
}))
//CHECK FOR SESSIONS WITH EXPRESS.SESSION
const checkSession = (req,res,next) => {
    console.log('CHECK MATCH:',req.session.userID)
    if (req.session.userID){
        res.send({status:200, message: 'session found'})
        next()
    }else{
        res.send({status: 11000, message: 'no session found, log-in before'})
    }
 
   
}

app.get('/index',checkSession, (req, res) => {
    
    Stone.find()
    .then(response => {
        res.send(response)
        console.log('got data', response)
    })
    .catch(err => console.log(err)) 
  
    console.log('[...code to show all the milestones...]')
    

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
                res.send({ status: 11000, message: 'this account already exists.' })
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
    newUserData.stonesNumber = 0

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
        res.send({ status: 11000, message: 'this account already exists.' })
    })
    
})

app.post('/signin-data',saveUserCrediential,saveUserData,(req,res)=>{
    console.log(req.body)
    res.send({ status: 200, message: 'Account created' })

})


app.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            req.session.userID = user._id
            console.log('USER', user._id)
            res.send({ status: 200, message: 'user found' })
        }else{
            res.send({status: 11000, message: 'user not found'})
        }
    })
    .catch(err => console.log(err))

})

app.get('/logout',(req,res)=>{
    req.session.destroy()
   console.log('session destroyed')
   
    
})


app.post('/new-milestone',(req,res)=>{
    res.send({message: req.body} )
})


app.listen(5000, () => {
    try {
        console.log("listening the server...")
    } catch (err) {
        console.log(err)
    }
})