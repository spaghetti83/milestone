const express = require('express')
const  app = express()
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors())
app.use(express.json())

const dbURI = 'mongodb+srv://spaghetto:1234@sandbox.szx8f.mongodb.net/?retryWrites=true&w=majority&appName=sandbox'
mongoose.connect(dbURI)
.then(response => console.log(response))
.catch(err => console.log(err))



app.get('/',(req,res,next) => {
    const myData = [
        {
          "id": 123,
          "date": "2000-04-15",
          "event": "First 5k race completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID": 2
        },
        {
          "id": 123,
          "date": "2001-05-18",
          "event": "10k race personal best",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID": 2
        },
        {
          "id": 123,
          "date": "2002-02-18",
          "event": "First half marathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID": 2
        },
        {
          "id": 123,
          "date": "1994-03-18",
          "event": "First marathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID": 2
        },
        {
          "id": 123,
          "date": "2024-07-02",
          "event": "Ultramarathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID": 2
        }
      ]

      res.send(myData)
})


app.listen(5000, ()=>{
    console.log("server in ascolto...")
})