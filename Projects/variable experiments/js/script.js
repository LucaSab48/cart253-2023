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


/**
 * Description of setup
*/
function setup() {

    createCanvas(500,500);
    background(255,100,255);
    noStroke();
    fill(0, 0, 10);
    ellipse(250, 500, 420);
    fill(255, 0, 0);
    triangle(220, 370, 280, 370, 250, 420);
    fill(0, 255, 0);
    ellipse(250, 200, 250, 350);
    fill(0, 0, 0);
    ellipse(250, 100, 300, 50);
    fill(0, 0, 0);
    rectMode(CENTER);
    rect(250, 50, 200, 100);
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(250, 450, 20, 100);
    fill(255, 255, 255)
    ellipse(250, 200, 200, 75);
    fill(0, 0, 0);
    ellipse(250, 200, 50, 75);
    stroke(0, 0, 0);
    strokeWeight(10);
    line(200, 310, 300, 310);
    stroke(0, 255, 0);
    strokeWeight(15);
    line(130, 200, 80, 110);
    stroke(0, 255, 0);
    strokeWeight(15);
    line(370, 200, 420, 110);
    fill(0, 255, 0)
    ellipse(420, 110, 20);
    fill(0, 255, 0);
    ellipse(80, 110, 20);
    noStroke();
    fill(255, 255, 255);
    triangle(200, 315, 220, 315, 210, 335);
    fill(255, 255, 255);
    triangle(280, 315, 300, 315, 290, 335);
    fill(0, 0, 50);
    rectMode(CENTER);
    rect(340, 430, 50);
    fill(random(0, 255), random(0, 255), random(0, 255));
    triangle(315, 405, 365, 405, 340, 380);
}


/**
 * Description of draw()
*/
function draw() {

}