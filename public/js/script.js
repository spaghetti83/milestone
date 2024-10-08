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
      "milestone_start_year": 1990,
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
      "milestone_start_year": 2001,
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
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID" : 2
        },
        {
          "id": 123,
          "date": "10-10-2005",
          "event": "10k race personal best",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID" : 2
        },
        {
          "id": 123,
          "date": "21-05-2011",
          "event": "First half marathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID" : 2
        },
        {
          "id": 123,
          "date": "05-12-2018",
          "event": "First marathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID" : 2
        },
        {
          "id": 123,
          "date": "02-07-2024",
          "event": "Ultramarathon completed",
          "milestone": "running",
          "color": "green",
          "timestamp": "2024-10-07T22:40:00Z",
          "milestoneID" : 2
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
                                <div class="timeline" id="timeline${index}"></div>
                        </div>
                    </div>

                `
        const milestoneDiv = document.createElement('div')
        milestoneDiv.innerHTML = milestoneLayout
        console.log(milestoneDiv)
        body.append(milestoneDiv)  
        
        /* calculation to get the length of the timeline
        based from the starting year of the milestone   2024 - 1999 = 25 years | 
        multyplied for 1000 you get a 25000px timeline length*/
        let timeline = document.getElementById(`timeline${index}`)
        /* changing this value you change the size in length of every year
        in the timeline, basicly you can zoom in and out incresing o decresing it */
        const yearSize = 200
        const timelineLength = calculateTime(el.milestone_start_year) * yearSize
        timeline.style.width = `${timelineLength}px`
        timeline.style.marginRight = `${50}px`
        /* yearline are the little vertical line at the beginning of every year in
        the timeline, IMPORTANT: yearInc is -(yearSize) to start at the very beginning of the time line with the right year*/
        let yearInc = -(yearSize)
        console.log('calc',calculateTime(el.milestone_start_year))
        for( let i = 0; i<= calculateTime(el.milestone_start_year); i++){

            
            /* YEARS DELIMITATOR */
            let yearsLine = document.createElement('div')
            yearsLine.classList = 'years-lines'
            yearsLine.id = `years-lines${i}`


            /* YEARS LABEL */
            /* some calculus for the label */
            const today = new Date()
            const thisYear = today.getFullYear()
            let labelYEarCaluculator = thisYear - calculateTime(el.milestone_start_year) + i
            console.log('Calc Year Label',labelYEarCaluculator)
            ////////////////////////////////////////////
            let yearsLabel = document.createElement('div')
            yearsLabel.classList = 'years-label'
            yearsLabel.id = `years-label${i}`
            yearsLabel.textContent = labelYEarCaluculator

            /* APPEND BOTH */
            timeline.appendChild(yearsLine)
            timeline.appendChild(yearsLabel)

            /* PUTTING IN THE RIGHT PLACE */
            
            yearInc = yearInc + yearSize
            yearsLine.style.marginLeft = `${yearInc}px`
            yearsLabel.style.marginLeft = `${yearInc + 5}px`
            console.log('yearsInc',yearInc)

            
            
            
            
        

            
        }
        
        /* stones population */
        /* const timelineNode = document.getElementById(`timeline${index}`)
        const tempMilestoneID = el.milestoneID
        
        milestoneData.forEach( (el,index) => {
            if(el.milestoneID === tempMilestoneID){
                let stoneString = `<span id="stone${index}" "class="material-symbols-outlined">beenhere</span>`
                let tempDiv = document.createElement('div')
                tempDiv.innerHTML = stoneString
                let inc = 0
                inc = inc + yearSize
                tempDiv.style.marginLeft = `${inc}px`
                timelineNode.append(tempDiv)
            }
        }) */
        
    });
    
    

}
createUserMilestone()




