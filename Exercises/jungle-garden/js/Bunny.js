class Bunny {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 80;
        this.vy = 0;
        this.vx = 0;
        this.speed = 4;
        this.jitter = 0.05;
        this.alive = true;
    }

    move() {
        let r = random(0, 1);
        if(r < this.jitter) {
            this.vx = random(-this.speed, this.speed);
            this.vy = random(-this.speed, this.speed);
        }
        this.x += this.vx;
        this.y += this.vy;
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() {
        push();
        fill(150);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();

        push();
        fill(0, 0, 0);
        noStroke();
        ellipse(this.x - this.size / 10, this.y, this.size / 10);
        ellipse(this.x + this.size / 10, this.y, this.size / 10);
        pop();

        push();
        fill(200);
        noStroke();
        ellipse(this.x - this.size / 2.5, this.y - this.size / 1.5, this.size / 3, this.size);
        ellipse(this.x + this.size / 2.5, this.y - this.size / 1.5, this.size / 3, this.size);
        pop();
    }
}