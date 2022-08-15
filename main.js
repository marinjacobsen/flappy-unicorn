const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

//
let spacePressed = false;
// til að geta látið fugl hreyfast smá þegar hann er idle
let angle = 0;
//til að geta gert litabreytingar á obstacles
let hue = 0;
//keep track of framecount of animation loop
let frame = 0;
//score increases þegar við förum framhjá obstacle
let score = 0;
// svo við getum látið mismunandi obstacles og background hreyfast á sama hraða
let gamespeed = 2;

var scoreList = [];
var leaderboard = document.getElementById("highscores");
var looper;

//litur fyrir score track á canvas
const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop(0, "white");
gradient.addColorStop(0.3, "black");
gradient.addColorStop(1, "#FF0000");

//bakgrunnur á hreyfingu
const background = new Image();
background.src = "back1.jpeg";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  else BG.x1 -= gamespeed;
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= gamespeed;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

//hreynsa canvas - between every frame of animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleObstacles();
  handleParticles();
  //búa til fugl
  bird.update();
  bird.draw();
  //create scorecount on canvas
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleCollisions();
  if (handleCollisions()) return;
  //kallar á animation
  looper = requestAnimationFrame(animate);
  //hraði á flapping when idle
  angle += 0.12;
  //breyta um lit
  hue++;
  frame++;
}
//kalla á animate function 
animate();

function newGame(e) {
  ctx.clearRect(0, 0, canvas.height, canvas.width);
}

// hlustar á space til að hoppa
window.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
    spacePressed = true;
  }
});

// hlustar á enter til að byrja aftur
window.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    scoreList.push(score);
    score = 0;
    leaderboard.innerHTML = "";
    scoreList.sort(function (a, b) {
      return b - a;
    });
    cancelAnimationFrame(looper);
    if (scoreList.length === 4) {
      scoreList.pop();
    }
    for (var i = 0; i < scoreList.length; i++) {
      leaderboard.innerHTML += `<li>${scoreList[i]}</li>`;
    }
    animate();
  }
});

//ekki hægt að ýta á aðra takka
window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
});

//þegar þú deyrð..
const HIT = new Audio();
HIT.src = "audio/suck.mp3";

//mynd sem kemur þegar klesst er á obstacles
const bang = new Image();
bang.src = "bang2.png";

//collison function
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      (bird.x) + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top
        && bird.y + bird.height > 0) ||
        (bird.y + bird.height > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))) {
      // teikna bang mynd þegar collision er detected
      HIT.play();
      ctx.drawImage(bang, bird.x - 30, bird.y - 50, 100, 110);

      //textinn sem kemur upp eftir dauða
      ctx.fillStyle = "#db001d";
      ctx.fillRect(90, 140, 420, 90);
      ctx.fillStyle = "black";
      ctx.font = "18px Courier New";
      ctx.fillText(`You suck, þú féllst með ${score} í einkunn`
        , 110, 170, 420, 90);
      ctx.fillText("- Ýttu á enter til að reyna aftur"
        , 110, 200, 420, 90);
      //þegar nýr enter leikur hefst
      cancelAnimationFrame(looper);
      return true;
    }
  }
}
