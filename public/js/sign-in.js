console.log('fetching...')
const fetchSignUserData = async ()=> {
    const form = document.getElementById('signin-form')
    form.addEventListener('submit', (event)=>{
        console.log('submit...')
    event.preventDefault()
    
    const formData = {};
    const formElements = form.elements;

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        formData[element.name] = element.value;   

      }
    }

    //form.action = /signin-data
    fetch(form.action,{
        method: form.method,
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
    }
    ).then(response => response.json())
    .then(data => { 
        responseMessage(data.status,data.message)
        console.log(data.status, data.message)
    })
    .catch(err => {
       console.log(err)
    })
  })
}
fetchSignUserData()

const responseMessage = (response,message)=> {
    const responseContainer = document.getElementById('response-message')
    switch (response) {
        case 11000:
            responseContainer.innerHTML = message
            responseContainer.style.display = 'flex'
            responseContainer.style.justifyContent = 'center'
            responseContainer.style.backgroundColor = '#FDDECA'
            responseContainer.style.border = 'solid 0.3px #F0B0B1'
            responseContainer.style.color = '#C3A28E'
            responseContainer.style.borderRadius = '4px'
            responseContainer.style.padding = '2px'
            responseContainer.style.marginTop = '10px'
            setTimeout(()=>{
                responseContainer.innerHTML = '...wait, redirecting to the sign-in page'
                setTimeout(()=>{
                    window.location.href = '/signin.html'
                },2000)
            },2000)
            break;
        case 200:
            responseContainer.innerHTML = message
            responseContainer.style.display = 'flex'
            responseContainer.style.justifyContent = 'center'
            responseContainer.style.backgroundColor = '#DCFDCA'
            responseContainer.style.border = 'solid 0.3px #CDF0B0'
            responseContainer.style.color = '#A6C38E'
            responseContainer.style.borderRadius = '4px'
            responseContainer.style.padding = '2px'
            responseContainer.style.marginTop = '10px'
            setTimeout(()=>{
                responseContainer.innerHTML = '...wait, redirecting to the dashboard'
                setTimeout(()=>{
                    window.location.href = '/'
                },2000)
            },2000)
            
            break;
        default:
            break;
    }
    
}