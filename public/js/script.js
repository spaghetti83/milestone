const userPic = document.getElementById('user-pic')
const titleElement = document.getElementById('title')
const subTitleElement  = document.getElementById('sub-title')
const stonesCounter = document.getElementById('counter')
const body = document.getElementById('main')
const googleFontLogo = 'beenhere'



 /* changing this value you change the size in length of every year
    in the timeline, basicly you can zoom in and out incresing o decresing it */
    let zoomLevel = 1///LET IT AT 1 (ONE)
/////////////ZOOMS SETTTING STARTS HERE/////////////////////
const zoomIn = document.getElementById('zoom-in')
const zoomOut = document.getElementById('zoom-out')
const zoomLevelDisplay = document.getElementById('zoom-level')
zoomLevelDisplay.innerHTML = zoomLevel
zoomOut.addEventListener('click',()=>{
  if(zoomLevel <= 5){
  zoomLevel = zoomLevel + 0.5
  }
  zoomLevelSettings()
})
zoomIn.addEventListener('click',()=>{
  if(zoomLevel >= 0.5){
  zoomLevel = zoomLevel - 0.5
  }
  zoomLevelSettings()
})

const zoomLevelSettings = ()=>{
  
  if(zoomLevel >= 5){
    zoomLevel = 5
    zoomOut.style.color = '#8f8f8f'
  }else{
     zoomIn.style.color = 'black'
  }
  if(zoomLevel <= 0.5){
    zoomLevel = 0.5
    zoomIn.style.color = '#8f8f8f'
  }else{
    zoomOut.style.color = 'black'
  }
  zoomLevelDisplay.innerHTML = zoomLevel
  body.innerHTML = ''
  createUserMilestone()
}
/////////////ZOOMS SETTTING ENDS HERE/////////////////////


/*  fetchUserData fill milestoneData with the milestone's user data */
  

let userMilestones = []
let milestoneData = []
const fetchMilestoneData = ()=>{
  fetch('/index',{
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then( response => response.json())
  .then( data => {
    
    userMilestones = data
    console.log('feching milestone User data',userMilestones)
    if(data.status === 11000){
      window.location.href = '/login.html'
    }else{
    userMilestones.forEach(el =>{
      
      el.stones.forEach(el => {
        console.log('stones',el)
        milestoneData.push(el)
      })
      
    })
    createUserMilestone()
    console.log('milestoneData',milestoneData)
  }
  })
  .catch(err => console.log('Error fetching Milestones', err))
}
fetchMilestoneData()



const createUserMilestone = () => {
  const bodyElement = document.createElement('div')
  const childrenElements = []
  userMilestones.forEach((el, index) => {

    //console.log(el.startingYear, index)
    const milestoneLayout = `
                <div class="milestone-container" style="background-color: ${el.color} ;">
                        <div class="milestone-header">
                            <div class="picture">
                                <img class="user-pic" id="user-pic" src=${el.photo_path} alt="pic-img">
                            </div>
                            <div class="label-container">
                                <div class="title" id="title">${el.name}</div>
                                <div class="sub-title" id="sub-title">${el.description}</div>
                            </div>
                            <div class="stone-counter">
                                <div class="counter" id="counter">${el.stones.length}</div>
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
    const getDaysBetweenTwoDays = (startYear, startMonth, startDay, secondYear, secondMonth, secondDay) => {
      const dateElement = new Date()
      const dateT = new Date(startYear, startMonth, startDay)
      const calcThisYear = new Date(secondYear, secondMonth, secondDay)
      const millsecTillToday = calcThisYear - dateT
      const oneDay = 1000 * 60 * 60 * 24
      const daysTillToday = Math.round(millsecTillToday / oneDay)
      return daysTillToday

    }
   

    const t = new Date()
    const tY = t.getFullYear()
    const tM = t.getMonth()
    const tD = t.getDate()

    const timelineLength = Math.round(getDaysBetweenTwoDays(el.startingYear, 0, 1, tY, 11, 31)) / zoomLevel
    //console.log('TIMELINE LENGTH', timelineLength)

    const marginRightTimeLine = 40


    timeline.style.width = `${timelineLength}px`
    timeline.style.marginRight = `${marginRightTimeLine}px`
    timeline.style.height = '3px'

    for (let i = 0; i <= Math.floor(getDaysBetweenTwoDays(el.startingYear, 0, 1, tY, 11, 31) / 365); i++) {


      /* YEARS DELIMITATOR */
      let yearsLine = document.createElement('div')
      yearsLine.classList = 'years-lines'
      yearsLine.id = `years-lines${i}`


      /* YEARS LABEL */
      /* some calculus for the label */
      const today = new Date()
      const thisYear = today.getFullYear()
      let labelYEarCaluculator = thisYear - Math.round(getDaysBetweenTwoDays(el.startingYear, 0, 1, tY, 0, 1) / 365) + i

      let yearsLabel = document.createElement('div')
      yearsLabel.classList = 'years-label'
      yearsLabel.id = `years-label${i}`
      yearsLabel.textContent = labelYEarCaluculator


      /* APPEND BOTH */
      timeline.appendChild(yearsLine)
      timeline.appendChild(yearsLabel)

      /* PUTTING IN THE RIGHT PLACE */

      //CALCULATING THE GAP BETWEEN EVERY YEARSLINE AND YEARLABEL

      yearInc = timelineLength - getDaysBetweenTwoDays(el.startingYear + i, 0, 1, tY, 11, 31) / zoomLevel
      //console.log(el.startingYear + i,getDaysBetweenTwoDays(el.startingYear + i,0,1,tY,11,31))
      yearsLine.style.marginLeft = `${yearInc}px`
      yearsLabel.style.marginLeft = `${yearInc + 5}px`
      yearsLine.style.marginTop = '0px'
    }

    /* stones population */
    const timelineNode = document.getElementById(`timeline${index}`)
    //const tempMilestoneID = el.milestoneID
    const tempMilestoneID = el._id
    //console.log('check EL',el,el._id)

    milestoneData.forEach((el, index) => {
      el.milestoneID == tempMilestoneID ? console.log('TRUE') : console.log('FALSE')
      if (el.milestoneID == tempMilestoneID) {
        /* milestone creation */
        console.log('creating stones...')

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
        /* tapping over the stones pull the labels to the first layer (to improve) */
        tempDiv.addEventListener('mouseover', () => {
          tempLabel.style.cursor = 'pointer'
          //zInd = tempLabel.style.zIndex
          tempLabel.style.zIndex = '10'
        })
        tempDiv.addEventListener('mouseleave', () => {
          tempLabel.style.cursor = 'pointer'
          tempLabel.style.zIndex = 9
        })
      
        timelineNode.appendChild(tempDiv)
        ///////////////////////////////////////////////////
        /* label creation */
        const strLabelStone = `<div class="label-stone-container id=label-${index}">${el.title}</div>`
        let tempLabel = document.createElement('div')
        tempLabel.style.backgroundColor = '#F5F5F5'
        tempLabel.style.boxShadow = '0px 0px 8px #8f8f8f'

        tempLabel.style.borderRadius = '8px'
        tempLabel.style.padding = '3px'
        tempLabel.style.position = 'absolute'
        tempLabel.style.marginTop = '45px'
        tempLabel.style.zIndex = index
        //let zInd = ''
        tempLabel.innerHTML = strLabelStone
        ///button to show the stone content
        tempDiv.addEventListener('click',()=>{
          fetch('/view-stone',{
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(el)
          }).then(response =>{ 
            if(response.ok){
              console.log('got data from fetch',response)
              return response.text()
              
            }
            
          })
          .then(html => {
            localStorage.setItem('stonePostCode',html)
            const str = localStorage.getItem('stonePostCode')
            console.log(str)
            window.location.href = '/stone-post.html'
          })
          .catch( err => console.log(err))
          
        })
        //console.log(el.event)
        timelineNode.append(tempLabel)
        ///////////////////////////////////////////////////
        let extractDate = new Date(el.date)
        const today = new Date()
        let yy = extractDate.getFullYear()
        let mm = extractDate.getMonth()
        let dd = extractDate.getDate()

        let yVal = Math.round(getDaysBetweenTwoDays(yy, mm, dd, today.getFullYear(), 11, 31)) / zoomLevel
        //console.log(yVal , timelineLength, timelineLength - yVal)
        //console.log('yVal', yVal)

        tempDiv.style.marginLeft = `${(timelineLength - yVal)}px`
        tempLabel.style.marginLeft = `${(timelineLength - yVal)}px`
        //console.log('all stone created')
      }
    })

  });



}
//fetchMilestoneData()