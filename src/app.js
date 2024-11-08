const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Stone = require('./models/stone.js')
const Milestone = require('./models/milestone.js')
const User = require('./models/new-user.js')
const userData = require('./models/user-data.js')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const ejs = require('ejs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded()) //decode forms data
app.use(express.static(path.join(__dirname, '../public')))
/* setting EJS */
app.set('stone-post','./view/stone-post.ejs')
app.set('view engine','ejs')
///////////////////////////
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



const saveUserCrediential = ((req, res, next) => {
    /* session regeneration */
    req.session.regenerate(err => {
        if (err) {
            console.log('error regenerating session', err)
        } else {
            console.log('session successfully regenerated')
            //res.send({ status: 200, message: 'logged out, redirecting to log in...' })
        }
    })
    /* creating salt and hash to store the token */
    const randomRound = Math.floor(Math.random() * 10)
    bcrypt.genSalt(randomRound, (err, salt) => {
        console.log('creating salt')
        if (err) {
            console.log('error creating salt', err)
        } else {
            console.log('creating hash')
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    console.log('error creating hash', err)

                } else {
                    console.log('saving data', salt, hash)

                    /* data sent from the form the client has filled */
                    const newUser = new User()
                    newUser.email = req.body.email
                    newUser.hash = hash
                    newUser.salt = salt
                    newUser.save()
                        .then(response => {
                            console.log(response)
                            if (res.statusCode === 200) {
                                console.log('user signed in successfully')
                                ////////////////////////
                                /* log-in before user-data has been saved */
                                console.log('logging in:', req.body.email)
                                console.log('session:', req.session)
                                User.findOne({ email: req.body.email })
                                    .then(user => {
                                        console.log('user value', user)
                                        if (user) {
                                            req.session.userID = user._id
                                            req.session.userEmail = user.email
                                            console.log('USER', user._id)

                                            next()
                                        } else {
                                            console.log('user not found')
                                            res.send({ status: 11000, message: 'user not found' })
                                        }
                                    })
                                    .catch(err => console.log(err))
                                /////////////////////////
                                
                            }
                        })
                        .catch(err => {
                            if (err.code === 11000) {
                                const credentialErr = { status: 11000, message: 'this account already exists.' }
                                res.send({ status: 11000, message: 'this account already exists.' })
                            }
                        })

                }

            })
        }

    })


})


const logInMiddleware = (req,res,next)=>{
    console.log('logging in:', req.body.email)
    console.log('session:', req.session)
    User.findOne({email: req.body.email})
    .then(user => {
        console.log('user value', user)
        if(user){
            bcrypt.compare(req.body.password, user.hash, (err, match) => {
                if (match) {
                    req.session.userID = user._id
                    req.session.userEmail = user.email
                    console.log('USER', user._id)
                    next()
                } else {
                    console.log('error from login',err)
                    res.send({ status: 401, message: 'email or password incorrect' })
                }
            })
            
            
            
        }else{
            console.log('user not found')
            res.send({status: 11000, message: 'user not found'})
        }
    })
    .catch(err => console.log(err))
}


const saveUserData = ((req, res, next) => {
    /* generate data for the user-data database */
    console.log('body datas', req.body)
    const newUserData = new userData()
    newUserData.email = req.body.email
    newUserData.nickname = ''
    newUserData.pictureID = ''
    newUserData.milestonesIDs = ''
    newUserData.stonesNumber = 0
    newUserData.save()
        .then(response => {

            console.log('user data saved')
            next()

        })
        .catch(err => {
            console.log('ERROR GENERATING USER DATA!', err)
            //res.send({ status: 11000, message: 'this account already exists.' })
        })

})




//CHECK FOR SESSIONS WITH EXPRESS.SESSION
const checkSession = (req,res,next) => {
    console.log('CHECK MATCH:',req.session.userID)
    if (req.session.userID === undefined){
        res.send({status: 500, message: 'no session found, log-in before'})
    }
    if (req.session.userID){
        console.log('session found',req.session.userID)
        next()
    }else{
        res.send({status: 11000, message: 'no session found, log-in before'})
    }
 
   
}


app.post('/signin-data',saveUserCrediential,saveUserData,(req,res)=>{
    console.log(req.body)
    res.send({ status: 200, message: 'Account created' })
})

app.post('/login',logInMiddleware,(req, res) => {
    res.send({ status: 200, message: 'user found' })
})

app.get('/logout',(req,res)=>{
    req.session.regenerate( err => {
        if(err){
            console.log('error regenerating session',err)
        }else{
            console.log('session successfully regenrated')
            res.send({status: 200, message: 'logged out, redirecting to log in...'})
        }
    })
    
})

app.get('/check-session',checkSession,(req,res)=>{
    res.send({status: 'checkOK', message: req.session.userEmail})
})  

app.get('/index',checkSession, (req, res) => {
    
      Milestone.find()
      .then(response => {
          res.send(JSON.stringify(response))
          console.log('all data loaded')
      })
      .catch(err => console.log(err)) 
    
     
      
  
  })

app.post('/new-milestone',(req,res)=>{
    //If the user logged in create a new milestone
    if(req.session.userID){
        const newMilestone = new Milestone()
        newMilestone.ownerID = req.session.userID
        newMilestone.name = req.body.title
        newMilestone.description = req.body.description
        newMilestone.startingYear = req.body.year
        newMilestone.color = req.body.color
        newMilestone.save()
        .then(response => {
            console.log(response)
            User.findOne({_id: response.ownerID})
                .then(response => console.log(response))
                .catch(err => console.log(err))
            res.send(response)
        })
        .catch(err => console.log(err))
    }else{
        res.redirect('/login')
    }
    ///res.send({message: req.body} )
})

app.get('/find-userdata',(req,res)=>{
    console.log('session data',req.session.userID)
    Milestone.find({ownerID: req.session.userID})
    .then(milestones => {
       res.send(JSON.stringify(milestones))
       console.log('only USER data loaded', milestones)
    })
    .catch(err => console.log(err))
})

app.post('/new-stone', checkSession,(req,res)=> {
    const addNewStone = {
        date: req.body.date,
        event: req.body.event,
        title: req.body.title,
        milestoneID: req.body.milestoneID,
        userID: req.session.userID
    }
    console.log(addNewStone)
    console.log('Milestone ID', req.body.milestoneID)
    //Milestone.findOne({id: req.body.id})
    Milestone.findByIdAndUpdate(
        req.body.milestoneID,
        { $push: {stones: addNewStone}},
        {new: true}
    ).then(response => {
       res.send(response)
    })
    .catch(err => {
        console.log(err)
        res.redirect('/newstone.html')
    })
   
})
/* PROBLEMS!! >:( */
app.route('/view-stone')
    .post((req,res)=> {
        console.log('post',req.body)
        res.render('stone-post',req.body)
    })



app.listen(5000, () => {
    try {
        console.log("listening the server...")
    } catch (err) {
        console.log(err)
    }
})