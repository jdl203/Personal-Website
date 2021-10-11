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

    this.color = [255, 255, 255];
    
    this.iterations = 0;

    this.show = function() {
        stroke(this.color[0], this.color[1], this.color[2]);
        strokeWeight(2);
        line(this.firstX, this.firstY, this.x, this.y);
        
    }

    this.move = function() {
        
        if (this.iterations >= 60) {
            this.x += this.xSlope*this.iterations*this.iterations*.01;
            this.y += this.ySlope*this.iterations*this.iterations*.01;
        }

        else if (this.iterations >= 0) {
            this.x += this.xSlope*this.iterations*this.iterations*.0001;
            this.y += this.ySlope*this.iterations*this.iterations*.0001;
        }

        

        if (this.iterations >= 100) {
            this.firstX += this.xSlope*(this.iterations-100)*(this.iterations-100)*.1;
            this.firstY += this.ySlope*(this.iterations-100)*(this.iterations-100)*.1;
        }

        else if (this.iterations >= 60) {
            this.firstX += this.xSlope*(this.iterations-60)*(this.iterations-60)*.001;
            this.firstY += this.ySlope*(this.iterations-60)*(this.iterations-60)*.001;
        }

        

        this.iterations += 1;
    }
}