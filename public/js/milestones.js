const title = document.getElementById('title')
const event = document.getElementById('event')
const eventDate = document.getElementById('event-date')
const color = document.querySelectorAll('.color-btn')


const disableAllBtn = ()=>{
    color.forEach((btn,ind) => {
        let btnSelection = document.getElementById(ind)
        btn.style.border = 'none'
        btnSelection.style.boxShadow = '0px 0px 10px 2px lightgray'
    })
}

color.forEach((btn,ind)=>{
    btn.style.boxShadow = '0px 0px 10px 2px lightgray'
    btn.id = ind
    let btnSelection = document.getElementById(ind)
    btn.addEventListener('click',()=>{
        disableAllBtn()
        btnSelection.style.border = `1px solid ${btnSelection.style.backgroundColor}`
        btnSelection.style.boxShadow = `0 0 25px 6px ${btnSelection.style.backgroundColor}`
        
    })

})