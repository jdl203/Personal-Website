function Star(y) {
    this.x = Math.random() * windowWidth;
    this.y = y;
    this.dir = (Math.random() / 5) + .1;

    this.show = function() {
        strokeWeight(0);
        fill(255);
        circle(this.x, this.y, 20*(.3-this.dir));
    }

    this.move = function() {
        this.y -= this.dir;

        // Check if star off screen
        if (this.y < 0) {
            this.y = windowHeight;
            this.x = Math.random() * windowWidth;
        }
    }
}