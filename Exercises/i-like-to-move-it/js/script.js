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
    speed: 2,
    fill: 255,
    growth: 1.5,
    alpha: 150
};

let circle2 = {
    x: 500,
    y: 250,
    size: 75,
    speed: -2, 
    fill: 255,
    growth: 1,
    alpha: 100
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

bg.red = bg.red + 1;
background(bg.red, bg.green, bg.blue);
fill(circle1.fill, circle1.alpha);
ellipse(circle1.x, circle1.y, circle1.size);
circle1.x = circle1.x + circle1.speed;
circle1.x = constrain(circle1.x, 0, 250);
circle1.size += circle1.growth;
circle1.size = constrain(circle1.size, 100, 500);
fill(circle2.fill, circle2.alpha);
ellipse(circle2.x, circle2.y, circle2.size);
circle2.x = circle2.x + circle2.speed;
circle2.x = constrain(circle2.x, 250, 500);
circle2.size += circle2.growth;
circle2.size = constrain(circle2.size, 75, 340);

}