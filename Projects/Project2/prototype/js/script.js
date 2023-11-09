/**
 * Instrument Simulator Prototype
 * Luca Sabelli
 * 
 */

"use strict"
let state = "title";

let selection;

let choir = [];

let numChoirBoys = 10;

let mouthSize = 10;

let drumSelect = {
    x: 0, 
    y: 0, 
    width: 200,
    height: 200
}

let choirSelect = {
    x: 0, 
    y: 0, 
    width: 200,
    height: 200
}

let drum1 = {
    x: 0, 
    y: 0,
    size: 300,
    fill: 100,
    sound: undefined
};

let drum2 = {
    x: 0, 
    y: 0, 
    size: 200, 
    fill: 100, 
    sound: undefined,
};

let drum3 = {
    x: 0, 
    y: 0, 
    size: 250, 
    fill: 100, 
    sound: undefined,
};

let drum4 = {
    x: 0, 
    y: 0, 
    size: 180, 
    fill: 100, 
    sound: undefined,
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
};

let bass = {
    x: 0, 
    y: 0,
    width: 250,
    height: 300,
    fill: 100,
    sound: undefined
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
}


//In the set up i am setting the initial location of all my objects and creating my array of choir boys
function setup() {
    createCanvas(1000, 700);
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

    for(let i = 0; i < numChoirBoys; i++) {
        let x = random(0, width);
        let y = 200;
        let choirBoy = new Choir(x, y);
        choir.push(choirBoy);
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

    if(d1 < drum1.size / 2 && state === "drum kit") {
        drum1.sound.play();
        noLoop();
    }

    if(d2 < cymbal1.size / 2 && state === "drum kit") {
        cymbal1.sound.play();
        noLoop();
    }

    if(d3 < drum2.size / 2 && state === "drum kit" && d2 > cymbal1.size / 2) {
        drum2.sound.play();
        noLoop();
    }

    if(d4 < drum3.size / 2 && state === "drum kit") {
        drum3.sound.play();
        noLoop();
    }
    
    if(d5 < drum4.size / 2 && state === "drum kit" && d6 > cymbal2.size / 2) {
        drum4.sound.play();
        noLoop();
    }

    if(d6 < cymbal2.size / 2 && state === "drum kit") {
        cymbal2.sound.play();
        noLoop();
    }
 
    if((d7 < bass.width / 2 || d7 < bass.height / 2) && state === "drum kit" && d3 > drum2.size / 2 && d5 > drum4.size / 2) {
        bass.sound.play();
        noLoop();
    }

    if((d8 < drumSelect.height / 2 || d8 < drumSelect / 2) && state === "simulation") {
        state = "drum kit";
    }

    if((d9 < choirSelect.height / 2 || d9 < choirSelect.width / 2) && state === "simulation") {
        state = "choir";
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
    displayBass();
    displayDrum4();
    displayDrum3();
    displayDrum2();
    displayDrum1();
    displayCymbal1();
    displayCymbal2();
    mousePressed();
}

//Function that activates when state switches to choir
function choirPick() {
    background(0);
    for(let j = 0; j < choir.length; j++) {
        let choirBoy = choir[j];
        choirBoy.display();
        choirBoy.mouthMove();
    }
}

//This function allows our program to know when any key is pressed.
//It is currently only switching the state of the choir to the drum kit when the space bar is pressed
//This is because i cant figure out currently how to play an audio file once without stopping the loop
function keyPressed() {
    if(state === "title") {
        state = "simulation";
    }

    if(keyCode === 32 && state === "choir") {
        state = "drum kit";
    }
    
}


