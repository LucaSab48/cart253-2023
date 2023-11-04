//Here i am creating the class for our bunny objects
class Bunny {
    //This constructor is setting all the properties for our bunny objects
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 80;
        this.vy = 0;
        this.vx = 0;
        this.speed = 4;
        this.jitter = 0.05;//This allows the bunny to switch directions at random
        this.alive = true;//This checks if the bunny is alive 
    }

    //This function allows our bunny to have movement
    move() {
        //This if statement checks if a randomly assigned value r is smaller than our jitter value to then switch directions
        let r = random(0, 1);
        if(r < this.jitter) {
            this.vx = random(-this.speed, this.speed);
            this.vy = random(-this.speed, this.speed);
        }
        //This section changes our bunnies position depending on the velocity and constrains them to the map
        this.x += this.vx;
        this.y += this.vy;
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    //This function displays our bunny objects
    display() {
        //This is his head
        push();
        fill(150);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();

        //This is his eyes
        push();
        fill(0, 0, 0);
        noStroke();
        ellipse(this.x - this.size / 10, this.y, this.size / 10);
        ellipse(this.x + this.size / 10, this.y, this.size / 10);
        pop();

        //This is his ears
        push();
        fill(200);
        noStroke();
        ellipse(this.x - this.size / 2.5, this.y - this.size / 1.5, this.size / 3, this.size);
        ellipse(this.x + this.size / 2.5, this.y - this.size / 1.5, this.size / 3, this.size);
        pop();
    }
}