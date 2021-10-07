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
        for(var z = 0; z < this.particles.length; z++) {
            this.particles[z].move();

            if (this.particles[z].x > windowWidth || this.particles[z].x < 0) {
                this.particles.splice(z, 1);
            }

            if (this.particles[z].y > windowHeight || this.particles[z].y < 0) {
                this.particles.splice(z, 1);
            }
        }
    }
}