const userPic = document.getElementById('user-pic')
const titleElement = document.getElementById('title')
const subTitleElement  = document.getElementById('sub-title')
const stonesCounter = document.getElementById('counter')
const timeline = document.getElementById('timeline')
const body = document.querySelector('body')

const milestoneLayout = `
    <div class="milestone-container" >
            <div class="milestone-header">
                <div class="picture">
                    <img class="user-pic" id="user-pic" src="pictures/IMG_20180930_180137.jpg"  alt="pic-img">
                </div>
                <div class="label-container">
                    <div class="title" id="title">Title</div>
                    <div class="sub-title" id="sub-title">Sub Title</div>
                </div>
                <div class="stone-counter">
                    <div class="counter" id="counter">33/33</div>
                    <span class="material-symbols-outlined">beenhere</span>
                </div>
            
            </div>
            <div class="milestone-mask">
                <!-- MILESTONE HERE -->
                 <div class="timeline" id="timeline"></div>
            </div>
        </div>
`
const userData = {
    user_id: 123,
    hobby: "photography",
    hobby_start_year: "2015",
    color: "blue",
    title: "Nature Photographer",
    subtitle: "Capturing the beauty of the world, one shot at a time.",
    photo_path: "/user/pictures/profile.jpg",
    stones: 33,
    timestamp: "2024-10-06T22:40:00Z"
  }

let { userID, hobby,hobby_start_year, color, title, subtitle, photo_path, stones,timestamp} = userData

console.log(hobby_start_year)


const calculateTime = (start) =>{
     const today = new Date()
    let currentYear = today.getFullYear()
    let difference = currentYear - start
    return difference
}

console.log(calculateTime(hobby_start_year))


const createUserMilestone = (title,suTitle,stonesCounter,timelineLength)=>{

}