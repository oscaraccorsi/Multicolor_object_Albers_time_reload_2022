let baseUrlPictures = ' https://oscaraccorsi.github.io/Albers/';
let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let logo;

let img; 
let palette = [];
let pictureList = ['albers01.jpg', 
                   'albers02.jpg', 
                   'albers03.jpg', 
                   'albers04.jpg',
                   'albers05.jpeg', 
                   'albers06.jpg', 
                   'albers07.jpg',  
                   'albers08.jpg', 
                   'albers09.jpg', 
                   'albers10.jpg', 
                   'albers11.jpeg',
                   'albers12.jpg'];

let shapes = [];
let speed;

let quantity;
let howManyTime;
let spssr = [1, 2, 3, 5, 8, 11, 19, 40];
let spessore;
let dividerArray = [2, 3, 5, 8, 11, 19, 40];
let divider;

//--------------------------------------preload
function preload() {
  h = hour()%12;
  img = loadImage(baseUrlPictures +
                  pictureList[h]);
  logo = loadImage(baseURLImage + 
                   'good one white.png');
  console.log(pictureList[h]);
}

//--------------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  quantity = 1;
  howManyTime = round(random(15, 60));
  speed = random(0.1, 1);
  divider = random(dividerArray);
  console.log(divider);
  
//------------------------------------------------palette 
  img.resize(100, 0);
  img.loadPixels();
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let alpha = round(random(100, 200));
    let c = color(r, g, b, 100);
    palette.push(c);    
  }
  background(random(palette));
  setInterval(changeBG, 1000*(howManyTime/divider));
  setInterval(reloadPage, 1000*howManyTime);
  
  for (let i = 0; i < quantity; i++) {
    shapes[i] = {
      x: width/2,
      y: random(height),
      x1: random(width),
      y1: random(height),
      x2: random(width),
      y2: random(height),
      x3: random(width),
      y3: random(height),
      speedX: random(-speed, speed),
      speedY: random(-speed, speed),
      col: random(palette),
      spessore: random(spssr)
    };
  }
 
}

//--------------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//-----------------------------------------------------DRAW
function draw() {
  //background("black");
      
  strokeCap(SQUARE);
  
  noFill();
  
  
  
  for (b of shapes) { 
    stroke(b.col);
    strokeWeight(b.spessore);
    bezier(b.x, b.y, b.x1, b.y1, b.x2, b.y2, b.x3, b.y3);
    
    b.x += b.speedX;
    b.y += b.speedY;
    // b.x1 += b.speedX;
    // b.y1 += b.speedY;
    // b.x2 += b.speedX;
    // b.y2 += b.speedY;
    b.x3 += b.speedX;
    b.y3 += b.speedY;

    if (b.x < 0 || b.x > width || b.x3 < 0 || b.x3 > width) {
      b.speedX = -b.speedX;
    }
    if (b.y < 0 || b.y > height || b.x3 < 0 || b.x3 > height) {
      b.speedY = -b.speedY;
    }
  }
}

function changeBG() {
  background(random(palette));
}
//----------------------------------reLoad
function reloadPage() {
   window.location.reload();
}
function mousePressed() {
  imageMode(CENTER);
  let xLogo = windowWidth-40;
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200);
  imageMode(CORNER);
  save();  
}
