//navigation throgh pages
function navigationMenu (){
    const profile = document.getElementById('profile')
    const main = document.getElementById('main')
    const addPage = document.getElementById('add-page')
    const achivements = document.getElementById('milestones')
    
    profile.addEventListener('click', ()=>{
      window.location.href = 'profile.html'
      console.log('click!')
    })
    main.addEventListener('click', ()=>{
      window.location.href = 'index.html'
      console.log('click!')
    })
    addPage.addEventListener('click', ()=>{
      window.location.href = 'newmilestone.html'
      console.log('click!')
    })
    achivements.addEventListener('click', ()=>{
      window.location.href = 'achivements.html'
      console.log('click!')
    })


    console.log('funzione importata...')
    }
   