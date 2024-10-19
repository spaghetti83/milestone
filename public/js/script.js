const userPic = document.getElementById('user-pic')
const titleElement = document.getElementById('title')
const subTitleElement  = document.getElementById('sub-title')
const stonesCounter = document.getElementById('counter')
const body = document.getElementById('main')
const googleFontLogo = 'beenhere'

/* add fetch data to get userMilestones values. the actual values will be stored in a MongoDB */

const userMilestones = [
    {
      "user_id": 123,
      "milestoneID": 1,
      "milestone_start_year": 2000,
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
      "milestone_start_year": 1990,
      "color": "green",
      "title": "Track&Field Runner",
      "subtitle": "Never give up.",
      "photo_path": "pictures/PXL_20240928_153411328.jpg",
      "stones": 107,
      "timestamp": "2024-10-07T22:40:00Z"
    }
  ]


/* const milestoneData = [
  {
      "id": 123,
      "date": "1990-01-01",
      "event": "First 5k race completed",
      "milestone": "running",
      "color": "green",
      "timestamp": "2024-10-07T22:40:00Z",
      "milestoneID": 2
  },
  {
      "id": 123,
      "date": "1996-01-01",
      "event": "First 5k race completed",
      "milestone": "running",
      "color": "green",
      "timestamp": "2024-10-07T22:40:00Z",
      "milestoneID": 2
  },
  {
      "id": 123,
      "date": "1990-05-04",
      "event": "First 5k race completed",
      "milestone": "running",
      "color": "green",
      "timestamp": "2024-10-07T22:40:00Z",
      "milestoneID": 2
  },
  {
      "id": 123,
      "date": "1991-05-01",
      "event": "First 5k race completed",
      "milestone": "running",
      "color": "green",
      "timestamp": "2024-10-07T22:40:00Z",
      "milestoneID": 2
  },
  {
      "id": 123,
      "date": "2024-12-31",
      "event": "First 5k race completed",
      "milestone": "running",
      "color": "green",
      "timestamp": "2024-10-07T22:40:00Z",
      "milestoneID": 2
  }
] */

  let milestoneData = []


const ROUTE = 'http://localhost:5000/'

const fetchData =  () =>{
  try {
    fetch(ROUTE,{
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      response.json()
      console.log('response', response)
  })
    .then(data => {
      console.log('server data',data)
    })
    .catch(error => {
      console.log(error)
    })
    
  } catch (error) {
    console.log(error)
  }
  


}
fetchData()

console.log('fetched data',)

let { userID, milestoneID,milestone_start_year, color, title, subtitle, photo_path, stones,timestamp} = userMilestones

let {ev_color,ev_id,ev_date,ev_event,ev_milestone,ev_milestoneID,ev_timestamp} = milestoneData
/* let ev_id = milestoneData.id
let ev_date = milestoneData.date
let ev_event = milestoneData.event
let ev_milestone = milestoneData.milestone
let ev_color = milestoneData.color
let ev_timestamp = milestoneData.timestamp */

const createUserMilestone = () => {
    const bodyElement = document.createElement('div')
    const childrenElements =[]
    userMilestones.forEach((el,index) => {        
        
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
                                <div class="timeline" id="timeline${index}"></div>
                        </div>
                    </div>

                `
        const milestoneDiv = document.createElement('div')
        milestoneDiv.innerHTML = milestoneLayout
        

        milestoneDiv.style.zIndex = 1
        body.append(milestoneDiv)  
        
        /* calculation to get the length of the timeline
        based from the starting year of the milestone   2024 - 1999 = 25 years | 
        multyplied for 1000 you get a 25000px timeline length*/
        let timeline = document.getElementById(`timeline${index}`)
        
        /* since the time line ends at the biginnig of the current year we need to add the
        remain part till today, here the calculus */
        const getDaysBetweenTwoDays = (startYear,startMonth,startDay,secondYear, secondMonth,secondDay) => {
            const dateElement = new Date()
            const dateT = new Date(startYear,startMonth,startDay)
            const calcThisYear = new Date(secondYear,secondMonth,secondDay)
            const millsecTillToday = calcThisYear - dateT
            const oneDay = 1000 * 60 * 60 * 24
            const daysTillToday = Math.round(millsecTillToday / oneDay)
            return daysTillToday
            
        }
        /* changing this value you change the size in length of every year
        in the timeline, basicly you can zoom in and out incresing o decresing it */
        let zoomLevel = 2///LET IT AT 1 (ONE)


        const t = new Date()
        const tY = t.getFullYear()
        const tM = t.getMonth()
        const tD = t.getDate()
        
        const timelineLength = Math.round(getDaysBetweenTwoDays(el.milestone_start_year,0,1,tY,11,31)) /zoomLevel
        console.log('TIMELINE LENGTH', timelineLength)
       
       const marginRightTimeLine = 40
       

        timeline.style.width = `${timelineLength}px`
        timeline.style.marginRight = `${marginRightTimeLine}px`
        
        
        for( let i = 0; i<= Math.floor(getDaysBetweenTwoDays(el.milestone_start_year,0,1,tY,11,31) / 365);i++){
          
            
            /* YEARS DELIMITATOR */
            let yearsLine = document.createElement('div')
            yearsLine.classList = 'years-lines'
            yearsLine.id = `years-lines${i}`


            /* YEARS LABEL */
            /* some calculus for the label */
            const today = new Date()
            const thisYear = today.getFullYear()
            let labelYEarCaluculator = thisYear - Math.round(getDaysBetweenTwoDays(el.milestone_start_year,0,1,tY,0,1) / 365) + i
            
            let yearsLabel = document.createElement('div')
            yearsLabel.classList = 'years-label'
            yearsLabel.id = `years-label${i}`
            yearsLabel.textContent = labelYEarCaluculator


            /* APPEND BOTH */
            timeline.appendChild(yearsLine)
            timeline.appendChild(yearsLabel)

            /* PUTTING IN THE RIGHT PLACE */
            
            //CALCULATING THE GAP BETWEEN EVERY YEARSLINE AND YEARLABEL
            
            yearInc = timelineLength - getDaysBetweenTwoDays(el.milestone_start_year + i,0,1,tY,11,31) / zoomLevel
            yearsLine.style.marginLeft = `${yearInc}px`
            yearsLabel.style.marginLeft = `${yearInc + 5}px`

        }
        
        /* stones population */
        const timelineNode = document.getElementById(`timeline${index}`)
        const tempMilestoneID = el.milestoneID
        
        milestoneData.forEach( (el,index) => {
            if(el.milestoneID === tempMilestoneID){
                
                let tempDiv = document.createElement('div')
                tempDiv.classList.add('stones')
                tempDiv.id = `stone${index}`
                let dimStone = 14
                tempDiv.style.width = `${dimStone}px`
                tempDiv.style.height = `${dimStone}px`
                tempDiv.style.backgroundColor = '#32ADE6'
                tempDiv.style.borderRadius = '50%'
                tempDiv.style.display = 'flex'
                tempDiv.style.flex = 'wrap'
                tempDiv.style.flexDirection = 'row'
                tempDiv.style.position = 'absolute'
                tempDiv.style.marginTop = '0px'
                timelineNode.appendChild(tempDiv)
                //tempDiv.textContent = googleFontLogo //this string stands for a logo in material-symbols-outlined from google fonts
                let extractDate = new Date(el.date)
                const today = new Date()
                let yy = extractDate.getFullYear()
                let mm = extractDate.getMonth()
                let dd = extractDate.getDate()
                
                let yVal =  Math.round(getDaysBetweenTwoDays(yy,mm,dd,today.getFullYear(),11 ,31)) / zoomLevel
                console.log(yVal , timelineLength, timelineLength - yVal)
                console.log('yVal', yVal)
                
                tempDiv.style.marginLeft = `${(timelineLength - yVal)}px`
                
                
            }
        })
        
    });
    
    

}
createUserMilestone()