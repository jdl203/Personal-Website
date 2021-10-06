function Laser(x, y) {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 12;

    this.show = function() {
        noStroke();
        fill(200,200,200);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    }

    this.hits = function(letter) {
        var widthDiff = Math.abs((this.x + (this.width/2)) - (letter.x + (letter.size/2)));
        var heightDiff = Math.abs((this.y) - (letter.y - (letter.size/2)));
        if (widthDiff < letter.size/2 && heightDiff < letter.size/2 && letter.alive) {
            return true;
        } else {
            return false;
        }
    }

    this.move = function() {
        this.y = this.y - 4;
    }
}