const clock = document.querySelector("#clock");
const currentDate = document.querySelector('#current-date');
const currentDateKr = document.querySelector('#current-date-kr');

function handleClock(){
    const date = new Date();
    const week = ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const weekKr = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
    const monthKr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")

    currentDate.innerText = `${week[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]}`

    // currentDateKr.innerText = `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekKr[date.getDay()]}`

    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

handleClock();
setInterval(handleClock, 1000);
