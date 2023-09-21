/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let bg = {
    red: 0, 
    green: 0,
    blue: 0
};

let circle1 = {
    x: 0,
    y: 250,
    size: 100, 
    speed: 5,
    fill: 255,
    alpha: 150
};

let circle2 = {
    x: width,
    y:250,
    size: 75,
    speed: 5, 
    fill: 0,
    alpha: 150
};

/**
 * Description of setup
*/
function setup() {

    createCanvas(500, 500);
    noStroke();

}


/**
 * Description of draw()
*/
function draw() {
background(bg.red + 5, bg.green, bg.blue);
ellipse(circle1.x, circle1.y, circle1.size);
//circle.y += circle.speed;
//circle.y = constrain(circle.y, 0, 400);
}