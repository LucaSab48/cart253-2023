//This class creates our bee objects
class Bee {
    //The constructor here is setting all the bee properties
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 40;
      this.minSize = 10; //This is the minimum  size for death
      this.maxSize = 40; //This is the maximum size
      this.vx = 0;
      this.vy = 0;
      this.speed = 5;
      this.growRate = 0.2; //This is how much the bee grows if it pollinates
      this.shrinkRate = 0.03; //How much smaller the bee shrinks each frame 
      this.jitteriness = 0.1; //How likely the bee will change direction
      this.alive = true; //If the bee is alive or not
    }
  
    //This function shrinks our bees over time
    shrink() {
      //This part shrinks the bees by our set amount
      this.size = this.size - this.shrinkRate;
      //Checks if the bee has reached min size for death
      if (this.size < this.minSize) {
        this.alive = false;
      }
    }
  
    //This function checks if the bees are touching any flower object to pollinate and grow
    tryToPollinate(flower) {
      //This part checks if the objects overlap then grows the bee by our set amount
      let d = dist(this.x, this.y, flower.x, flower.y);
      if (d < this.size / 2 + flower.size / 2) {
        //Here we are calling two other functions to grow the bee and pollinate the flower
        this.grow();
        flower.pollinate();
      }
    }
  
    //This function allows the bee to grow to our set amount and constrains the growth to our max size
    grow() {
      this.size = this.size + this.growRate;
      this.size = constrain(this.size, 0, this.maxSize);
    }
  
    //This function moves our bee by changing it's position and velocity
    move() {
      //This section determines if our bee will change directions
      let r = random(0, 1);
      if (r < this.jitteriness) {
        this.vx = random(-this.speed, this.speed);
        this.vy = random(-this.speed, this.speed);
      }

      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
  
      //This part constrains the bee's movement to our window
      this.x = constrain(this.x, 0, width);
      this.y = constrain(this.y, 0, height);
    }
  
    //This function displays our bee objects
    display() {
      push();
      //Wings on either side
      fill(255, 255, 255);
      noStroke();
      ellipse(this.x - this.size / 2, this.y, this.size / 2);
      ellipse(this.x + this.size / 2, this.y, this.size / 2);
      pop();
  
      //Body
      push();
      fill(225, 225, 50);
      noStroke();
      ellipse(this.x, this.y, this.size);
      pop();
  
      //Eyes
      push();
      fill(0, 0, 0);
      noStroke();
      ellipse(this.x - this.size / 10, this.y, this.size / 10);
      ellipse(this.x + this.size / 10, this.y, this.size / 10);
      pop();
    }
}