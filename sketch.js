var ship;

var aboutPage;
var resumePage;
var projectsPage;
var contactPage;

var pages;

var lasers = [];
var explosions = [];

function preload() {
  testFont = loadFont('fonts/Press_Start_2P/PressStart.ttf');
  shipImage = loadImage('Ship.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  aboutPage = new Page('About', [255, 0, 200]);
  resumePage = new Page('Resume', [0, 100, 200]);
  projectsPage = new Page('Projects', [200, 200, 0]);
  contactPage = new Page('Contact', [255, 50, 0]);
  pages = [aboutPage, resumePage, projectsPage, contactPage];
  angleMode(DEGREES);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  ship.show(shipImage);
  ship.move();

  textFont(testFont);

  numPages = pages.length;
  for (var x = 0; x < numPages; x++) {
    pageOffset = x/numPages*width + width/(numPages*2);
    pages[x].show(pageOffset);
  }

  // Lasers
  for (var x = 0; x < lasers.length; x++) {
    lasers[x].show();
    lasers[x].move();
    var hit = false;
    for (var y = 0; y < numPages; y++) {
      for (var z = 0; z < pages[y].letters.length; z ++) {
        if (lasers[x].hits(pages[y].letters[z])) {
          var explosion = new Explosion(pages[y].letters[z]);
          explosions.push(explosion);
          hit = true;
          pages[y].letters[z].alive = false;
        }
      }
    }
    if (hit) {
      lasers.splice(x, 1);
    }
  }

  // Explosions
  for (var x = 0; x < explosions.length; x++) {
    explosions[x].show();
    explosions[x].move();
  }
}
 
function keyPressed() {
  if (key === ' ') {
    var laser = new Laser(width/2 + ship.x_offset*.001*width, height-100);
    lasers.push(laser);
  }

  if (keyCode === RIGHT_ARROW) {
      ship.dir = 2;
  } else if (keyCode === LEFT_ARROW) {
      ship.dir = -2;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    ship.dir = 0;
  } else if (keyCode === LEFT_ARROW) {
      ship.dir = 0;
  }
}