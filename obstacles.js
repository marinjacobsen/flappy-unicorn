var obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.width = 20;
    this.color = "hsla(" + hue + ",56%, 45%, 1)";
    this.counted = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  //move obstacles
  update() {
    this.x -= gamespeed;
    //þegar við förum framhjá obstacle increasar score
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

//new obsticle every 50 frames
function handleObstacles() {
  if (frame % 50 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray.lenght > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
//tæma lista þegar nýr enter leikur hefst
window.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    obstaclesArray = [];
  }
});
