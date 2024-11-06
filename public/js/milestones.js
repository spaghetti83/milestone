
const form = document.getElementById('form')
const title = document.getElementById('title')
const description = document.getElementById('sub-title')
const year = document.getElementById('year-picker')
const color = document.querySelectorAll('.color-btn')


let colorSelected;
let titleCheck = false
let eventDescriptionCheck = false
let yearCheck = false
let colorCheck = false



/* COLOR PICKER */
const disableAllBtn = () => {
    color.forEach((btn, ind) => {
        let btnSelection = document.getElementById(ind)
        btn.style.border = 'none'
        btnSelection.style.boxShadow = '0px 0px 10px 2px lightgray'
    })
}

color.forEach((btn, ind) => {
    btn.style.boxShadow = '0px 0px 10px 2px lightgray'
    btn.id = ind
    let btnSelection = document.getElementById(ind)
    btn.addEventListener('click', () => {
        disableAllBtn()
        btnSelection.style.border = `1px solid ${btnSelection.style.backgroundColor}`
        btnSelection.style.boxShadow = `0 0 25px 6px ${btnSelection.style.backgroundColor}`
        colorSelected = btnSelection.style.backgroundColor
        console.log(colorSelected)
    })

})

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(title.value.length < 2 || description.value.length <2 || year.value.length < 4 || !colorSelected ){
        responseMessage('missing','fill all the fields at least with 2 character and select one color')
      }else{
        fetch(form.action,{
            method: form.method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title.value, description: description.value, year: year.value, color: colorSelected })
        })
        .then( response => response.json())
        .then(data => {
            console.log(data)
            
            
        })
        .catch(err => console.log(err))
      }


})
///////////////////////////////////////////////////////
const responseMessage = (response,message)=> {
    const responseContainer = document.getElementById('response-message')
    responseContainer.innerHTML = 'test'
    switch (response) {
        case 'alert':
            
            responseContainer.innerHTML = message
            responseContainer.style.display = 'flex'
            responseContainer.style.justifyContent = 'center'
            responseContainer.style.backgroundColor = '#FDDECA'
            responseContainer.style.border = 'solid 0.3px #F0B0B1'
            responseContainer.style.color = '#C3A28E'
            responseContainer.style.borderRadius = '4px'
            responseContainer.style.padding = '2px'
            responseContainer.style.marginTop = '10px'
            responseContainer.style.minWidth = '300px'
            
            break;
        case 'good':
            responseContainer.innerHTML = message
            responseContainer.style.display = 'flex'
            responseContainer.style.justifyContent = 'center'
            responseContainer.style.backgroundColor = '#DCFDCA'
            responseContainer.style.border = 'solid 0.3px #CDF0B0'
            responseContainer.style.color = '#A6C38E'
            responseContainer.style.borderRadius = '4px'
            responseContainer.style.padding = '2px'
            responseContainer.style.marginTop = '10px'
            responseContainer.style.minWidth = '300px'
           
           
            
            break;
            case 'missing':
                responseContainer.innerHTML = message
                responseContainer.style.display = 'flex'
                responseContainer.style.justifyContent = 'center'
                responseContainer.style.backgroundColor = '#FDDECA'
                responseContainer.style.border = 'solid 0.3px #F0B0B1'
                responseContainer.style.color = '#C3A28E'
                responseContainer.style.borderRadius = '4px'
                responseContainer.style.padding = '2px'
                responseContainer.style.marginTop = '10px'
                responseContainer.style.minWidth = '300px'
                 responseContainer.style.textAlign = 'center'
               setTimeout(()=>{
                responseContainer.innerHTML =""
                responseContainer.style.backgroundColor = 'none'
                responseContainer.style.border = 'none'
                responseContainer.style.color = 'none'
                 responseContainer.style.padding = '0'
               },2000)
                
                break;
        default:
            break;
    }
    
}
