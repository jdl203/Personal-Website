function Particle(letter) {
    xNeg = 1;
    if (Math.random() < .5){
        xNeg = -1;
    }

    yNeg = 1;
    if (Math.random() < .5) {
        yNeg = -1;
    }

    this.xSlope = Math.random() * xNeg;
    this.ySlope = Math.random() * yNeg;
    this.x = letter.x + letter.size/2;
    this.y = letter.y - letter.size/2;
    this.color = letter.color;
    this.colorFrac = Math.random();

    this.show = function() {
        fill(this.getParticleColor(0), this.getParticleColor(1), this.getParticleColor(2));
        rectMode(CENTER);
        rect(this.x, this.y, 5, 5);
    }

    this.move = function() {
        this.x += this.xSlope;
        this.y += this.ySlope;
    }

    this.getParticleColor = function(index) {
        return (this.color[index] + (255-this.color[index])*this.colorFrac);
    }
}