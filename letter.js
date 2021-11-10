function Letter(character, color) {
    this.x = width/4;
    this.y = height/6 + 20;
    this.size = width/40; 
    this.character = character;
    this.color = color
    this.alive = true;

    this.show = function(letterOffset, pageOffset, colors) {

        this.size = width/allCharsLength;
        this.y = height/6 + 20;

        if (this.alive) {
            this.x = pageOffset + letterOffset;

            fill(colors[0], colors[1], colors[2]);
            textSize(this.size);
            text(character, this.x, this.y);
        }
    }

}