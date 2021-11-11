var ship;

var aboutPage;
var resumePage;
var projectsPage;
var contactPage;

var pages;
var allCharsLength = 2;

var lasers = [];
var explosions = [];
var stars = [];
var warpStars = [];

var game = true;
var starsLeft = 1000;
var startGame = true;

var controlsTint = 255;

function preload() {
  testFont = loadFont('fonts/Press_Start_2P/PressStart.ttf');
  shipImage = loadImage('Ship.png');
  controlsImage = loadImage('Controls.png');
}
function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  aboutPage = new Page('About', [0, 100, 200]);
  resumePage = new Page('Resume', [255, 0, 200]);
  projectsPage = new Page('Projects', [0, 255, 0]);
  contactPage = new Page('Contact', [255, 50, 0]);
  pages = [aboutPage, resumePage, projectsPage, contactPage];

  for (var x = 0; x < pages.length; x++) {
    allCharsLength += pages[x].name.length + 2;
    console.log(allCharsLength);
  }
  angleMode(DEGREES);
  // Create stars
  for (var x = 0; x < 80; x++) {
    stars.push(new Star(Math.random() * windowHeight));
  }

  textFont(testFont);

}

function draw() {

  resizeCanvas(windowWidth, windowHeight);
  background(3, 7, 30);

  if (!game) {

    // Warp Stars
    for (var x = 0; x < warpStars.length; x++) {
      warpStars[x].show();
      warpStars[x].move();

    }

    // Explosions
    if (warpStars[0].iterations < 60) {
      for (var x = 0; x < explosions.length; x++) {
        explosions[x].move();
        explosions[x].show();
      }
    }
    if (warpStars[0].iterations == 60) {
      explosions_into_warp_stars();
    }

    // Stars after warp speed
    if (warpStars[0].iterations == 100) {
      for (var x = 0; x < 80; x++) {
        stars.push(new Star(Math.random() * windowHeight));
      }
    }
    for (var x = 0; x < stars.length; x ++) {
      
      stars[x].show();
      stars[x].move();
    }
  }

  else {

    // Stars
    for (var x = 0; x < stars.length; x++) {
      stars[x].show();
      stars[x].move();
    }

    // Pages
    for (var x = 0; x < pages.length; x++) {
      if (!pages[x].alive) {
        warp_add_stars();

        stroke(255);
        strokeWeight(10 - starsLeft/100);

        if (starsLeft == 40) {
          // Pop letters
          for (var y = 0; y < numPages; y++) {
            for (var z = 0; z < pages[y].letters.length; z ++) {
              if (pages[y].letters[z].alive) {
                var explosion = new Explosion(pages[y].letters[z]);
                explosions.push(explosion);
                pages[y].letters[z].alive = false;
              }
            }
          }
        }
        
        if (starsLeft <= 0){
          game = false;
          print(pages[x].name);
          stars_into_warp_stars();
          stars = [];
        }
        
      }
    }
    
    if (!startGame && controlsTint > 0) {
      controlsTint -= 5;
    }
    showControls();

    ship.show(shipImage);
    ship.move();

    // Pages
    numPages = pages.length;
    numLetters = 2;
    for (var x = 0; x < numPages; x++) {
      pageOffset = width/allCharsLength * numLetters + ((width/allCharsLength * (pages[x].name.length+numLetters)) - (width/allCharsLength * numLetters))/2;
      numLetters += pages[x].name.length + 2;

      pages[x].show(pageOffset);
    }

    

    // Explosions
    for (var x = 0; x < explosions.length; x++) {
      explosions[x].show();
      explosions[x].move();
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
  }  
}
 
function keyPressed() {
  if (key === ' ') {
    checkStart();
    var laser = new Laser(width/2 + ship.x_offset*.001*width, height-100);
    lasers.push(laser);
  }

  if (keyCode === RIGHT_ARROW) {
    checkStart();
    ship.dir = 2;
  } else if (keyCode === LEFT_ARROW) {
    checkStart();
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

function warp_add_stars() {
  if (starsLeft > 40) {
    for (var x = 0; x < 10; x++) {
      stars.push(new Star(Math.random() * windowHeight));
      starsLeft -= 1;
    }
  }
  else {
    starsLeft -= 1;
  }
}

function stars_into_warp_stars() {
  for (var x = 0; x < stars.length; x++) {
    warpStars.push(new WarpStar(stars[x]));
  }
}

function explosions_into_warp_stars() {
  for (var x = 0; x < explosions.length; x++) {
    for (var y = 0; y < explosions[x].particles.length; y++) {
      newStar = new Star(explosions[x].particles[y].y);
      newStar.x = explosions[x].particles[y].x;
      warpStars.push(new WarpStar(newStar));

      // Update characteristics of new warp star
      warpStars[warpStars.length-1].iterations = 60;

      particle = explosions[x].particles[y];

      warpStars[warpStars.length-1].color = [particle.getParticleColor(0), particle.getParticleColor(1), particle.getParticleColor(2)];
    }
  }
}

function checkStart() {
  if (startGame) {
    startGame = false;
  }
}

function showControls() {
  if (controlsTint > 0) {
    tint(controlsTint, controlsTint, controlsTint);
    image(controlsImage, width/2, height/2, width/5, width/5);
    noTint();
  }
}