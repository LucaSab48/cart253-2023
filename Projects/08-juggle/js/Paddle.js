class Paddle {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.x;
        this.y = height - this.height / 2;
    }

    move() {
        this.x = mouseX;
    }

    display() {
        push();
        fill(255, 0, 0);
        stroke(0);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    }
}