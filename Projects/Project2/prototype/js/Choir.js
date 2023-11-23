class Choir {
    constructor(x, y, image1) {
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
    
    display() {
        stroke(0);
        image(this.bodyImage, this.x - 73, this.y, this.size + 40, this.size + 120);
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.headX, this.y, this.size / 2);
        fill(0);
        ellipse(this.headX - 12, this.y, this.size / 10 );
        fill(0);
        ellipse(this.headX + 12, this.y, this.size / 10);
        fill(0);
        ellipse(this.headX, this.y + 15, this.mouthSize);
    }

    return() {
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