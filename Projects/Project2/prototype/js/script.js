/**
 * Instrument Simulator Prototype
 * Luca Sabelli
 * 
 */

"use strict"

let state = "title";

let isDragging;

let clickTime = 0;

let selection = 0;

let choirRow1 = [];

let choirRow2 = [];

let choirRow3 = [];

let numChoirBoys1 = 20;

let numChoirBoys2 = 19;

let numChoirBoys3 = 18;

let mouthSize = 10;

let choirSound = undefined;

let pitch;

let theremin;

let wave = "sine";

let leftButton = {
    x: 0,
    y: 0,
    size: 50, 
    fill: 200,
}

let rightButton = {
    x: 0,
    y: 0,
    size: 50, 
    fill: 200,
}

let thereminBase = {
    x: 0, 
    y: 0, 
    width: 600, 
    height: 60,
    fill: 175
};

let thereminRod = {
    x: 0, 
    y: 0, 
    width: 20, 
    height: 550, 
    fill: 210
};

let sineButton = {
    x: 0, 
    y: 0,
    size: 50,  
    width: 50, 
    height: 50, 
    img: undefined
};

let triangleButton = {
    x: 0, 
    y: 0,
    size: 50, 
    width: 75, 
    height: 75, 
    img: undefined
};

let squareButton = {
    x: 0, 
    y: 0,
    size: 50, 
    width: 75, 
    height: 75, 
    img: undefined
};

let sawtoothButton = {
    x: 0, 
    y: 0,
    size: 50, 
    width: 75, 
    height: 75, 
    img: undefined
};

let drumSelect = {
    x: 0, 
    y: 0, 
    width: 200,
    height: 200
};

let choirSelect = {
    x: 0, 
    y: 0, 
    width: 200,
    height: 200
};

let drum1 = {
    x: 0, 
    y: 0,
    size: 300,
    fill: 100,
    sound: undefined,
    isOn: false,
};

let drum2 = {
    x: 0, 
    y: 0, 
    size: 200, 
    fill: 100, 
    sound: undefined,
    isOn: false,
};

let drum3 = {
    x: 0, 
    y: 0, 
    size: 250, 
    fill: 100, 
    sound: undefined,
    isOn: false,
};

let drum4 = {
    x: 0, 
    y: 0, 
    size: 180, 
    fill: 100, 
    sound: undefined,
    isOn: false,
};

let cymbal1 = {
    x: 0,
    y: 0,
    size: 200,
    fill: {
        r: 255,
        g: 215,
        b: 10,
    },
    sound: undefined,
    isOn: false,
};

let cymbal2 = {
    x: 0,
    y: 0,
    size: 250,
    fill: {
        r: 255,
        g: 215,
        b: 10,
    },
    sound: undefined,
    isOn: false,
};

let bass = {
    x: 0, 
    y: 0,
    width: 250,
    height: 300,
    fill: 100,
    sound: undefined,
    isOn: false,
};


//Here we are pre loading all the sounds that will be used 
function preload () {
    drum1.sound = loadSound("assets/sounds/drum1.1.mp3");
    drum1.sound.loop = false;
    cymbal1.sound = loadSound("assets/sounds/snare1.mp3");
    drum2.sound = loadSound("assets/sounds/drum2.mp3");
    drum3.sound = loadSound("assets/sounds/drum3.mp3");
    drum4.sound = loadSound("assets/sounds/drum4.mp3");
    cymbal2.sound = loadSound("assets/sounds/cymbal2.mp3");
    bass.sound = loadSound("assets/sounds/bass.mp3");
    choirSound = loadSound("assets/sounds/choir3.mp3")
    sineButton.img = loadImage("assets/images/sinewave1.png");
    triangleButton.img = loadImage("assets/images/triangleWave1.png");
    squareButton.img = loadImage("assets/images/squarewave1.png");
    sawtoothButton.img = loadImage("assets/images/sawtoothwave1.png");
}


//In the set up i am setting the initial location of all my objects and creating my array of choir boys
function setup() {
    createCanvas(1000, 700);
    
    leftButton.x = 50;
    leftButton.y = height - 50;
    rightButton.x = width - 50;
    rightButton.y = height - 50; 
    
    drumSelect.x = width/2 - 200;
    drumSelect.y = height/2;

    choirSelect.x = width/2 + 200;
    choirSelect.y = height/2;

    drum1.x = width/2 + 300;
    drum1.y = height/2 + 100;

    cymbal1.x = width - 250;
    cymbal1.y = height - 500;

    drum2.x = width/2 + 150;
    drum2.y = height/2 - 100;

    drum3.x = width/2 - 250;
    drum3.y = height/2 + 100;

    drum4.x = width/2 - 150;
    drum4.y = height/2 - 100;

    cymbal2.x = width/2 - 300;
    cymbal2.y = height - 500;

    bass.x = width/2;
    bass.y = height/2 - 100;

    let x1 = 25;
    let y1 = 100;
    let x2 = 50;
    let y2 = 200;

    userStartAudio();
    theremin = new p5.Oscillator(0, wave);
    thereminBase.x = width/2;
    thereminBase.y = height - 50;
    thereminRod.x = thereminBase.x + 290;
    thereminRod.y = thereminBase.y - 305;
    sineButton.x = thereminBase.x - 250;
    sineButton.y = thereminBase.y - 25;
    triangleButton.x = thereminBase.x - 125;
    triangleButton.y = thereminBase.y - 35;
    squareButton.x = thereminBase.x;
    squareButton.y = thereminBase.y - 35;
    sawtoothButton.x = thereminBase.x + 125;
    sawtoothButton.y = thereminBase.y - 35;


    for(let i = 0; i < numChoirBoys1; i++) {
        let choirBoy1 = new Choir(x1, y1);
        choirRow1.push(choirBoy1);;
        x1 += 50;
    }

    for(let j = 0; j < numChoirBoys2; j++) {
        let choirBoy2 = new Choir(x2, y2);
        choirRow2.push(choirBoy2);;
        x2 += 50;
    }

}



//In the draw function, I am switching the states of the simulation. 
function draw() {
    print(state);
    if (state === "title") {
        title();
    }
    else if (state === "simulation") {
        simulation();
    }
    else if (state === "drum kit") {
        drumKit();
    }
    else if (state === "theremin") {
        thereminPick();
    }
    else if (state === "choir") {
        choirPick();
    }
}


//In here we have all the overlap checking 
function mousePressed() {
    let d1 = dist(mouseX, mouseY, drum1.x, drum1.y);
    let d2 = dist(mouseX, mouseY, cymbal1.x, cymbal1.y);
    let d3 = dist(mouseX, mouseY, drum2.x, drum2.y);
    let d4 = dist(mouseX, mouseY, drum3.x, drum3.y);
    let d5 = dist(mouseX, mouseY, drum4.x, drum4.y);
    let d6 = dist(mouseX, mouseY, cymbal2.x, cymbal2.y);
    let d7 = dist(mouseX, mouseY, bass.x, bass.y);
    let d8 = dist(mouseX, mouseY, drumSelect.x, drumSelect.y);
    let d9 = dist(mouseX, mouseY, choirSelect.x, choirSelect.y);
    let d10 = dist(mouseX, mouseY, sineButton.x + 25, sineButton.y + 25);
    let d11 = dist(mouseX, mouseY, triangleButton.x + 38, triangleButton.y + 35);
    let d12 = dist(mouseX, mouseY, squareButton.x + 38, squareButton.y + 35);
    let d13 = dist(mouseX, mouseY, sawtoothButton.x + 38, sawtoothButton.y + 35);
    let d14 = dist(mouseX, mouseY, leftButton.x, leftButton.y);
    let d15 = dist(mouseX, mouseY, rightButton.x, rightButton.y);


    if(state === "theremin") {
        theremin.start();
    }

    if(state === "choir") {
        isDragging = true;
        if(!choirSound.isPlaying() && state === "choir") {
            choirSound.loop();
        }
    }

    if(d1 < drum1.size / 2 && state === "drum kit") {
        if(!drum1.isOn){
            drum1.sound.play();
            drum1.isOn = true;
        }
    }

    if(d2 < cymbal1.size / 2 && state === "drum kit") {
        if(!cymbal1.isOn) {
            cymbal1.sound.play();
            cymbal1.isOn = true;
        }

    }

    if(d3 < drum2.size / 2 && state === "drum kit" && d2 > cymbal1.size / 2) {
        if(!drum2.isOn) {
            drum2.sound.play();
            drum2.isOn = true;
        }
    }

    if(d4 < drum3.size / 2 && state === "drum kit") {
        if(!drum3.isOn) {
            drum3.sound.play();
            drum3.isOn = true;
        }
    }
    
    if(d5 < drum4.size / 2 && state === "drum kit" && d6 > cymbal2.size / 2) {
        if(!drum4.isOn) {
            drum4.sound.play();
            drum4.isOn = true;
        }
    }

    if(d6 < cymbal2.size / 2 && state === "drum kit") {
        if(!cymbal2.isOn) {
            cymbal2.sound.play();
            cymbal2.isOn = true;
        }
    }
 
    if((d7 < bass.width / 2 || d7 < bass.height / 2) && state === "drum kit" && d3 > drum2.size / 2 && d5 > drum4.size / 2) {
        if(!bass.isOn) {
            bass.sound.play();
            bass.isOn = true;
        }
    }

    if((d8 < drumSelect.height / 2 || d8 < drumSelect / 2) && state === "simulation") {
        state = "drum kit";
    }

    if((d9 < choirSelect.height / 2 || d9 < choirSelect.width / 2) && state === "simulation") {
        state = "choir";
    }

    if(d10 < sineButton.size / 2 && state === "theremin") {
        theremin.setType('sine');
        wave = "sine";
    }
    
    if(d11 < triangleButton.size / 2 && state === "theremin") {
        theremin.setType("triangle");
        wave = "triangle";
    }
    
    if(d12 < squareButton.size / 2 && state === "theremin") {
        theremin.setType('square');
        wave = "square";
    }
    
    if(d13 < sawtoothButton.size / 2 && state === "theremin") {
        theremin.setType('sawtooth');
        wave = "sawtooth";
    }

    // if(d14 < leftButton.size / 2 && state === "drum kit") {
    //     state = "choir";
    // }

    // if(d14 < leftButton.size / 2 && state === "theremin") {
    //     state = "drum kit";
    // }

    // if(d14 < leftButton.size / 2 && state === "choir") {
    //     state = "theremin";
    // }

    // if(d15 < rightButton.size / 2 && state === "drum kit") {
    //     state = "theremin";
    // }

    // if(d15 < rightButton.size / 2 && state === "theremin") {
    //     state = "choir";
    // }
    
    // if(d15 < rightButton.size / 2 && state === "choir") {
    //     state = "drum kit";
    // }
}


function mouseReleased() {
    let d1 = dist(mouseX, mouseY, drum1.x, drum1.y);
    let d2 = dist(mouseX, mouseY, cymbal1.x, cymbal1.y);
    let d3 = dist(mouseX, mouseY, drum2.x, drum2.y);
    let d4 = dist(mouseX, mouseY, drum3.x, drum3.y);
    let d5 = dist(mouseX, mouseY, drum4.x, drum4.y);
    let d6 = dist(mouseX, mouseY, cymbal2.x, cymbal2.y);
    let d7 = dist(mouseX, mouseY, bass.x, bass.y);
    if(d1 < drum1.size / 2 && state === "drum kit") {
        if(drum1.isOn){
            drum1.isOn = false;
        }
    }

    if(d2 < cymbal1.size / 2 && state === "drum kit") {
        if(cymbal1.isOn){
            cymbal1.isOn = false;
        }
    }

    if(d3 < drum2.size / 2 && state === "drum kit" && d2 > cymbal1.size / 2) {
        if(drum2.isOn){
            drum2.isOn = false;
        }
    }

    if(d4 < drum3.size / 2 && state === "drum kit") {
        if(drum3.isOn){
            drum3.isOn = false;
        }
    }

    if(d5 < drum4.size / 2 && state === "drum kit" && d6 > cymbal2.size / 2) {
        if(drum4.isOn){
            drum4.isOn = false;
        }
    }

    if(d6 < cymbal2.size / 2 && state === "drum kit") {
        if(cymbal2.isOn){
            cymbal2.isOn = false;
        }
    }

    if((d7 < bass.width / 2 || d7 < bass.height / 2) && state === "drum kit" && state === "drum kit" && d3 > drum2.size / 2 && d5 > drum4.size / 2) {
        if(bass.isOn) {
            bass.isOn = false;
        }
    }

    isDragging = false;

    if(state === "theremin") {
        theremin.stop();
    }

    if(state === "choir") {
        choirSound.stop();
    }
}


//Displays box to choose drum kit 
function displayDrumSelection() {
    noStroke();
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(drumSelect.x, drumSelect.y, drumSelect.width, drumSelect.height);
}


//Displays box to choose choir
function displayChoirSelection() {
    noStroke();
    rectMode(CENTER);
    fill(0, 255, 0);
    rect(choirSelect.x, choirSelect.y, choirSelect.width, choirSelect.height);
}


//Displays drums in drum kit
function displayDrum1() {
    noStroke();
    fill(drum1.fill);
    ellipseMode(CENTER);
    ellipse(drum1.x, drum1.y, drum1.size);
    fill(200)
    ellipse(drum1.x, drum1.y, drum1.size - 20);
}


function displayDrum2() {
    noStroke();
    fill(drum2.fill);
    ellipseMode(CENTER);
    ellipse(drum2.x, drum2.y, drum2.size);
    fill(200)
    ellipse(drum2.x, drum2.y, drum2.size - 20);
}


function displayDrum3() {
    noStroke();
    fill(drum3.fill);
    ellipseMode(CENTER);
    ellipse(drum3.x, drum3.y, drum3.size);
    fill(200)
    ellipse(drum3.x, drum3.y, drum3.size - 20);
}


function displayDrum4() {
    noStroke();
    fill(drum4.fill);
    ellipseMode(CENTER);
    ellipse(drum4.x, drum4.y, drum4.size);
    fill(200)
    ellipse(drum4.x, drum4.y, drum4.size - 20);
}


//Displays cymbal in drum kit
function displayCymbal1() {
    noStroke();
    fill(cymbal1.fill.r, cymbal1.fill.g, cymbal1.fill.b);
    ellipse(cymbal1.x, cymbal1.y, cymbal1.size);
    fill(0)
    ellipse(cymbal1.x, cymbal1.y, cymbal1.size / 20);
}


function displayCymbal2() {
    noStroke();
    fill(cymbal2.fill.r, cymbal2.fill.g, cymbal2.fill.b);
    ellipse(cymbal2.x, cymbal2.y, cymbal2.size);
    fill(0)
    ellipse(cymbal2.x, cymbal2.y, cymbal2.size / 20);
}


//Displays bass in drum kit
function displayBass() {
    noStroke();
    fill(bass.fill);
    rectMode(CENTER);
    rect(bass.x, bass.y, bass.width, bass.height);
    fill(255, 0, 0);
    rect(bass.x, bass.y, bass.width, bass.height - 20);
}


function displayTheremin() {
    //Theremin Base
    push();
    noStroke();
    rectMode(CENTER);
    fill(thereminBase.fill);
    rect(thereminBase.x, thereminBase.y, thereminBase.width, thereminBase.height);
    pop();
  
    //Theremin Rod
    push();
    noStroke();
    rectMode(CENTER);
    fill(thereminRod.fill);
    rect(thereminRod.x, thereminRod.y, thereminRod.width, thereminRod.height);
  
    //All the buttons 
    fill(255);
    ellipse(sineButton.x + 25, sineButton.y + 25, sineButton.size);
    ellipse(triangleButton.x + 38, triangleButton.y + 35, triangleButton.size);
    ellipse(squareButton.x + 38, squareButton.y + 35, squareButton.size);
    ellipse(sawtoothButton.x + 38, sawtoothButton.y + 35, sawtoothButton.size);
  
    //All the images on the buttons
    image(sineButton.img, sineButton.x, sineButton.y, sineButton.width, sineButton.height);
    image(triangleButton.img, triangleButton.x, triangleButton.y, triangleButton.width, triangleButton.height);
    image(squareButton.img, squareButton.x, squareButton.y, squareButton.width, squareButton.height);
    image(sawtoothButton.img, sawtoothButton.x, sawtoothButton.y, sawtoothButton.width, sawtoothButton.height);
}


//This function is where the player can select the instrument
//It calls all necessary functions
function simulation() {
    background(255);
    displayChoirSelection();
    displayDrumSelection();
}


//This function displays the initial message at the start of our simulation when the program's state is title 
function title() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("Instrument Simulator", width/2, height/2);
}


//This function starts when the state of our game is drum kit and calls all the necessary functions for it
function drumKit() {
    background(0);
    displayButtons();
    displayBass();
    displayDrum4();
    displayDrum3();
    displayDrum2();
    displayDrum1();
    displayCymbal1();
    displayCymbal2();
}

//Function that activates when state switches to choir
function choirPick() {
    background(0);
    displayButtons();

    pitch = map(mouseY, 0, height, 1.5, 0.5);
    choirSound.rate(pitch);

    for(let j = 0; j < choirRow1.length; j++) {
        let choirBoy1 = choirRow1[j];
        choirBoy1.display();
    }

    for(let i = 0; i < choirRow2.length; i++) {
        let choirBoy2 = choirRow2[i];
        choirBoy2.display();
    }

    if(isDragging === true) {
        for(let j = 0; j < choirRow1.length; j++) {
            let choirBoy1 = choirRow1[j];
            choirBoy1.mouthMove();
            choirBoy1.bodyShake();
            choirBoy1.redFace();
        }

        for(let i = 0; i < choirRow2.length; i++) {
            let choirBoy2 = choirRow2[i];
            choirBoy2.mouthMove();
            choirBoy2.bodyShake();
            choirBoy2.redFace();
        }
    }

    if(isDragging === false) {
        for(let j = 0; j < choirRow1.length; j++) {
            let choirBoy1 = choirRow1[j];
            choirBoy1.return();
        }
    
        for(let i = 0; i < choirRow2.length; i++) {
            let choirBoy2 = choirRow2[i];
            choirBoy2.return();
        }
    }
}

//This function allows our program to know when any key is pressed.
//It is currently only switching the state of the choir to the drum kit when the space bar is pressed
//This is because i cant figure out currently how to play an audio file once without stopping the loop
function keyPressed() {
    if(state === "title") {
        state = "simulation";
    }
    else if(keyCode === 67 && state === "simulation") {
        state = "choir";
    }
    else if(keyCode === RIGHT_ARROW && state === "simulation") {
        state = "drum kit";
    }
    else if(keyCode === RIGHT_ARROW && state === "drum kit") {
        state = "theremin";
    }
    else if(keyCode === RIGHT_ARROW && state === "theremin") {
        state = "choir";
    }
    else if(keyCode === RIGHT_ARROW && state === "choir") {
        state = "drum kit";
    }
    else if(keyCode === LEFT_ARROW && state === "simulation") {
        state = "choir";
    }
    else if(keyCode === LEFT_ARROW && state === "drum kit") {
        state = "choir";
    }
    else if(keyCode === LEFT_ARROW && state === "theremin") {
        state = "drum kit";
    }
    else if(keyCode === LEFT_ARROW && state === "choir") {
        state = "theremin";
    }
}


function thereminPick() {
    background(0);
    displayButtons();
    displayTheremin();
    displayValues();
    if(mouseY > 0 || mouseY < 700) {
        let newFreq = map(mouseY, height, 0, 0, 900);
        theremin.freq(newFreq);
    }

    let newAmp = map(mouseX, 0, width, 0, 0.6);
    theremin.amp(newAmp);
}


function displayValues() {
    let amp = theremin.getAmp();
    let frequency = theremin.getFreq();
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Amp: " + amp, width / 2, 100);
    text("Frequency: " + frequency, width / 2, 125);
    text("Wave Type: " + wave, width / 2, 150);
}


function displayButtons() {
    noStroke();
    fill(leftButton.fill);
    ellipse(leftButton.x, leftButton.y, leftButton.size);
    fill(rightButton.fill);
    ellipse(rightButton.x, rightButton.y, rightButton.size);
}


