/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
let circle;
let circleArray = [];
let isRotating = false;

function setup() {
  createCanvas(400, 400);
  noStroke();
  fill(0);
  circle = createCircle(width / 2, height / 2);
}

function draw() {
  background(220);
  circle.update(mouseX, mouseY);
  circle.display();

  if (isRotating) {
    circle.rotate(0.02);
  }

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].display();
  }
}

function createCircle(x, y) {
  return {
    x: x,
    y: y,
    radius: 20,
    angle: 0,
    update: function(targetX, targetY) {
      let dx = targetX - this.x;
      let dy = targetY - this.y;
      let angle = atan2(dy, dx);
      this.x += cos(angle) * 4;
      this.y += sin(angle) * 4;
    },
    display: function() {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      ellipse(0, 0, this.radius * 2);
      pop();
    },
    rotate: function(angleIncrement) {
      this.angle += angleIncrement;
    }
  };
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    isRotating = !isRotating;
  }
}

function mousePressed() {
  let newCircle = createCircle(mouseX, mouseY);
  circleArray.push(newCircle);
}



