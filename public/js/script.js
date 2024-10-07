const userPic = document.getElementById('user-pic')
const titleElement = document.getElementById('title')
const subTitleElement  = document.getElementById('sub-title')
const stonesCounter = document.getElementById('counter')
const timeline = document.getElementById('timeline')
const body = document.querySelector('body')


const userData = [{
    user_id: 123,
    hobby: "photography",
    hobby_start_year: "2015",
    color: "blue",
    title: "Nature Photographer",
    subtitle: "Capturing the beauty of the world, one shot at a time.",
    photo_path: "pictures/IMG_20180930_180137.jpg",
    stones: 33,
    timestamp: "2024-10-06T22:40:00Z"
  },
  {
    user_id: 124,
    hobby: "running",
    hobby_start_year: "2002",
    color: "green",
    title: "Track&Field runner",
    subtitle: "Never give up.",
    photo_path: "pictures/IMG_20180930_180137.jpg",
    stones: 107,
    timestamp: "2024-10-07T22:40:00Z"
  }]

let { userID, hobby,hobby_start_year, color, title, subtitle, photo_path, stones,timestamp} = userData




const calculateTime = (start) =>{
     const today = new Date()
    let currentYear = today.getFullYear()
    let difference = currentYear - start
    return difference
}

console.log(calculateTime(hobby_start_year))






const createUserMilestone = () => {
    console.log(userData.length)
    userData.forEach(el => {
        const milestoneLayout = `
                <div class="milestone-container" >
                        <div class="milestone-header">
                            <div class="picture">
                                <img class="user-pic" id="user-pic" src=${el.photo_path} alt="pic-img">
                            </div>
                            <div class="label-container">
                                <div class="title" id="title">${el.title}</div>
                                <div class="sub-title" id="sub-title">${subtitle}</div>
                            </div>
                            <div class="stone-counter">
                                <div class="counter" id="counter">${el.stones}</div>
                                <span class="material-symbols-outlined">beenhere</span>
                            </div>
                        
                        </div>
                        <div class="milestone-mask">
                            <!-- MILESTONE HERE -->
                                <div class="timeline" id="timeline"></div>
                        </div>
                    </div>

                `

        const bodyElement = document.createElement('div')
        bodyElement.innerHTML = milestoneLayout
        const elementsObj = bodyElement.children

        for (let i = 0; i < elementsObj.length; i++) {
            body.append(elementsObj[i])

        }
    });


}
createUserMilestone()
