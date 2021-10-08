function Star(y) {
    this.x = Math.random() * windowWidth;
    this.y = y;
    this.dir = (Math.random() / 10) + .05;

    this.show = function() {
        fill(150);
        circle(this.x, this.y, 20*(.2-this.dir));
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