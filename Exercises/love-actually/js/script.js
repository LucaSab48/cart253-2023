/**
 * Cat Game
 * Luca Sabelli
 */
  
  let circle = {
    x: 250,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 2
  }
  
  function setup() {
    createCanvas(500, 500);
  }
  
  function draw() {
    background(0);
  
    let dx = circle.x - mouseX; // Distance between the circle and the mouse horizontally
    let dy = circle.y - mouseY; // Distance between the circle and the mouse vertically
  
    if (dx < 0) { // If dx is negative, the mouse is to the right
      // So move right
      circle.vx = circle.speed;
    }
    else if (dx > 0) { // If dx is positive, the mouse is to the left
      // So move left
      circle.vx = -circle.speed;
    }
  
    // Same again for the y axis
    if (dy < 0) {
      circle.vy = circle.speed;
    }
    else if (dy > 0) {
      circle.vy = -circle.speed;
    }
  
    circle.x = circle.x + circle.vx;
    circle.y = circle.y + circle.vy;
  
    ellipse(circle.x, circle.y, circle.size);
  }