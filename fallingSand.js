const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
const updateCheckbox = document.getElementById("updateBool")
const updateButton = document.getElementById("updateOnce")
const colorSlider = document.getElementById("fillColor")
const sliderLabel = document.getElementById("sliderLabel")

const fillColor = ["black","white","darkred","darkgreen","indigo","orange"];
const pixelSize = 20;
const rowPixel = canvas.width/pixelSize;
const columnPixel = canvas.height/pixelSize;
const updateDelay = 500; //in ms

let pixel = new Array(columnPixel);
let lastTime = 0;
let colorChoice = colorSlider.value;
var holdInterval;
//initialisation
for (var i = 0; i < columnPixel; i++) {
    pixel[i] = new Array(rowPixel);
    pixel[i] = Array(rowPixel).fill(0);
}

updateButton.addEventListener('click',update);
colorSlider.addEventListener('input',onSliderChange);
function onSliderChange(event){
    colorChoice = colorSlider.value;
    sliderLabel.textContent = fillColor[colorChoice];
    sliderLabel.style.color = fillColor[colorChoice];
    console.log(fillColor[colorChoice]);
}

canvas.addEventListener('touchstart', touchStart, false);
canvas.addEventListener('touchmove', moveTouch, false);
function touchStart(event) {
    event.preventDefault();
    // Start an interval to update pixel continuously
    putPixel(event);
}
function moveTouch(event) {
    event.preventDefault();
    putPixel(event);
}
function putPixel(event) {
    var touchX = Math.floor((event.touches[0].pageX - canvas.getBoundingClientRect().left) / pixelSize);
    var touchY = Math.floor((event.touches[0].pageY - canvas.getBoundingClientRect().top) / pixelSize);
    pixel[touchY][touchX] = colorChoice;
    console.log(touchX, touchY);
}

function update() {
    //simulation rules here
    console.log('y');
}

function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //time calculations
    Time = new Date();
    currentTime = Time.getTime();
    dtime = currentTime-lastTime; //in ms
    if(updateCheckbox.checked){
        if (dtime>=updateDelay){
            lastTime = currentTime;
            update();
        }
    }
    for (var i = 0; i < columnPixel; i++) {
        for (var j = 0; j < rowPixel; j++) {
            if(pixel[i][j]==0){
                ctx.strokeStyle = "white";
                ctx.strokeRect(j*pixelSize,i*pixelSize,pixelSize,pixelSize);
            }
            else{
                ctx.fillStyle = fillColor[pixel[i][j]];
                ctx.fillRect(j*pixelSize,i*pixelSize,pixelSize,pixelSize);
            }
        }
    }
    //console.log(updateCheckbox.checked);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);