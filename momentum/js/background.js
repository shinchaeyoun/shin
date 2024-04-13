const img = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg'];
const imgIdx = img[Math.floor(Math.random() * img.length)];

document.body.style.backgroundImage = `url(./img/${imgIdx})`;