/**
 * Pumpkin Carving Simulator
 * Luca Sabelli
 * 
 */

"use strict"
let state = "title";

let selection;


let drum1 = {
    x: 0, 
    y: 0,
    size: 300,
    fill: 100,
    sound: undefined
};

let snare1 = {
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

function preload () {
    drum1.sound = loadSound("assets/sounds/drum1.mp3");
    snare1.sound = loadSound("assets/sounds/snare1.mp3");

}


//In the setup, i am creating a canvas and creating a vector for the pumpkin lid so it can have a return path when it auto tracks back.
//I am also setting the variables to store the original position of the pumpkin lid and all the shape objects.
//I am setting the message variable to store a random end phrase as well.
function setup() {
    createCanvas(1000, 700);
    selection = createSelect();
    selection.position(15, 15);
    selection.option("drum kit");
    selection.option("choir");
    selection.option("theremin");
    selection.changed(selectEvent);
    drum1.x = width/2;
    drum1.y = height/2;
    snare1.x = width - 250;
    snare1.y = height - 500;

}


//In the draw function, I am switching the states of the simulation. 
function draw() {
    if (state === "title") {
        title();
    }
    else if (state === "simulation") {
        simulation();
    }
    else if (state === "end") {
        end();
    }
    else if (state === "secret") {
        secret();
    }
}


function mousePressed() {
    let d1 = dist(mouseX, mouseY, drum1.x, drum1.y);
    if(d1 < drum1.size / 2 && state === "simulation") {
        drum1.sound.play();
        noLoop();
    }
    let d2 = dist(mouseX, mouseY, snare1.x, snare1.y);
    if(d2 < snare1.size / 2 && state === "simulation") {
        snare1.sound.play();
        noLoop();
    }
}


function mouseReleased() {

}
    

function mouseDragged() {

}


function displayDrum1() {
    background(0);
    noStroke();
    fill(drum1.fill);
    ellipseMode(CENTER);
    ellipse(drum1.x, drum1.y, drum1.size);
    fill(200)
    ellipse(drum1.x, drum1.y, drum1.size - 20);
}


function displaySnare1() {
    noStroke();
    fill(snare1.fill.r, snare1.fill.g, snare1.fill.b);
    ellipse(snare1.x, snare1.y, snare1.size);
    fill(0)
    ellipse(snare1.x, snare1.y, snare1.size / 20);
}


//This function is the main body of the program.
//When the state of the game is in simulation, this function calls all the functions necessary for our simulation.
function simulation() {
    mousePressed();
    selectEvent();
}


//This function displays the initial message at the start of our game when the program's state is title. 
function title() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("Instrument Simulator", width/2, height/2);
}


//This function starts when the state of our game is in end and calls all the necessary functions for our ending. 
function end() {

}


//This function allows our program to know when any key is pressed.
function keyPressed() {
    state = "simulation"
}


function selectEvent() {
    let tool = selection.value();
    
    if(tool === "drum kit") {
        displayDrum1();
        displaySnare1();
    }
    
    if(tool === "choir") {
        background(255);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(100);
        text("choir", width/2, height/2);
    }
    
    if(tool === "theremin") {
        background(255);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(100);
        text("theremin", width/2, height/2);
    }
}




