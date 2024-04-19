const imgArr = [
  './img/about/1.png',
  './img/about/2.png',
  './img/about/3.png',
  './img/about/4.png',
  './img/about/5.png',
  './img/about/6.png',
  './img/about/7.png',
  './img/about/8.png',
  './img/about/9.png',
  './img/about/10.png',
  './img/about/11.png',
  './img/about/12.png',
  './img/about/13.png',
];

const aboutContainer = $('#about');
const aboutImg = aboutContainer.find('.grid-item:last-child');
let randomImg = imgArr[Math.floor(Math.random() * imgArr.length)];

$(function(){

  aboutImg.on('mouseover mouseleave', function (){
    randomImg = imgArr[Math.floor(Math.random() * imgArr.length)];
    $(this).css({backgroundImage: `url(${randomImg})`})
  });
  
});