function Ship() {
    this.x_offset = 0;
    this.dir = 0;

    this.show = function(img) {
        fill(255);
        imageMode(CENTER);
        image(img, width/2 + this.x_offset*.001*width, height-75, width/10, width/10)
    }

    this.move = function() {
        this.x_offset += this.dir*1;
    }
}

