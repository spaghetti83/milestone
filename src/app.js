const express = require('express')
const path = require('path')
const  app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

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
          "date": "2005-10-10",
          "event": "10k race personal best",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID": 2
        },
        {
          "id": 123,
          "date": "2011-05-21",
          "event": "First half marathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID": 2
        },
        {
          "id": 123,
          "date": "2018-12-05",
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