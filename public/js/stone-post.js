/* DO NOT MOVE FROM HERE! */
/* extract data from local storage */
const container = document.getElementById('container')
const loadHtml = ()=> {
    const pageLocalStorage = 'stonePostCode'
    const innerCode = localStorage.getItem(pageLocalStorage)
    container.innerHTML = innerCode
    //localStorage.removeItem(pageLocalStorage)
}

loadHtml()
/* ------------------------------------------------------ */

const title = document.getElementById('title')
const date = document.getElementById('date')
const tools = document.getElementById('tools')


const localDate = new Date(date.innerHTML)
const formattedDate = localDate.toLocaleDateString()
date.innerHTML = formattedDate