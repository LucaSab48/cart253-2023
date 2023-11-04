//This class creates our flower objects in the garden
class Flower {

    //The constructor sets up a flower's properties
    constructor(x, y, size, stemLength, petalColor) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.maxSize = size; //This limits the size of our flowers
      this.stemLength = stemLength;
      this.stemThickness = 10;
      this.petalThickness = 10;
      this.maxPetalThickness = 10; //This limits the thickness of our petals
      this.stemColor = {
        r: 50,
        g: 150,
        b: 50
      };
      this.petalColor = petalColor;
      this.centreColor = {
        r: 50,
        g: 0,
        b: 0
      };
      this.alive = true;
    }
  

    //This function shrinks our flower and petals by a set value
    shrink() {
      let shrinkage = 1;
      this.petalThickness = this.petalThickness - shrinkage / 10;
      this.size = this.size - shrinkage;
  
      //This checks if there is any flower left, then kills it if there is none
      if (this.petalThickness <= 0 || this.size <= 0) {
        this.alive = false;
      }
    }
  
    //This function allows the flowers to grow by a set amount if it is called for when the bees overlap
    pollinate() {

      let growth = random(0, 0.5);
      this.petalThickness = this.petalThickness + growth / 10;
      this.size = this.size + growth;
  
      //This part constrains the growth of the flowers to our desired set amount
      this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
      this.size = constrain(this.size, 0, this.maxSize);
    }
  
    //This function displays our flower objects
    display() {
      push();
      strokeWeight(this.stemThickness);
      stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b); //Creating the stem color
      line(this.x, this.y, this.x, this.y + this.stemLength); //Displaying it
      strokeWeight(this.petalThickness);
      fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
      stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
      ellipse(this.x, this.y, this.size); //Creating the bulb of our flower
      pop();
    }
  }