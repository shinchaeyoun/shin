const clock = document.querySelector("#clock");
const currentDate = document.querySelector('#current-date');
const currentDateKr = document.querySelector('#current-date-kr');

function handleDate(){
    const date = new Date();
    const week = ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const weekKr = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
    const monthKr = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    // currentDate.innerText = `${week[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]}`

    currentDate.innerText = `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekKr[date.getDay()]}`
};
function handleClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")

    clock.innerText = `${hours}:${minutes}:${seconds}`;
};

handleDate();
handleClock();
setInterval(handleClock, 1000);
