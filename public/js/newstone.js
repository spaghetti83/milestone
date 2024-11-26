const form = document.getElementById('form-new-stone')
const selectInput = document.getElementById('milestones-selection')
const title = document.getElementById('title')
const eventDescription = document.getElementById('event')
const eventDate = document.getElementById('event-date')
const saveBtn = document.getElementById('save-btn')
const responseMessage = document.getElementById('response-message')

let milestonesData = {}
let milestonesList = []


/* CHANGE THIS TO FILTER ONLY USER MILESTONES BEFORE ADDING A STONE */
const fetchMilestoneData = ()=>{
    fetch('/find-userdata',{
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then( response => response.json())
    .then( data => {
      if(data.length === 0){
          window.location.href = '/newmilestone.html'
      }else{
      for (let i = 0; i < data.length; i++) {
        let newOption = document.createElement('option')
        newOption.value = data[i]._id
        newOption.text = data[i].name
        selectInput.add(newOption)
      }
    }
    })
    .catch(err => console.log('Error fetching Milestones', err))
  }
  fetchMilestoneData()
  

  form.addEventListener('submit', (event)=>{
   event.preventDefault()
   console.log(selectInput.value)
  fetch('/new-stone',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title.value, 
            event: container.innerHTML, 
            date: eventDate.value, 
            milestoneID: selectInput.value,
          })
    })
    .then(response => response.json)
    .then(data => {
      console.log(data)
      window.location.href = '/'
    })
    .catch(err => console.log(err))
  })




const container = document.getElementById('post-container')
const textBtn = document.getElementById('post-text')
const drawBtn = document.getElementById('post-draw')
const stickersBtn = document.getElementById('post-sticker')
const output = document.getElementById('output')


let idCount = 0
    
  textBtn.addEventListener('click', ()=>{
    idCount += 1
    const textElement = document.createElement('div')
    textElement.type = 'text'
    textElement.classList = 'text-element'
    textElement.classList = 'divText'
    textElement.id = `text-id${idCount}`
    textElement.style.position = 'absolute'
    textElement.style.left = '10px'
    textElement.style.top = '10px'
    /* textElement.style.height = 'auto' */
    //textElement.style.transform = 'translate(-50%,-50%)'
    textElement.style.backgroundColor = 'transparent'
    textElement.style.fontSize = '24px'
    textElement.style.color = '#8f8f8f'
    textElement.style.textAlign = 'center'
    textElement.style.color = 'black'
    textElement.textContent = 'double tap to edit'
    textElement.style.width = '1fr'
    //textElement.style.zIndex = '100' + idCount
    textElement.style.transform = 'scale(1)'
    console.log(textElement)
    container.appendChild(textElement)
    //
    let isDragging = false
    let offsetX = 0
    let offsetY= 0
    let firstTap = false
    textElement.addEventListener('touchstart', (e)=>{
      if(e.touches.length === 1){
      isDragging = true
      console.log('touches',e.touches)
      offsetX = textElement.offsetLeft - e.touches[0].clientX
      offsetY = textElement.offsetTop - e.touches[0].clientY
      console.log('mouse down',textElement.offsetLeft,e.touches[0].clientX)
      
      }
      
      
      
    })
  
    container.addEventListener('touchend', (e)=>{
      
      if(e.touches.length === 1){
      if(isDragging){
        isDragging = false
      }
      console.log('mouse up',isDragging)
    }
    console.log(textElement)
    })

    textElement.addEventListener('touchmove', (e)=>{
      if(e.touches.length === 1){
      if (!isDragging) return;
      e.preventDefault()
      console.log('mousemove')
      const newX = e.touches[0].clientX + offsetX
      const newY = e.touches[0].clientY + offsetY
      textElement.style.left = `${newX}px`
      textElement.style.top = `${newY}px`
      console.log('mouse move',e.clientX,newX)
      }
      
    })

    textElement.addEventListener('input',()=>{
      if(e.touches.length === 1){
      textElement.style.height = 'auto'
      textElement.style.display = 'inline-block'
      textElement.style.height =  `${textElement.scrollHeight}px`
      
      }
    })
    textElement.addEventListener('touchend',()=>{
      firstDoubleTap = true
    })
//////////////////////////////////////
////PINCH TO ZOOM////////////////////
////////////////////////////////////
    let firstTouch = 0
    let secondTouch = 0
    let seconTouchMoving = 0
    let startingDistance = 0
    let currentDistance = 0
    let scaleFactor = 1
    let lastScaleFactor = 0
    let lastTap = 0
   
   textElement.addEventListener('touchstart',(e)=>{
    
    /* if(e.touches.length === 2){
      e.preventDefault()
      firstTouch = Math.round(e.touches[0].clientX - e.touches[1].clientX)
      //secondTouch = e.touches[0].clientY - e.touches[1].clientY
      //startingDistance = Math.round(Math.hypot(firstTouch,secondTouch))
    } */

      


    //DOUBLE TAP TO EDIT
    if(e.touches.length === 1){
    const currentTime = new Date().getTime()
    let timeLength = currentTime - lastTap

    if(timeLength < 300){
      output.textContent = 'DOUBLE TAP'
      editTextPanel(textElement.id,textElement.innerHTML)
      
    }else{
      lastTap = currentTime
      output.textContent = 'SINGLE TAP'
    }
    }
    

   })
    
   textElement.addEventListener('touchmove',(e)=>{
    
    if(e.touches.length === 2){
      e.preventDefault()
      /* secondTouch = Math.round(e.touches[0].clientY - e.touches[1].clientY)
      currentDistance = Math.round(Math.hypot(firstTouch,secondTouch))
      
      scaleFactor =currentDistance / startingDistance
      textElement.style.transform = `scale(${scaleFactor})`
      output.textContent = firstTouch + '|' + secondTouch + '|' +  scaleFactor */
    }
    
   })

   container.addEventListener('touchstart',(e)=>{
    if(e.touches.length === 2){
      e.preventDefault()
      firstTouch = Math.abs(Math.round(e.touches[0].clientX - e.touches[1].clientX))
      secondTouch = Math.abs(Math.round(e.touches[0].clientY - e.touches[1].clientY))
      //startingDistance = Math.round(Math.hypot(firstTouch,secondTouch))
      output.textContent = firstTouch + '|' + secondTouch
    }
   })


   container.addEventListener('touchmove',(e)=>{
    
    /* if(e.touches.length === 2){
      e.preventDefault()
      secondTouch = Math.round(e.touches[0].clientY - e.touches[1].clientY)
      currentDistance = Math.round(Math.hypot(firstTouch,secondTouch))
      scaleFactor =currentDistance / startingDistance
      textElement.style.transform = `scale(${scaleFactor})`
  
    } */

    if(e.touches.length === 2){
      e.preventDefault()
      seconTouchMoving = Math.abs(Math.round(e.touches[0].clientY - e.touches[1].clientY))
      let diffrenceSecond =  seconTouchMoving - secondTouch
      scaleFactor = (diffrenceSecond / seconTouchMoving) + lastScaleFactor
      
        textElement.style.transform = `scale(${scaleFactor})`
      
      
      output.textContent = output.textContent =  ((diffrenceSecond / seconTouchMoving) + lastScaleFactor)
    }
    
   })

   container.addEventListener('touchend',(e)=>{
      lastScaleFactor = scaleFactor
   })


   
  })
  
  


  const editTextPanel = (elementID,textValue)=>{
    const targetElement = document.getElementById(elementID)
    //const menu = document.getElementById('menu-container')
    //menu.style.display = 'none'
    const formContainer = document.getElementById('form-container')
    let strEditor = ` 
    <div id="editor">
        <div id="navigation">
            <div id="back"><span class="material-symbols-outlined">
                    undo
                </span></div>
            <div id="done"><span class="material-symbols-outlined">
                    check
                </span></div>
        </div>
        <div id="text-editor">
            
            <!-- /////////// -->
            <textarea id="text"></textarea>
            <!-- ///////// -->
            <div id="selection">
                <div id="fonts"></div>
                <div id="colors"></div>
            </div>
            <div id="toolbar">
                <div id="font"><span class="material-symbols-outlined">
                        glyphs
                    </span></div>
                <div id="color"><span class="material-symbols-outlined">
                        palette
                    </span></div>
                <div id="align"><span class="material-symbols-outlined">
                        format_align_center
                    </span></div>
            </div>
            
        </div>
    </div>`
    ////PANEL
    const editor = document.createElement('div')
    editor.innerHTML = strEditor
    editor.style.zIndex = '100'

    /////TOOL
    formContainer.appendChild(editor)
    const text = document.getElementById('text')
    const backBtn = document.getElementById('back')
    const doneBtn = document.getElementById('done')
    const align = document.getElementById('align')
    text.style.fontSize = '20px'
    if(textValue === 'double tap to edit'){
      text.value = 'type to edit'
      text.select()
    }else{
      text.value = textValue
     text.scrollHeight = text.style.height
    }
   
    ///ALIGN BUTTON
    let click = 0
    align.addEventListener('click',()=>{
      click++
      console.log(click)
      switch (click) {
        case 1:
          targetElement.style.textAlign = 'left'
          text.style.textAlign = 'left'
          console.log('left')
          break;
        case 2:
          targetElement.style.textAlign = 'center'
          text.style.textAlign = 'center'
          console.log('center')
          break;
        case 3:
          targetElement.style.textAlign = 'right'
          text.style.textAlign = 'right'
          console.log('right')
          break;
        case 4:
          click = 1
          targetElement.style.textAlign = 'left'
          text.style.textAlign = 'left'
          console.log('left')
        break;

        default:
         
          break;
      }

    })
    
    
    ///BACK BUTTON
    backBtn.addEventListener('click',()=> {
      formContainer.removeChild(editor)
      menu.style.display = 'flex'
    })


    ///DONE BUTTON
    doneBtn.addEventListener('click',()=> {
      
      formContainer.removeChild(editor)
      //menu.style.display = 'flex'
      targetElement.style.whiteSpace = 'pre-wrap'
      targetElement.textContent = text.value
      targetElement.style.height = text.scrollHeight
      
      
    })

    text.addEventListener('input',()=>{
      text.style.height = 'auto'
      text.style.height = text.scrollHeight + 'px'
      
    })
    

    ///FONT SELECTION
    const fontBtnContainer = document.getElementById('fonts')
    fontBtnContainer.style.display = 'flex'
    fontBtnContainer.style.flexDirection = 'row'
    fontBtnContainer.style.justifyContent = 'space-evenly'
    fontBtnContainer.style.height = '25px'
    fontBtnContainer.style.overflowX = 'scroll'
    const fontArray = [
      'Afacad Flux','Nabla', 'Bungee Spice', 'Honk','Amatic SC','Gochi Hand','Roboto','Cormorant Infant'
    ]
    let btnElements = []
    fontArray.forEach((e,i)=>{
      console.log(e)
      let fontSelected = e
      let fontBtn = document.createElement('div')
      fontBtn.style.backgroundColor = 'black'
      fontBtn.style.border = 'solid 0.3px white'
      fontBtn.style.borderRadius = '4px'
      fontBtn.style.marginRight = '5px'
      fontBtn.style.padding = '2px'
      fontBtn.style.userSelect = 'none'
      fontBtn.style.display = 'block'
      fontBtn.textContent = e
      fontBtn.style.fontFamily = e
      fontBtnContainer.appendChild(fontBtn)
      let el = fontBtnContainer.childNodes[i]
      btnElements.push(el)
      fontBtn.addEventListener('click',()=>{
        btnElements.forEach((e)=>{
          if(fontBtn.textContent === e.textContent){
            fontBtn.style.fontWeight = 'bolder'
            targetElement.style.fontFamily = fontBtn.textContent
            text.style.fontFamily = fontBtn.textContent
          }else{
            e.style.fontWeight = 'normal'
          }
        })
      })
      
    })
     
    
   

  }
  

 