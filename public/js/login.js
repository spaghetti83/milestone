const form = document.getElementById('login-form')

form.addEventListener('submi',(event)=>{
event.preventDefault()
const email = document.getElementById('email')
const password = document.getElementById('password')    

fetch(form.action,{
    method: form.method,
    headers: {  'Content-Type' : 'application/json'},
    body: JSON.stringify({email: email.value, password: password.value})
})
.then(response => 
    {
        response.json()
        console.log('got response...')
    })
.then(data => {
    
    console.log(data.message)
})
.catch(err => console.log('something went wrong!'))
})

