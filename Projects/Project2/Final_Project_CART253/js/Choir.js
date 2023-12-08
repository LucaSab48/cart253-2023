//Sets the choir object for our program
class Choir {
    //Constructs our object with specific properties
    constructor(x, y, image1, image2, image3, image4) {
        this.x = x;
        this.y = y;
        this.size = 100;
        this.headX = x; //This is to add shake to the choir boys and maintain the x position for hair and mouth and eyes
        this.mouthSize = 10; //This is to change the mouth size when dragging mouse
        this.fill = {
            r: 255,
            g: 198,
            b: 153,
        };
        this.bodyImage = image1; //Robe for choir boys 
        this.hairImage = image2; //Hair for choir boys 
        this.closedEyesImage = image3; //Closed eyes for choir boys 
        this.openEyesImage = image4; //Open eyes for choir boys
        this.isClosed = false; //Checks if eyes are closed
        this.minShake = 0; //smallest amount of shake
        this.maxShake = 0.5; //Max amount of shake 
        this.faceReturn = random(0.1, 0.5); //Changes the speed the face returns to normal color 
    }

    //Function that changes the size of the mouth depending on mouseY with map 
    mouthMove() {
        let size = map(mouseY, 0, height, 25, 5);
        this.mouthSize = size;
    }

    //Function that adds head movement and constrains the movement 
    bodyShake() {
        let shake = map(mouseY, 0, 550, this.maxShake, this.minShake);
        this.headX += random(-shake, shake);
        this.headX = constrain(this.headX, this.x - 2, this.x + 2);
    }

    //Function that makes faces more red depending on mouseY 
    redFace() {
        let redness1 = map(mouseY, 0, 350, 120, 198);
        let redness2 = map(mouseY, 0, 350, 110, 153);
        if(mouseY < 350){
            this.fill.g = redness1;
            this.fill.b = redness2;
        }
    }

    //Closes the eyes by changing the image on the choir faces
    closeEyes() {
        this.isClosed = true;
        imageMode(CENTER);
        image(this.closedEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        image(this.closedEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
    }
    
    //Function that displays choir boys 
    display() {
        stroke(0);
        imageMode(CORNER);
        image(this.bodyImage, this.x - 73, this.y, this.size + 40, this.size + 120); //displays robe
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.headX, this.y, this.size / 2); //Head of choir boys 
        
        //Open eyes when isClosed is false
        if(!this.isClosed) {
            imageMode(CENTER);
            image(this.openEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
            image(this.openEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        }
        //Closes eyes when isClosed is true
        else if(this.isClosed) {
            imageMode(CENTER);
            image(this.closedEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
            image(this.closedEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        }
        fill(0);
        ellipse(this.headX, this.y + 15, this.mouthSize); //Displays mouth and changes size depending on function above
        imageMode(CENTER);
        image(this.hairImage, this.headX - 5, this.y - 6, this.size - 25, this.size - 45); //Displays hair for choir boys 
    }

    //Function that returns choir boys to normal after user lets go of space bar
    return() {
        this.isClosed = false;
        imageMode(CENTER);
        image(this.openEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2); //Returns eyes to open position
        image(this.openEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        this.headX = this.x; //Returns head to original position
        
        //Returns mouth size slowly if bigger than predetermined size 
        if(this.mouthSize > 10) {
            this.mouthSize += -0.1;
        }

        //Returns mouth size slowly if smaller than predetermined size
        if(this.mouthSize < 10) {
            this.mouthSize += 0.1;
        }

        //Returns the face to original color slowly depending on random number from faceReturn to look more natural 
        if(this.fill.g < 198) {
            this.fill.g += this.faceReturn; //For g value 
        }

        if(this.fill.b < 153) {
            this.fill.b += this.faceReturn; //For b value
        }
    }
}