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

let user = {
    x: 640,
    y: 640,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5
};

let heart = {
    x: 1280,
    y: 640,
    size: 100,
    dragging: false
};

let hazard1 = {
    x: 700, 
    y: 0,
    size: 200, 
    vx: 0,
    vy: 0,
    speed: 5 
}

let hazard2 = {
    x: 900,
    y: 500,
    width: 100,
    height: 100
}

let hazard3 = {
    x: 1000,
    y: 500,
    width: 100,
    height: 100
}

let hazard4 = {
    x: 1100,
    y: 500,
    width: 100,
    height: 100
}

let hazard5 = {
    x: 1200,
    y: 500,
    width: 100,
    height: 100
}

let hazard6 = {
    x: 1300,
    y: 500,
    width: 100,
    height: 100
}

let hazard7 = {
    x: 1400,
    y: 500,
    width: 100,
    height: 100
}








function setup() {
    createCanvas(windowWidth, windowHeight);
    hazard1.vy = hazard1.speed;
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
    else if (state === "secret") {
        secret();
    }

    
    xControls();
    yControls();


}


function move() {
    user.x += user.vx;
    user.y += user.vy;
    hazard1.y += hazard1.vy; 
}


function checkOffScreen() {

    if(user.x < 0) {
        user.x = width;  
    }
    else if(user.x > width) {
        user.x = 0;
    }

    if(user.y < 0) {
        user.y = height;
    }
    else if(user.y > height) {
        user.y = 0;
    }

    if(heart.x < 0 || heart.x > width || heart.y < 0 || heart.y > height) {
        state = "sad";
    }

    if(hazard1.y > height) {
        hazard1.y = 0;
    }

    if(heart.y < 100) {
        state = "secret";
    }

}


function display() {
    noStroke();
    fill(255);
    ellipse(user.x, user.y, user.size);
    ellipse(heart.x, heart.y, heart.size);
    fill(255, 0, 0);
    ellipse(hazard1.x, hazard1.y, hazard1.size);
    rectMode(CENTER);
    rect(hazard2.x, hazard2.y, hazard2.width, hazard2.height);
    rect(hazard3.x, hazard3.y, hazard3.width, hazard3.height);
    rect(hazard4.x, hazard4.y, hazard4.width, hazard4.height);
    rect(hazard5.x, hazard5.y, hazard5.width, hazard5.height);
    rect(hazard6.x, hazard6.y, hazard6.width, hazard6.height);
    rect(hazard7.x, hazard7.y, hazard7.width, hazard7.height);
}


function checkOverlap() {
    let d = dist(user.x, user.y, heart.x, heart.y);
    if(d < user.size / 2 + heart.size / 2) {
        state = "love";
    }
    
    let d1 = dist(user.x, user.y, hazard1.x, hazard1.y);
    if(d1 < user.size / 2 + hazard1.size / 2) {
        state = "sad";
    }

    let d2 = dist(heart.x, heart.y, hazard1.x, hazard1.y);
    if(d2 < heart.size / 2 + hazard1.size / 2) {
        state = "sad";
    }

    let d3 = dist(user.x, user.y, hazard2.x, hazard2.y);
    if(d3 < user.size / 2 + hazard2.width / 2) {
        state = "sad";
    }

    let d4 = dist(heart.x, heart.y, hazard2.x, hazard2.y);
    if(d4 < heart.size / 2 + hazard2.width / 2) {
        state = "sad";
    }

    let d5 = dist(user.x, user.y, hazard3.x, hazard3.y);
    if(d5 < user.size / 2 + hazard3.width / 2) {
        state = "sad";
    }

    let d6 = dist(heart.x, heart.y, hazard3.x, hazard3.y);
    if(d6 < heart.size / 2 + hazard3.width / 2) {
        state = "sad";
    }

    let d7 = dist(user.x, user.y, hazard4.x, hazard4.y);
    if(d7 < user.size / 2 + hazard4.width / 2) {
        state = "sad";
    }

    let d8 = dist(heart.x, heart.y, hazard4.x, hazard4.y);
    if(d8 < heart.size / 2 + hazard4.width / 2) {
        state = "sad";
    }

    let d9 = dist(user.x, user.y, hazard5.x, hazard5.y);
    if(d9 < user.size / 2 + hazard5.width / 2) {
        state = "sad";
    }

    let d10 = dist(heart.x, heart.y, hazard5.x, hazard5.y);
    if(d10 < heart.size / 2 + hazard5.width / 2) {
        state = "sad";
    }

    let d11 = dist(user.x, user.y, hazard6.x, hazard6.y);
    if(d11 < user.size / 2 + hazard6.width / 2) {
        state = "sad";
    }

    let d12 = dist(heart.x, heart.y, hazard6.x, hazard6.y);
    if(d12 < heart.size / 2 + hazard6.width / 2) {
        state = "sad";
    }

    let d13 = dist(user.x, user.y, hazard7.x, hazard7.y);
    if(d13 < user.size / 2 + hazard7.width / 2) {
        state = "sad";
    }

    let d14 = dist(heart.x, heart.y, hazard7.x, hazard7.y);
    if(d14 < heart.size / 2 + hazard7.width / 2) {
        state = "sad";
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


function secret() {
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(0, 255, 0);
    text("ERROR 404: love not found :(", width/2, height/2);
}


function keyPressed() {
    if (state === "title") {
        state = "simulation";
    }
}


function xControls() {
    if(keyIsDown(65)) {
        user.vx = -user.speed;
    }

    else if (keyIsDown(68)) {
        user.vx = user.speed;
    }

    else {
        user.vx = 0;
    }   
}


function yControls() {
    if (keyIsDown(87)) {
        user.vy = -user.speed;
    }

    else if (keyIsDown(83)) {
        user.vy = user.speed;
    }

    else {
        user.vy = 0;
    }
}

function mousePressed() {
    let d = dist(mouseX, mouseY, heart.x, heart.y);
    if(d < heart.size / 2) {
        heart.dragging = true;
    }
}

function mouseReleased() {
    heart.dragging = false;
}

function mouseDragged() {
    if(heart.dragging) {
        heart.x = mouseX;
        heart.y = mouseY;
    }
}

