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

let staticAmount = 1000;

let user = {
    size: 100,
    fill: 255
}

let covid19 = {
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5,
    fill: {
        r: 255,
        g: 0,
        b: 0
    }
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    covid19.y = random(0, height);
    covid19.vx = covid19.speed;
}

function draw() {
    background(0);
    for (let i = 0; i < staticAmount; i++) {
       let posX = random(0, width);
       let posY = random(0, height);
       stroke(255);
       point(posX, posY);
    }
    let userX = mouseX;
    let userY = mouseY;
    fill(user.fill);
    ellipse(userX, userY, user.size);
    covid19.x += covid19.vx;
    covid19.y += covid19.vy;
    fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
    noStroke();
    ellipse(covid19.x, covid19.y, covid19.size);
    if (covid19.x > width) {
        covid19.x = 0;
        covid19.y = random(0, height);
    }
    let d = dist(userX, userY, covid19.x, covid19.y);
    if (d < covid19.size / 2 + user.size / 2) {
        noLoop();
    }
}