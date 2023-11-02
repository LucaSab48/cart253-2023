class Ball {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.maxSpeed = 10;
        this.size = 50;
        this.active = true;
    }

    gravity(force) {
        this.accelerationY += force;
    }

    move() {
        this.velocityX += this.accelerationX
        this.velocityY += this.accelerationY;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY = constrain(this.velocityY, -this.maxSpeed, this.maxSpeed);
        this.velocityX = constrain(this.velocityX, -this.maxSpeed, this.maxSpeed);
        if(this.y - this.size / 2 > height) {
            this.active = false;
        }
    }

    bounce(paddle) {
        if(this.x > paddle.x - paddle.width / 2 && this.x < paddle.x + paddle.width / 2 
        && this.y + this.size / 2 > paddle.y - paddle.height / 2 && this.y + this.size / 2 < paddle.y + paddle.height / 2) {
            let dx = this.x - paddle.x;
            this.velocityX += map(dx, -paddle.width / 2, paddle.width / 2, -2, 2);
            this.velocityY = -this.velocityY;
            this.accelerationY = 0;
        }
    }

    display() {
        push();
        fill(0, 255, 0);
        stroke(0);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}