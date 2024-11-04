

const form = document.getElementById('form')
const title = document.getElementById('title')
const description = document.getElementById('sub-title')
const year = document.getElementById('year-picker')
const color = document.querySelectorAll('.color-btn')

/* COLOR PICKER */
const disableAllBtn = () => {
    color.forEach((btn, ind) => {
        let btnSelection = document.getElementById(ind)
        btn.style.border = 'none'
        btnSelection.style.boxShadow = '0px 0px 10px 2px lightgray'
    })
}
let colorSelected;
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

fetch(form.action,{
    method: form.method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: title.value, description: description.value, year: year.value, color: colorSelected })
})
.then( response => response.json())
.then(data => {
    console.log(data)
    
    window.location.href = '/'
})
.catch(err => console.log(err))
})
///////////////////////////////////////////////////////