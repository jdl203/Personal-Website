function Page(name, colors) {
    this.letters = [];
    this.name = name;
    this.colors = colors;
    this.alive = true

    for (var x = 0; x < name.length; x++) {
        this.letters.push(new Letter(name.charAt(x), colors));
    }

    this.show = function(pageOffset) {
        var pageTextWidth = (-1 * textWidth(this.name))/2; 
        var lettersTextWidth = 0;

        // Check if any letters are alive still
        this.alive = false;

        for (var x = 0; x < this.letters.length; x++) {
            this.letters[x].show(pageTextWidth + lettersTextWidth, pageOffset, this.colors);
            lettersTextWidth += textWidth(name.charAt(x));

            if (this.letters[x].alive) {
                this.alive = true;
            }
        }
        
    }
}