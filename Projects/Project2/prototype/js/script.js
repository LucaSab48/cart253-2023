/**
 * Instrument Simulator Prototype
 * Luca Sabelli
 * 
 */

"use strict"

let state = "title";

let isDragging;

let dKit;

let drumSong = undefined;

let drumSongPlayed = false;

let drumSongPaused = false;

let songOn = false;

let angle1 = 50;

let clickTime = 0;

let selection = 0;

let pan;

let choirRow1 = [];

let choirRow2 = [];

let choirRow3 = [];

let numChoirBoys1 = 20;

let numChoirBoys2 = 19;

let numChoirBoys3 = 18;

let mouthSize = 10;

let choirV1 = undefined;

let choirV2 = undefined;

let choirSound = undefined;

let choirBG = undefined;

let choirRobe = undefined;

let choirClosedEyes = undefined;

let choirOpenEyes = undefined;

let choirHair = [];

let choirHairPick;

let pitch;

let path;

let theremin;

let thereminOn = false;

let amplitude;

let lineY;

let wave = "sine";

let gameCount = 0;

let gameOn = false;

let gameWinSFX = undefined;

let gameSFX = undefined;

let noLoop = false;

let choirV1Button = {
    x: 0,
    y: 0,
    size: 50, 
    fill: 200,
};

let choirV2Button = {
    x: 0,
    y: 0,
    size: 50, 
    fill: 200,
};

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

let thereminCircle = {
    x: 0, 
    y: 0, 
    size: 50, 
    fill: {
        r: 255, 
        g: 0, 
        b: 0, 
    minSize: 5,
    sizeRed: 5
    }
};

let thereminHand = {
    x: 0,
    y: 0, 
    width: 120,
    height: 80,
    img: undefined
};

let drumSelect = {
    x: 0, 
    y: 0, 
    width: 200,
    height: 200
};

let thereminSelect = {
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

let drumSongSelect = {
    x: 0, 
    y: 0,
    width: 60,
    height: 60,
    sound: [],
    img: undefined
};

let drumPlayButton = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    fill: 200,
    img: undefined
};

let drumStick = {
    x: 0,
    y: 0, 
    width: 100, 
    height: 100, 
    img: undefined
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

let kick = {
    x: 0,
    y1: 0, 
    y: 0, 
    vy: 1, 
    width: 50,
    height: 120
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
    drumSongSelect.sound[0] = loadSound("assets/sounds/jazz1.mp3");
    drumSongSelect.sound[1] = loadSound("assets/sounds/funk1.mp3");
    drumSongSelect.sound[2] = loadSound("assets/sounds/rock1.mp3");
    drumSongSelect.sound[3] = loadSound("assets/sounds/prog1.mp3");
    drumSongSelect.sound[4] = loadSound("assets/sounds/bossanova1.mp3");
    choirV1 = loadSound("assets/sounds/choir3.mp3");
    choirV2 = loadSound("assets/sounds/choir.v2.mp3");
    gameSFX = loadSound("assets/sounds/game1.mp3");
    gameWinSFX = loadSound("assets/sounds/gameWin1.mp3");
    choirHair[0]= loadImage("assets/images/hair1.png");
    choirHair[1] = loadImage("assets/images/hair2.png");
    choirHair[2] = loadImage("assets/images/hair3.png");
    choirHair[3] = loadImage("assets/images/hair4.png");
    sineButton.img = loadImage("assets/images/sinewave1.png");
    triangleButton.img = loadImage("assets/images/triangleWave1.png");
    squareButton.img = loadImage("assets/images/squarewave1.png");
    sawtoothButton.img = loadImage("assets/images/sawtoothwave1.png");
    drumStick.img = loadImage("assets/images/images/drumstick1.webp");
    drumSongSelect.img = loadImage("assets/images/playButton1.png");
    drumPlayButton.img = loadImage("assets/images/stopButton1.png");
    thereminHand.img = loadImage("assets/images/hand2.png");
    choirBG = loadImage("assets/images/choirBG.jpg");
    choirRobe = loadImage("assets/images/robe2.png");
    choirClosedEyes = loadImage("assets/images/choir_closedeyes.png");
    choirOpenEyes = loadImage("assets/images/choir_openEyes.png");
}


//In the set up i am setting the initial location of all my objects and creating my array of choir boys
function setup() {
    createCanvas(1000, 700);
    
    choirV1Button.x = 50;
    choirV1Button.y = height - 50;
    choirV2Button.x = width - 50;
    choirV2Button.y = height - 50;
     
    
    drumSelect.x = 150;
    drumSelect.y = height/2;

    thereminSelect.x = 500;
    thereminSelect.y = height / 2;

    choirSelect.x = 850;
    choirSelect.y = height/2;

    choirSound = choirV1;

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

    kick.x = width/2;
    kick.y = height/2 + 120;
    kick.y1 = kick.y;

    drumSongSelect.x = 400;
    drumSongSelect.y = 630;
    drumPlayButton.x = 600;
    drumPlayButton.y = 630;

    let x1 = 25;
    let y1 = 150;
    let x2 = 50;
    let y2 = 250;
    let x3 = 75;
    let y3 = 350;

    thereminCircle.x = random(200, 800);
    thereminCircle.y = random(100, 600);


    userStartAudio();
    theremin = new p5.Oscillator(0, wave);
    amplitude = new p5.Amplitude();
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
        choirHairPick = random(choirHair);
        let choirBoy1 = new Choir(x1, y1, choirRobe, choirHairPick, choirClosedEyes, choirOpenEyes);
        choirRow1.push(choirBoy1);
        x1 += 50;
    }

    for(let j = 0; j < numChoirBoys2; j++) {
        choirHairPick = random(choirHair);
        let choirBoy2 = new Choir(x2, y2, choirRobe, choirHairPick, choirClosedEyes, choirOpenEyes);
        choirRow2.push(choirBoy2);
        x2 += 50;
    }

    for(let z = 0; z < numChoirBoys3; z++) {
        choirHairPick = random(choirHair);
        let choirBoy3 = new Choir(x3, y3, choirRobe, choirHairPick, choirClosedEyes, choirOpenEyes);
        choirRow3.push(choirBoy3);
        x3 += 50;
    }

    drumSong = random(drumSongSelect.song);
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
    let d14 = dist(mouseX, mouseY, thereminSelect.x, thereminSelect.y);
    let d15 = dist(mouseX, mouseY, choirV1Button.x, choirV1Button.y);
    let d16 = dist(mouseX, mouseY, choirV2Button.x, choirV2Button.y);
    let d17 = dist(mouseX, mouseY, drumPlayButton.x, drumPlayButton.y);
    let d18 = dist(mouseX, mouseY, drumSongSelect.x, drumSongSelect.y);


    if(state === "theremin") {
        theremin.start();
        thereminOn = true;
    }

    if(d1 < drum1.size / 2 && state === "drum kit") {
        if(!drum1.isOn){
            drum1.sound.play();
            drum1.isOn = true;
            drum1.size = drum1.size - 10;
            dKit = "drum1";
            angle1 = 110;
        }
    }

    if(d2 < cymbal1.size / 2 && state === "drum kit") {
        if(!cymbal1.isOn) {
            cymbal1.sound.play();
            cymbal1.isOn = true;
            dKit = "cymbal1";
            cymbal1.size += -10;
            angle1 = 110;
        }

    }

    if(d3 < drum2.size / 2 && state === "drum kit" && d2 > cymbal1.size / 2) {
        if(!drum2.isOn) {
            drum2.sound.play();
            drum2.isOn = true;
            drum2.size += -10;
            dKit = "drum2";
            angle1 = 110;
        }
    }

    if(d4 < drum3.size / 2 && state === "drum kit") {
        if(!drum3.isOn) {
            drum3.sound.play();
            drum3.isOn = true;
            drum3.size += -10;
            dKit = "drum3";
            angle1 = 110;
        }
    }
    
    if(d5 < drum4.size / 2 && state === "drum kit" && d6 > cymbal2.size / 2) {
        if(!drum4.isOn) {
            drum4.sound.play();
            drum4.isOn = true;
            drum4.size += -10;
            dKit = "drum4";
            angle1 = 110;
        }
    }

    if(d6 < cymbal2.size / 2 && state === "drum kit") {
        if(!cymbal2.isOn) {
            cymbal2.sound.play();
            cymbal2.isOn = true;
            dKit = "cymbal2";
            cymbal2.size += -10;
            angle1 = 110;
        }
    }
 
    if((d7 < bass.width / 2 || d7 < bass.height / 2) && state === "drum kit" && d3 > drum2.size / 2 && d5 > drum4.size / 2) {
        if(!bass.isOn) {
            bass.sound.play();
            bass.isOn = true;
            dKit = "bass";
            kick.y1 += -70;  
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

    if((d14 < thereminSelect.width / 2 || d14 < thereminSelect.height / 2) && state === "simulation") {
        state = "theremin";
    }

    if(d15 < choirV1Button.size / 2 && state === "choir") {
        choirSound = choirV1;
    }

    if(d16 < choirV2Button.size / 2 && state === "choir") {
        choirSound = choirV2;
    }

    
    if((d18 < drumSongSelect.width / 2 || d18 < drumSongSelect.height / 2) && state === "drum kit") {    
        drumSongPlayed = true;
    }
    
    if((d17 < drumPlayButton.width / 2 || d17 < drumPlayButton.height / 2) && state === "drum kit") {
        drumSongPaused = true;
        songOn = false;
    } 

}


function mouseReleased() {
    if(dKit === "drum1") {
        if(drum1.isOn){
            drum1.isOn = false;
            drum1.size = drum1.size + 10;
            angle1 = 50;
        }
    }

    if(dKit === "cymbal1") {
        if(cymbal1.isOn){
            cymbal1.isOn = false;
            cymbal1.size += 10;
            angle1 = 50;
        }
    }

    if(dKit === "drum2") {
        if(drum2.isOn){
            drum2.isOn = false;
            drum2.size += 10;
            angle1 = 50;
        }
    }

    if(dKit === "drum3") {
        if(drum3.isOn){
            drum3.isOn = false;
            drum3.size += 10;
            angle1 = 50;
        }
    }

    if(dKit === "drum4") {
        if(drum4.isOn){
            drum4.isOn = false;
            drum4.size += 10;
            angle1 = 50;
        }
    }

    if(dKit === "cymbal2") {
        if(cymbal2.isOn){
            cymbal2.isOn = false;
            cymbal2.size += 10;
            angle1 = 50;
        }
    }

    if(dKit === "bass") {
        if(bass.isOn) {
            bass.isOn = false;
            kick.y1 += 70
        }
    }

    if(state === "theremin") {
        theremin.stop();
        thereminOn = false;
    }
}


//This function allows our program to know when any key is pressed.
//It is currently only switching the state of the choir to the drum kit when the space bar is pressed
//This is because i cant figure out currently how to play an audio file once without stopping the loop
function keyPressed() {
    if(state === "title") {
        state = "simulation";
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
    else if(keyCode === 32 && state === "choir") {
        isDragging = true;
        if(!choirSound.isPlaying() && state === "choir") {
                choirSound.loop();
        }
        
    }
    else if(keyCode === 13 && state === "theremin") {
        gameOn = true;
        gameCount = 0;
    }
}


function keyReleased() {
    if(keyCode === 32 && state === "choir") {
        isDragging = false;
        choirSound.stop();
    }
}


//Displays box to choose drum kit 
function displayDrumSelection() {
    noStroke();
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(drumSelect.x, drumSelect.y, drumSelect.width, drumSelect.height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Drums", drumSelect.x, drumSelect.y);

}


function displayThereminSelect() {
    noStroke();
    rectMode(CENTER);
    fill(0, 255, 0);
    rect(thereminSelect.x, thereminSelect.y, thereminSelect.width, thereminSelect.height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Theremin", thereminSelect.x, thereminSelect.y);
}


//Displays box to choose choir
function displayChoirSelection() {
    noStroke();
    rectMode(CENTER);
    fill(0, 0, 255);
    rect(choirSelect.x, choirSelect.y, choirSelect.width, choirSelect.height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Choir", choirSelect.x, choirSelect.y);
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


function displayBassKick() {
    noStroke();
    fill(100);
    rectMode(CENTER);
    rect(kick.x, kick.y, kick.width, kick.height);
    fill(255);
    rect(kick.x, kick.y1 + 20, kick.width - 20, kick.height - 90);
}


function displaySongSelect() {
    noStroke();
    imageMode(CENTER);
    image(drumSongSelect.img, drumSongSelect.x, drumSongSelect.y, drumSongSelect.width, drumSongSelect.height);
}


function displayDrumPlayButton() {
    noStroke();
    imageMode(CENTER);
    image(drumPlayButton.img, drumPlayButton.x, drumPlayButton.y, drumPlayButton.width, drumPlayButton.height);
}


function displayDrumStick() {
    noCursor();
    drumStick.x = mouseX;
    drumStick.y = mouseY;
    angleMode(DEGREES);
    noStroke();
    translate(drumStick.x, drumStick.y);
    rotate(angle1);
    fill(200, 87, 51);
    ellipse(0, 80, drumStick.width - 90, drumStick.height + 80);
    ellipse(0, -15, drumStick.width - 88);
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
    imageMode(CORNER);
    image(sineButton.img, sineButton.x, sineButton.y, sineButton.width, sineButton.height);
    image(triangleButton.img, triangleButton.x, triangleButton.y, triangleButton.width, triangleButton.height);
    image(squareButton.img, squareButton.x, squareButton.y, squareButton.width, squareButton.height);
    image(sawtoothButton.img, sawtoothButton.x, sawtoothButton.y, sawtoothButton.width, sawtoothButton.height);
}


//This function is where the player can select the instrument
//It calls all necessary functions
function simulation() {
    background(255);
    displayThereminSelect();
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
    displayBass();
    displayDrum4();
    displayDrum3();
    displayDrum2();
    displayDrum1();
    displayCymbal1();
    displayCymbal2();
    displayBassKick();
    displayDrumPlayButton();
    displaySongSelect();
    displayDrumStick();
    
    if(drumSongPlayed && state === "drum kit") { 
        if(!songOn) {
            drumSong = random(drumSongSelect.sound);
            drumSong.play();
            songOn = true;
        }
        drumSongPlayed = false;
    }

    if(drumSongPaused && state ==="drum kit") {
        drumSong.stop();
        songOn = false;
        drumSongPaused = false; 
    }

}

//Function that activates when state switches to choir
function choirPick() {
    background(0);
    displayChoirBG();   
    displayChoirSound();
    cursor();

    pitch = map(mouseY, 0, height, 2, 0.5);
    choirSound.rate(pitch);

    path = map(mouseX, 0, width, -1.0, 1.0);
    choirSound.pan(path);

    if(songOn) {
        drumSong.stop();
    }

    for(let j = 0; j < choirRow1.length; j++) {
        let choirBoy1 = choirRow1[j];
        choirBoy1.display();
    }

    for(let i = 0; i < choirRow2.length; i++) {
        let choirBoy2 = choirRow2[i];
        choirBoy2.display();
    }

    for(let z = 0; z < choirRow3.length; z++) {
        let choirBoy3 = choirRow3[z];
        choirBoy3.display();
    }

    if(isDragging === true) {
        for(let j = 0; j < choirRow1.length; j++) {
            let choirBoy1 = choirRow1[j];
            choirBoy1.mouthMove();
            choirBoy1.bodyShake();
            choirBoy1.redFace();
            choirBoy1.closeEyes();
        }

        for(let i = 0; i < choirRow2.length; i++) {
            let choirBoy2 = choirRow2[i];
            choirBoy2.mouthMove();
            choirBoy2.bodyShake();
            choirBoy2.redFace();
            choirBoy2.closeEyes();
        }

        for(let z = 0; z < choirRow3.length; z++) {
            let choirBoy3 = choirRow3[z];
            choirBoy3.mouthMove();
            choirBoy3.bodyShake();
            choirBoy3.redFace();
            choirBoy3.closeEyes();
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

        for(let z = 0; z < choirRow3.length; z++) {
            let choirBoy3 = choirRow3[z];
            choirBoy3.return();
        }
    }
}


function displayChoirSound() {
    noStroke();
    fill(choirV1Button.fill);
    ellipse(choirV1Button.x, choirV1Button.y, choirV1Button.size);
    fill(choirV2Button.fill);
    ellipse(choirV2Button.x, choirV2Button.y, choirV2Button.size);

}


function displayChoirBG() {
    imageMode(CENTER);
    image(choirBG, 500, 350, 1000, 700);
}


function thereminPick() {
    background(0);
    cursor();
    displayLine();
    displayTheremin();
    displayValues();
    displayHandTheremin();
    
    if(songOn) {
        drumSong.stop();
    }

    if(mouseY > 0 || mouseY < 700) {
        let newFreq = map(mouseY, height, 0, 0, 900);
        theremin.freq(newFreq);
    }

    if(mouseX > 0 || mouseX < 1000) {
        let newAmp = map(mouseX, 0, width, 0, 0.6);
        theremin.amp(newAmp, 0.1);
    }

    if(gameOn) {
        thereminGameDisplay();
        let d1 = dist(mouseX, mouseY, thereminCircle.x, thereminCircle.y);
        if(d1 < thereminCircle.size / 2 + thereminHand.width / 3 && gameOn && thereminOn) {
            thereminCircle.x = random(200, 800);
            thereminCircle.y = random(100, 600);
            gameCount += 1;
            gameSFX.play();
            noLoop = false;
        }
    }

    if(gameCount === 20) {
        gameOn = false;
        thereminGameWin();
        gameWinSFX.setLoop(false);
        if(!gameWinSFX.isPlaying() && !noLoop) {
            gameWinSFX.play()
        }
        noLoop = true;
    }
}


function displayLine() {
    stroke(255);
    strokeWeight(5);
    noFill();
    let mappedAmp = map(theremin.getAmp(), 0, 0.6, width, 0);
    let mappedFreq = map(theremin.getFreq(), 0, 900, height, 0);
    bezier(0, height / 2, width / 3, mappedAmp, (2/3) * width, mappedFreq, width, height / 2);
};


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


function displayHandTheremin() {
    noCursor();
    thereminHand.x = mouseX;
    thereminHand.y = mouseY;
    imageMode(CENTER);
    image(thereminHand.img, thereminHand.x, thereminHand.y, thereminHand.width, thereminHand.height);
}


function thereminGameDisplay() {
    push();
    noStroke();
    fill(thereminCircle.fill.r, thereminCircle.fill.g, thereminCircle.fill.b);
    ellipse(thereminCircle.x, thereminCircle.y, thereminCircle.size);
    pop();

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Score: " + gameCount, width / 2, 175);
    pop();
}


function thereminGameWin() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("YOU WON!", width / 2, 175);
    pop();
}



