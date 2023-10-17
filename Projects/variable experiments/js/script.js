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
let triangleX, triangleY;
let isStaying = false;

function setup() {
  createCanvas(400, 400);
  triangleX = width / 2;
  triangleY = height / 2;
  noStroke();
  fill(255, 0, 0);
  triangle(triangleX, triangleY - 20, triangleX - 20, triangleY + 20, triangleX + 20, triangleY + 20);
}

function draw() {
  background(220);
  if (!isStaying) {
    // Make the triangle follow the mouse
    triangleX = mouseX;
    triangleY = mouseY;
  }
  // Draw the triangle
  fill(255, 0, 0);
  triangle(triangleX, triangleY - 20, triangleX - 20, triangleY + 20, triangleX + 20, triangleY + 20);
}

function mousePressed() {
  // Toggle the isStaying flag on mouse click
  isStaying = !isStaying;
}