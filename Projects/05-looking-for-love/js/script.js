/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

function preload() {

}

let state = "title";

let circle1 = {
    x: 640,
    y: 640,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5
};

let circle2 = {
    x: 1280,
    y: 640,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5
};


function setup() {
    createCanvas(windowWidth, windowHeight);
    circle1.vx = random(-circle1.speed, circle1.speed);
    circle1.vy = random(-circle1.speed, circle1.speed);
    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
   
}


function draw() {
    background(0);
    if (state === "title") {
        title();
    }
    else if (state === "simulation") {
        simulation();
    }
    else if (state === "love") {
        love();
    }
    else if (state === "sad") {
        sad();
    }
}


function move() {
    circle1.x += circle1.vx;
    circle1.y += circle1.vy;
    circle2.x += circle2.vx;
    circle2.y += circle2.vy; 
}


function checkOffScreen() {
    if(circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height) {
        state = "sad";
    }
    if(circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
        state = "sad";
    }
}


function display() {
    fill(255);
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);
}


function checkOverlap() {
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if(d < circle1.size / 2 + circle2.size / 2) {
        state = "love";
    }
}


function simulation() {
    move();
    display();
    checkOffScreen();
    checkOverlap();
}


function title() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text("does true love exist?", width/2, height/2);
}


function love() {
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(255);
    text("LOVE DOES EXIST!", width/2, height/2);
}


function sad() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text("i guess we all die alone", width/2, height/2);
}


function mousePressed() {
    if (state === "title") {
        state = "simulation";
    }
}


