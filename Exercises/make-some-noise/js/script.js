/**
 * make-some-noise
 * Luca Sabelli
 * 
 */
"use strict";

// Variable to store oscillator
let theremin;

//Variable to store wave type
let wave = "sine";

//Theremin base object 
let thereminBase = {
  x: 0, 
  y: 0, 
  width: 600, 
  height: 60,
  fill: 175
};

//Theremin rod object
let thereminRod = {
  x: 0, 
  y: 0, 
  width: 20, 
  height: 550, 
  fill: 210
};

//Object for sine button
//The reason there is size, width and height is because a circle is behind an image to give the illusion of a button
let sineButton = {
  x: 0, 
  y: 0,
  size: 50,  
  width: 50, 
  height: 50, 
  img: undefined
};

//Triangle button object
let triangleButton = {
  x: 0, 
  y: 0,
  size: 50, 
  width: 75, 
  height: 75, 
  img: undefined
};


//Square button object
let squareButton = {
  x: 0, 
  y: 0,
  size: 50, 
  width: 75, 
  height: 75, 
  img: undefined
};


//Sawtooth button object
let sawtoothButton = {
  x: 0, 
  y: 0,
  size: 50, 
  width: 75, 
  height: 75, 
  img: undefined
};


//In the preload function, I am calling all the images that will be used for the buttons
function preload() {
  sineButton.img = loadImage("assets/images/sinewave1.png");
  triangleButton.img = loadImage("assets/images/trianglewave1.png");
  squareButton.img = loadImage("assets/images/squarewave1.png");
  sawtoothButton.img = loadImage("assets/images/sawtoothwave1.png");
}


//In the setup function, I am making the canvas, setting the oscillator and positioning all the objects
function setup() {
  createCanvas(700, 700);
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
}


//In the draw function, I am calling all the necessary functions as well as allowing the user to change the frequency and amplitude of the oscillator depending on mouse position
function draw() {
  background(0);
  display();
  displayValues();
  let newFreq = map(mouseY, height, 0, 0, 900);
  theremin.freq(newFreq);

  let newAmp = map(mouseX, 0, width, 0, 0.6);
  theremin.amp(newAmp);
}

//In this function, I am starting the oscillator when the user clicks as well as determining if they hit any of the buttons to change the wave form
function mousePressed() {
  theremin.start();
  let d1 = dist(mouseX, mouseY, sineButton.x + 25, sineButton.y + 25);
  let d2 = dist(mouseX, mouseY, triangleButton.x + 38, triangleButton.y + 35);
  let d3 = dist(mouseX, mouseY, squareButton.x + 38, squareButton.y + 35);
  let d4 = dist(mouseX, mouseY, sawtoothButton.x + 38, sawtoothButton.y + 35);
  
  //Here I am changing the type of the theremin if the user presses the button as well as storing the type in my wave variable
  if(d1 < sineButton.size / 2) {
    theremin.setType('sine');
    wave = "sine";
  }

  if(d2 < triangleButton.size / 2) {
    theremin.setType("triangle");
    wave = "triangle";
  }

  if(d3 < squareButton.size / 2) {
    theremin.setType('square');
    wave = "square";
  }

  if(d4 < sawtoothButton.size / 2) {
    theremin.setType('sawtooth');
    wave = "sawtooth";
  }

}


//This function stops the oscillator if the user releases the mouse
function mouseReleased() {
  theremin.stop();
}


//This function displays all the shapes and images from our objects on the canvas
function display() {
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


//This function displays all the values, which are the amplitude, the frequency, and the wave type
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
