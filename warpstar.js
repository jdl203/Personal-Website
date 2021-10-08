function WarpStar(star) {
    this.xNeg = 1;
    this.yNeg = 1;

    this.xDiff = windowWidth/2 - star.x;
    this.yDiff = windowHeight/2 - star.y;

    this.xSlope = this.xDiff/100*-1;
    this.ySlope = this.yDiff/100*-1;

    this.x = star.x;
    this.y = star.y;

    this.firstX = star.x;
    this.firstY = star.y;
    
    this.iterations = 0;

    this.show = function() {
        stroke(150);
        strokeWeight(3);
        line(this.firstX, this.firstY, this.x, this.y);
        
    }

    this.move = function() {
        this.x += this.xSlope*this.iterations*.1;
        this.y += this.ySlope*this.iterations*.1;

        this.iterations += 1;

    }
}