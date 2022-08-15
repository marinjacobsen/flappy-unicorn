const einhyrningurSprite = new Image();
einhyrningurSprite.src = "adal.png";

const FLAP = new Audio();
FLAP.src = "audio/jump.mov";
class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    //speed
    this.vy = 0;
    this.originalWidth = 211;
    this.originalHeight = 114;
    this.width = this.originalWidth / 4;
    this.height = this.originalHeight / 4;
    //gravity
    this.weight = 1;
    this.frameX = 0;
  }

  update() {
    //láta bird hreyfast aðeins þegar hann er idle
    let curve = Math.sin(angle) * 20;
    //passa að bird sé alltaf inní canvas
    //this.height*2 = stoppar aðeins frá canvas
    if (this.y > canvas.height - this.height * 2 + curve) {
      this.y = canvas.height - this.height * 2 + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      //minnka hraða á flugi
      this.vy *= 0.9;
      this.y += this.vy;
    }
    //passa að við getum ekki flogið fyrir ofan canvas
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    //lætur hann lenda meira smooth á top canvas þegar hann rekst á
    if (spacePressed && this.y > this.height * 2) this.flap();
  }
  //draw player
  draw() {
    ctx.drawImage(
      einhyrningurSprite,
      this.frameX * this.originalWidth,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x - 30,
      this.y - 10,
      this.width * 1.8,
      this.height * 1.8
    );
  }
  //hækka fugl á canvas þegar hann flýgur
  flap() {
    FLAP.play();
    this.vy -= 3;
    if (this.frameX >= 3) this.frameX = 0;
    else if (frame % 3 === 0) this.frameX++;
  }
}
//þegar nýr enter leikur hefst
const bird = new Bird();
