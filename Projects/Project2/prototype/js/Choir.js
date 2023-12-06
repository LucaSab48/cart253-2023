class Choir {
    constructor(x, y, image1, image2, image3, image4) {
        this.x = x;
        this.y = y;
        this.size = 100;
        this.headX = x;
        this.mouthSize = 10;
        this.fill = {
            r: 255,
            g: 198,
            b: 153,
        };
        this.bodyImage = image1;
        this.hairImage = image2;
        this.closedEyesImage = image3;
        this.openEyesImage = image4;
        this.isClosed = false;
        this.minShake = 0;
        this.maxShake = 0.5; 
        this.faceReturn = random(0.1, 0.5);
    }

    mouthMove() {
        let size = map(mouseY, 0, height, 25, 5);
        this.mouthSize = size;
    }

    bodyShake() {
        let shake = map(mouseY, 0, 550, this.maxShake, this.minShake);
        this.headX += random(-shake, shake);
        this.headX = constrain(this.headX, this.x - 2, this.x + 2);
    }

    redFace() {
        let redness1 = map(mouseY, 0, 350, 120, 198);
        let redness2 = map(mouseY, 0, 350, 110, 153);
        if(mouseY < 350){
            this.fill.g = redness1;
            this.fill.b = redness2;
        }
    }

    closeEyes() {
        this.isClosed = true;
        imageMode(CENTER);
        image(this.closedEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        image(this.closedEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
    }
    
    display() {
        stroke(0);
        imageMode(CORNER);
        image(this.bodyImage, this.x - 73, this.y, this.size + 40, this.size + 120);
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.headX, this.y, this.size / 2);
        if(!this.isClosed) {
            imageMode(CENTER);
            image(this.openEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
            image(this.openEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        }
        else if(this.isClosed) {
            imageMode(CENTER);
            image(this.closedEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
            image(this.closedEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        }
        fill(0);
        ellipse(this.headX, this.y + 15, this.mouthSize);
        imageMode(CENTER);
        image(this.hairImage, this.headX - 5, this.y - 6, this.size - 25, this.size - 45);
    }

    return() {
        this.isClosed = false;
        imageMode(CENTER);
        image(this.openEyesImage, this.headX - 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        image(this.openEyesImage, this.headX + 10, this.y, (this.size / 10) + 3, (this.size / 10) - 2);
        this.headX = this.x;
        if(this.mouthSize > 10) {
            this.mouthSize += -0.1;
        }

        if(this.mouthSize < 10) {
            this.mouthSize += 0.1;
        }

        if(this.fill.g < 198) {
            this.fill.g += this.faceReturn;
        }

        if(this.fill.b < 153) {
            this.fill.b += this.faceReturn;
        }
    }
}