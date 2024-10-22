const title = document.getElementById('title')
const event = document.getElementById('event')
const eventDate = document.getElementById('event-date')
const color = document.querySelectorAll('.color-btn')


const disableAllBtn = ()=>{
    color.forEach(btn => btn.style.border = 'none')
}

color.forEach((btn,ind)=>{
    btn.id = ind
    let btnSelection = document.getElementById(ind)
    btn.addEventListener('click',()=>{
        disableAllBtn()
        btnSelection.style.border = '0.5px solid #FF2D55'
        
    })

})

