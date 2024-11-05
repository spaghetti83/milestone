const email = document.getElementById('email')
const password = document.getElementById('password')
const checkpwd = document.getElementById('check-pwd')
const lengthCounter = document.getElementById('length-counter')


const minChar = 6
lengthCounter.innerHTML = `-${minChar}`
password.style.boxShadow = '0px 0px 6px 1px #F0B0B1'
checkpwd.style.boxShadow = '0px 0px 6px 1px #F0B0B1'
email.style.boxShadow = '0px 0px 6px 1px #F0B0B1'

let checkpwdFun = false
let passwordFun = false
let emailFun = false

checkpwd.addEventListener('keyup', () => {
    if (password.value === checkpwd.value) {
        checkpwd.style.boxShadow = '0px 0px 8px 2px #CDF0B0'
        checkpwdFun = true
    } else {
        checkpwd.style.boxShadow = '0px 0px 6px 1px #F0B0B1'
        checkpwdFun =  false
    }
    console.log(checkpwdFun)
})

password.addEventListener('keyup',()=>{
    //regex = at least one number, one capitol lett., one special character
    const strRegEx = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&*^)(])(?=.*[0-9]).*/gm
    let validPass = strRegEx.test(password.value)
    let pwd = password.value
    if(pwd.length < minChar){
    lengthCounter.innerHTML = `-${minChar - pwd.length}`
    }else{
        lengthCounter.innerHTML = ''
    }
    if(validPass){
        if(pwd.length >= minChar){
        password.style.boxShadow = '0px 0px 8px 2px #CDF0B0'
        passwordFun = true
        }else{
            password.style.boxShadow = '0px 0px 8px 2px #F0B0B1' 
            passwordFun = false
        }
    }else{
        password.style.boxShadow = '0px 0px 8px 2px #F0B0B1' 
        passwordFun = false
    }
    console.log(validPass)

    if (password.value === checkpwd.value) {
        checkpwd.style.boxShadow = '0px 0px 8px 2px #CDF0B0'
        checkpwdFun = true
    } else {
        checkpwd.style.boxShadow = '0px 0px 6px 1px #F0B0B1'
        checkpwdFun =  false
    }
    console.log(passwordFun)
})
email.addEventListener('keyup',()=>{
    const strRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    let validEmail = strRegEx.test(email.value)
    if (validEmail) {

        email.style.boxShadow = '0px 0px 6px 1px #CDF0B0'
        emailFun = true

    } else {
        email.style.boxShadow = '0px 0px 6px 1px #F0B0B1'
        emailFun = false
    }
    
    console.log(emailFun)
})

console.log('fetching...')
//const fetchSignUserData = async ()=> {
console.log(checkpwdFun,passwordFun,emailFun)

    const form = document.getElementById('signin-form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        if (checkpwdFun === true && passwordFun === true && emailFun === true) {
        console.log('submit...')
        
        const formData = { email: email.value, password: password.value };

        //form.action = /signin-data
        fetch('/signin-data', {
            method: form.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                responseMessage(data.status, data.message)
                console.log(data.status, data.message)
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            console.log('you made some mistakes...')
            responseMessage('error-fields','fill all the fields' )
        }

    })

//}
//fetchSignUserData()

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
        case 'error-fields':
            responseContainer.innerHTML = message
            responseContainer.style.display = 'flex'
            responseContainer.style.justifyContent = 'center'
            responseContainer.style.backgroundColor = '#FDDECA'
            responseContainer.style.border = 'solid 0.3px #F0B0B1'
            responseContainer.style.color = '#C3A28E'
            responseContainer.style.borderRadius = '4px'
            responseContainer.style.padding = '2px'
            responseContainer.style.marginTop = '10px'
            setTimeout(() => {
                responseContainer.textContent = ''
                responseContainer.style.backgroundColor = 'none'
                responseContainer.style.border = 'none'
                responseContainer.style.color = 'none'
                responseContainer.style.padding = '0'
            }, 2000)
            break;
        default:
            break;
    }
    
}