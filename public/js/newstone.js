
const form = document.getElementById('form-new-stone')
const selectInput = document.getElementById('milestones-selection')
const title = document.getElementById('title')
const eventDescription = document.getElementById('event')
const eventDate = document.getElementById('event-date')
const addBtn = document.getElementById('add-btn')

let milestonesData = {}
let milestonesList = []



const fetchMilestoneData = ()=>{
    fetch('/index',{
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then( response => response.json())
    .then( data => {
      for (let i = 0; i < data.length; i++) {
        let newOption = document.createElement('option')
        newOption.value = data[i]._id
        newOption.text = data[i].name
        selectInput.add(newOption)
      }
      
      
    })
    .catch(err => console.log('Error fetching Milestones', err))
  }
  fetchMilestoneData()
  

  addBtn.addEventListener('submit', (event)=>{
   event.preventDefault()
    console.log(title.value,eventDescription.value,date.value,selectInput.value)
    fetch('/new-stone',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title.value, 
            event: eventDescription.value, 
            date: eventDate.value, 
            milestoneID: selectInput.value })
    })
    .then(response => response.json)
    .then(data => console.log(data))
    .catch(err => console.log(err))
  })

