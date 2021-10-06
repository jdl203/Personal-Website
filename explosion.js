function Explosion(letter) {
    this.letter = letter;
    this.particles = [];

    for(var x = 0; x < 10; x++) {
        particle = new Particle(letter);
        this.particles.push(particle);
    }

    this.show = function() {
        for(var x = 0; x < this.particles.length; x++) {
            this.particles[x].show();
        }
    }

    this.move = function() {
        for(var x = 0; x < this.particles.length; x++) {
            this.particles[x].move();
        }
    }
}