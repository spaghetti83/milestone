const logoutBtn = document.getElementById('log-out')

logoutBtn.addEventListener('click',()=>{
    fetch('/logout',{
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }).then(response => response.json())
    .then(data => {
        responseMessage(data.status,data.message)
       
    })
    .catch(err => console.log(err))
})

const responseMessage = (response,message)=> {
    const responseContainer = document.getElementById('response-message')
    switch (response) {
        case 200:
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
            setTimeout(()=>{
                responseContainer.innerHTML = '...wait, redirecting to the log-in page'
                setTimeout(()=>{
                    window.location.href = '/login.html'
                },2000)
            },2000)
            break;
        case 11000:
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
            setTimeout(()=>{
                responseContainer.innerHTML = '...wait, redirecting to the dashboard'
                setTimeout(()=>{
                    window.location.href = '/login.html'
                },2000)
            },2000)
            
            break;
        default:
            break;
    }
    
}