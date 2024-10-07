const userPic = document.getElementById('user-pic')
const titleElement = document.getElementById('title')
const subTitleElement  = document.getElementById('sub-title')
const stonesCounter = document.getElementById('counter')
const body = document.querySelector('body')



/* add fetch data to get userMilestones values. the actual values will be stored in a MongoDB */

const userMilestones = [
    {
      "user_id": 123,
      "milestoneID": 1,
      "milestone_start_year": 2023,
      "color": "blue",
      "title": "Nature Photographer",
      "subtitle": "Capturing the beauty of the world, one shot at a time.",
      "photo_path": "pictures/IMG_20180930_180137.jpg",
      "stones": 33,
      "timestamp": "2024-10-06T22:40:00Z"
    },
    {
      "user_id": 124,
      "milestoneID": 2,
      "milestone_start_year": 2022,
      "color": "green",
      "title": "Track&Field Runner",
      "subtitle": "Never give up.",
      "photo_path": "pictures/PXL_20240928_153411328.jpg",
      "stones": 107,
      "timestamp": "2024-10-07T22:40:00Z"
    }
  ]

let { userID, milestoneID,milestone_start_year, color, title, subtitle, photo_path, stones,timestamp} = userMilestones

const milestoneData = [
        {
          "id": 123,
          "date": "15-04-2000",
          "event": "First 5k race completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z"
        },
        {
          "id": 123,
          "date": "10-10-2005",
          "event": "10k race personal best",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z"
        },
        {
          "id": 123,
          "date": "21-05-2011",
          "event": "First half marathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z"
        },
        {
          "id": 123,
          "date": "05-12-2018",
          "event": "First marathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z"
        },
        {
          "id": 123,
          "date": "02-07-2024",
          "event": "Ultramarathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z"
        }
      ]

let {ev_id,ev_date,ev_event,ev_milestone,ev_color,ev_timestamp} = milestoneData

const calculateTime = (start = 2000) =>{
     const today = new Date()
     const startY = new Date(`01-01-${start}`)
    let currentYear = today.getFullYear()
    let difference = currentYear - startY.getFullYear()
    return difference
}




const createUserMilestone = () => {
    const bodyElement = document.createElement('div')
    const childrenElements =[]
    userMilestones.forEach((el,index) => {        
        console.log('index:', index)
        const milestoneLayout = `
                <div class="milestone-container" >
                        <div class="milestone-header">
                            <div class="picture">
                                <img class="user-pic" id="user-pic" src=${el.photo_path} alt="pic-img">
                            </div>
                            <div class="label-container">
                                <div class="title" id="title">${el.title}</div>
                                <div class="sub-title" id="sub-title">${el.subtitle}</div>
                            </div>
                            <div class="stone-counter">
                                <div class="counter" id="counter">${el.stones}</div>
                                <span class="material-symbols-outlined">beenhere</span>
                            </div>
                        
                        </div>
                        <div class="milestone-mask">
                            <!-- MILESTONE HERE -->
                                <div class="timeline" id="timeline${index}"></div>
                        </div>
                    </div>

                `
        const milestoneDiv = document.createElement('div')
        milestoneDiv.innerHTML = milestoneLayout
        console.log(milestoneDiv)
        body.append(milestoneDiv)        
        let timeline = document.getElementById(`timeline${index}`)
        const yearSize = 1000 //number of pixel for every year = (zoom)
        const timelineLength = calculateTime(el.milestone_start_year) * yearSize
        console.log(el.milestone_start_year, timelineLength)
        timeline.style.width = `${timelineLength}px`
        console.log('width', timeline.style.width)
        timeline.style.marginRight = `${50}px`
        
    });
    
    

}
createUserMilestone()

const createStone = ()=>{
    const timeline = document.getElementById('timeline')
    const yearSize = 100 //number of pixel for every year = (zoom)
    const timelineLength = calculateTime(milestone_start_year) * yearSize
    let stonePosition = 0
    stonePosition = stonePosition + (timelineLength/calculateTime(milestone_start_year))
    console.log(stonePosition)

    stoneString = '<span class="material-symbols-outlined">beenhere</span>'
    
    
    for (let i = 0; i < milestoneData.length; i++) {
        const stone = document.createElement('div')
        stone.innerHTML = stoneString
        const stonesObj = stone.children
        //timeline.append(stonesObj[0])
        
    }
   
}


