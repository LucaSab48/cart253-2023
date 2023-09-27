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


let rectangle = {
    x: 0, 
    y: 250, 
    size: 100,
    vx: 0,
    vy: 0,
    speed: 2,
    scale: 1,
    angle: 0
}

function setup() {
  createCanvas(500, 500);
  rectangle.vx = rectangle.speed;
}

function draw() {
  background(0);
  rectangle.x = rectangle.x + rectangle.vx;
  rectangle.y += rectangle.vy;
  rectangle.scale += 0.01;
  rectangle.angle += 0.05;
  push();
  rectMode(CENTER);
  translate(rectangle.x, rectangle.y);
  scale(rectangle.scale);
  rotate(rectangle.angle); 
  rect(0, 0, rectangle.size, rectangle.size);
  pop();
}