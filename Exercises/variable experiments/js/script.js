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

let backgroundShade = 0;

let circle = {
    x: 250,
    y: 0,
    size: 100, 
    speed: 5,
    fill: 255
};

/**
 * Description of setup
*/
function setup() {

    createCanvas(500, 500);

}


/**
 * Description of draw()
*/
function draw() {
background(backgroundShade);
ellipse(circle.x, circle.y, circle.size);
circle.y += circle.speed;
circle.y = constrain(circle.y, 0, 400);
}