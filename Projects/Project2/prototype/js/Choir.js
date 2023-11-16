class Choir {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 100;
        this.mouthSize = 10;
    }

    mouthMove() {
        let size = map(mouseY, 0, height, 30, 5);
        this.mouthSize = size;
    }
    
    display() {
        noStroke();
        fill(225, 198, 153);
        ellipse(this.x, this.y, this.size / 2);
        fill(255);
        ellipse(this.x, this.y + 106, this.size / 2, this.size + 60);
        fill(0);
        ellipse(this.x - 15, this.y, this.size / 10 );
        fill(0);
        ellipse(this.x + 15, this.y, this.size / 10);
        fill(0);
        ellipse(this.x, this.y + 15, this.mouthSize);
    }
}