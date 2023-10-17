/**
 * Pumpkin Carving Simulator
 * Luca Sabelli
 * 
 */

//Here we have the state of the game, this determines what phase of the simulator the user is at.
let state = "title";

//Over here is the arrays for the users objects. It stores the copies of each shape.
let triangles = [];
let rectangles = [];
let circles = [];

let message;
let endPhrases = [
    "SPOOKTASTIC",
    "Help, I'm stuck in this pumpkin!",
    "Oh my gourd!",
    "Cutest pumpkin in the patch :)",
    "Creeping it real",
    "Your pumpkin is boo-tiful",
    "What a spooky cutie",
    "Don't be a Halloweenie",
    "It's gourd-geous"

]

//**** */ 
let ending = false;

//Here we have the user object.
//The increment properties determine the rate of increase in size for each object. 
let user = {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    vx: 0,
    vy: 0,
    speed: 5,
    inc: 10,
    inc2: 10,
    shape: undefined,
};

let pumpkinBody = {
    x: 768,
    y: 460,
    width: 700,
    height: 465,
    img: undefined
};

let pumpkinLid = {
    x: 768,
    y: 120,
    width: 700,
    height: 215,
    img: undefined,
    dragging: false,
    returning: false
};

let candle = {
    x: 768,
    y: 0,
    vy: 1,
    width: 200,
    height: 200,
    img: undefined,
}

let mouse = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    clicked: false,
    img: undefined
};

let cir1 = {
    x: 1000,
    y: 600,
    size: 50,
    angle: 0,
    fill: {
        r: 0, 
        g: 0, 
        b: 0,
    },
    clicked: false
};

let tri1 = {
    x1: 100,
    y1: 100,
    angle: 0,
    fill: {
        r: 0, 
        g: 0, 
        b: 0.
    },
    clicked: false
}

let rec1 = {
    x: 100, 
    y: 100,
    width: 50,
    height: 100,
    angle: 0,
    fill: {
        r: 0, 
        g: 0,
        b: 0, 
    }, 
    clicked: false
}

function preload () {
    pumpkinBody.img = loadImage("assets/images/images/pumpkin4_02.jpg");
    pumpkinLid.img = loadImage("assets/images/pumpkin4_01.png");
    candle.img = loadImage("assets/images/candle.png")
    mouse.img = loadImage("assets/images/knife3.png");
}


//In the setup, i am creating a canvas and setting the y-axis velocity of the red circle to its speed component.
function setup() {
    createCanvas(windowWidth, windowHeight);
    originalPosition = createVector(pumpkinLid.x, pumpkinLid.y);
    ogPosXCircle = cir1.x;
    ogPosYCircle = cir1.y; 
    ogPosXRectangle = rec1.x;
    ogPosYRectangle = rec1.y;
    ogPosXTriangle = tri1.x1;
    ogPosYTriangle = tri1.y1;
    message = random(endPhrases);
}


//In the draw function, I am switching the states of the simulation. 
function draw() {
    if (state === "title") {
        title();
    }
    else if (state === "simulation") {
        simulation();
    }
    else if (state === "love") {
        end();
    }
    else if (state === "secret") {
        secret();
    }
}


function mousePressed() {
    
    if(user.shape === "circle") {
        let cirCopy = createCirCopy(mouseX, mouseY);
        circles.push(cirCopy);
    }
    else if(user.shape === "rectangle") {
        let rectCopy = createRectCopy(mouseX, mouseY);
        rectangles.push(rectCopy);
    }
    else if(user.shape === "triangle") {
        let triCopy = createTriCopy(mouseX, mouseY);
        triangles.push(triCopy);
    }
    else {
        print("nothing");
    }
    colorSwitch();

    let d = dist(mouseX, mouseY, pumpkinLid.x, pumpkinLid.y);
    if(d < pumpkinLid.width / 2 && user.shape === "mouse" && ending) {
    pumpkinLid.dragging = true;
    }
}


function mouseReleased() {
    pumpkinLid.dragging = false;
}
    
    
function mouseDragged() {
    if(pumpkinLid.dragging) {
        pumpkinLid.x = mouseX;
        pumpkinLid.y = mouseY;
    }
}


function doubleClicked() {
    for (let i = 0; i < triangles.length; i++) {
        let triCopy = triangles[i]
        let d = dist(mouseX, mouseY, triCopy.x, triCopy.y)
        if(d <= abs(triCopy.triInc) && user.shape === "mouse") {
            triangles.splice(i, 1);
            break;
        }
    }
    for (let i = 0; i < rectangles.length; i++) {
        let rectCopy = rectangles[i]
        let d = dist(mouseX, mouseY, rectCopy.x, rectCopy.y)
        if((d <= abs(rectCopy.rectInc) / 1.5 || d <= abs(rectCopy.rectInc2) / 1.5) && user.shape === "mouse") {
            rectangles.splice(i, 1);
            break;
        }
    }
    for (let i = 0; i < circles.length; i++) {
        let cirCopy = circles[i]
        let d = dist(mouseX, mouseY, cirCopy.x, cirCopy.y)
        if((d <= abs(cirCopy.cirInc) / 1.5 || d <= abs(cirCopy.cirInc2) / 1.5) && user.shape === "mouse") {
            circles.splice(i, 1);
            break;
        }
    }
}


function backgroundColor() {
    background(255);
}


function display() {
    noStroke();
    imageMode(CENTER, CENTER);
    image(pumpkinBody.img, pumpkinBody.x, pumpkinBody.y, pumpkinBody.width, pumpkinBody.height);  
    image(pumpkinLid.img, pumpkinLid.x, pumpkinLid.y, pumpkinLid.width, pumpkinLid.height); 
}


function userMovement() {
    user.x = mouseX;
    user.y = mouseY;  
}


function simulation() {
    backgroundColor();
    displayCandle();
    display();
    userMovement();
    sizeInc();
    sizeInc2();
    cirCopyPaste();
    rectCopyPaste();
    triCopyPaste();
    mouseSelected();
    colorSwitch();
    circleClicked();
    triangleClicked();
    rectangleClicked();
    returningLid();
    lidReturns();
    rotateShape();
    nowThisIsTheEnd();
}


function title() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(0);
    text("Pumpkin Carving Simulator", width/2, height/2);
}


function end() {
    backgroundColor();
    display();
    cirCopyPaste();
    rectCopyPaste();
    triCopyPaste();
    displayEnding();
}


function displayEnding() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text(message, width/2, height/2);
    print('ending2');
}


function secret() {
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(0, 255, 0);
    text("ERROR 404: love not found :(", width/2, height/2);
}


function keyPressed() {
    if(state === "title") {
        state = "simulation";
    }

    if(keyCode === ENTER && state === "simulation") {
        ending = true;
    }
}


function triangleClicked() {
    if(keyIsDown(84)) {
        tri1.clicked = true;
        user.shape = "triangle";
    }

    if(tri1.clicked === true && user.shape === "triangle") {
        triangleSelected();
    }
}


function triangleSelected() {
    tri1.x1 = user.x;
    tri1.y1 = user.y;
    translate(tri1.x1, tri1.y1);
    rotate(tri1.angle);
    fill(tri1.fill.r, tri1.fill.g, tri1.fill.b);
    triangle(0, 0 - user.inc, 0 - user.inc, 0 + user.inc, 0 + user.inc, 0 + user.inc);
    noCursor();
}

function circleClicked() {
    if(keyIsDown(67)) {
        cir1.clicked = true;
        user.shape = "circle";
    }

    if(cir1.clicked === true && user.shape === "circle") {
        circleSelected(); 
    }
}


function circleSelected() {
    cir1.x = user.x;
    cir1.y = user.y;
    translate(cir1.x, cir1.y);
    rotate(cir1.angle)
    fill(cir1.fill.r, cir1.fill.g, cir1.fill.b);
    ellipse(0, 0, cir1.size + user.inc2, cir1.size + user.inc);
    noCursor();
}


function rectangleClicked() {
    if(keyIsDown(82)) {
        rec1.clicked = true;
        user.shape = "rectangle";
    }

    if(rec1.clicked === true && user.shape === "rectangle") {
        rectangleSelected();
    }
}


function rectangleSelected() {
    rec1.x = user.x;
    rec1.y = user.y;
    translate(rec1.x, rec1.y);
    rotate(rec1.angle);
    fill(rec1.fill.r, rec1.fill.g, rec1.fill.b);
    rectMode(CENTER);
    rect(0, 0, rec1.width + user.inc2, rec1.height + user.inc);
    noCursor();
}


function displayMouse() {
    noStroke();
    imageMode(CENTER, CENTER);
    image(mouse.img, mouse.x, mouse.y, mouse.width, mouse.height);
    noCursor();
}


function mouseSelected() {
    if(keyIsDown(77)) {
        mouse.clicked = true;
        user.shape = "mouse";
    }

    if(mouse.clicked === true && user.shape === "mouse"){
        mouse.x =mouseX;
        mouse.y = mouseY;
        displayMouse();
    }
}


function sizeInc() {
    let amount;
    if(keyIsDown(UP_ARROW)) {
        amount = 3;
        user.inc += amount;
    }
    else {
        amount = 0;
    }

    if(keyIsDown(DOWN_ARROW)) {
        amount = 3;
        user.inc += -amount;
    }
    else {
        amount = 0;
    }
}


function sizeInc2() {
    if(keyIsDown(RIGHT_ARROW)) {
        amount = 3;
        user.inc2 += amount;
    }
    else {
        amount = 0;
    }

    if(keyIsDown(LEFT_ARROW)) {
        amount = 3;
        user.inc2 += -amount;
    }
    else {
        amount = 0;
    }
}


function rotateShape() {
    if(keyIsDown(83)) {
        if(user.shape === "circle") {
            cir1.angle += radians(3);
        }
        if(user.shape === "rectangle") {
            rec1.angle += radians(3);
        }
        if(user.shape === "triangle") {
            tri1.angle += radians(3);
        }
    }
    if(keyIsDown(79)) {
        cir1.angle = 0;
        cir1.x = ogPosXCircle;
        cir1.y = ogPosYCircle;
        rec1.angle = 0;
        rec1.x = ogPosXRectangle;
        rec1.y = ogPosYRectangle;
        tri1.angle = 0;
        tri1.x1 = ogPosXTriangle;
        tri1.y1 = ogPosYTriangle;
    }
}


function colorSwitch() {
    if(keyIsDown(32)) {
        cir1.fill.r = 255; 
        cir1.fill.g = 150;
        cir1.fill.b = 40;
        tri1.fill.r = 255; 
        tri1.fill.g = 150;
        tri1.fill.b = 40;
        rec1.fill.r = 255; 
        rec1.fill.g = 150;
        rec1.fill.b = 40;
    }
    else {
        cir1.fill.r = 0; 
        cir1.fill.g = 0; 
        cir1.fill.b = 0;
        tri1.fill.r = 0; 
        tri1.fill.g = 0;
        tri1.fill.b = 0;
        rec1.fill.r = 0; 
        rec1.fill.g = 0;
        rec1.fill.b = 0;
    }
}


function triCopyPaste() {
    for (let i = 0; i < triangles.length; i++) {
        displayTriCopies(triangles[i]);
    }
}


function createTriCopy(x, y) {
    let triCopy = {
        x: x,
        y: y,
        angle: tri1.angle,
        fill: {
            r: tri1.fill.r,
            g: tri1.fill.g,
            b: tri1.fill.b,
        },
        triInc: user.inc,
    };
    return triCopy;
}


function displayTriCopies(triCopy) {
    push();
    translate(triCopy.x, triCopy.y);
    rotate(triCopy.angle);
    fill(triCopy.fill.r, triCopy.fill.g, triCopy.fill.b);
    triangle(0, 0 - triCopy.triInc, 0 - triCopy.triInc, 0 + triCopy.triInc, 0 + triCopy.triInc, 0 + triCopy.triInc);
    pop();
}


function cirCopyPaste() {
    for (let i = 0; i < circles.length; i++) {
        displayCirCopies(circles[i]);
    }
}


function createCirCopy(x, y) {
    let cirCopy = {
        x: x,
        y: y,
        size: 50,
        angle: cir1.angle,
        fill: {
            r: cir1.fill.r,
            g: cir1.fill.g,
            b: cir1.fill.b,
        },
        cirInc: user.inc,
        cirInc2: user.inc2
    };
    return cirCopy;
}


function displayCirCopies(cirCopy) {
    push();
    translate(cirCopy.x, cirCopy.y);
    rotate(cirCopy.angle);
    fill(cirCopy.fill.r, cirCopy.fill.g, cirCopy.fill.b);
    ellipse(0, 0, cirCopy.size + cirCopy.cirInc2, cirCopy.size + cirCopy.cirInc);
    pop();
}


function rectCopyPaste() {
    for (let i = 0; i < rectangles.length; i++) {
        displayRectCopies(rectangles[i]);
    }
}


function createRectCopy(x, y) {
    let rectCopy = {
        x: x,
        y: y,
        width: 50,
        height: 100,
        angle: rec1.angle,
        fill: {
            r: rec1.fill.r,
            g: rec1.fill.g,
            b: rec1.fill.b,
        },
        rectInc: user.inc,
        rectInc2: user.inc2
    };
    return rectCopy;
}


function displayRectCopies(rectCopy) {
    push();
    translate(rectCopy.x, rectCopy.y);
    rotate(rectCopy.angle);
    fill(rectCopy.fill.r, rectCopy.fill.g, rectCopy.fill.b);
    rect(0, 0, rectCopy.width + rectCopy.rectInc2, rectCopy.height + rectCopy.rectInc);
    pop();
}


function displayCandle() {
    if((abs(pumpkinLid.x) < 700 || abs(pumpkinLid.x) > 800) && !pumpkinLid.dragging) {
        image(candle.img, candle.x, candle.y, candle.width, candle.height);
        candle.y += candle.vy;
        candle.y = constrain(candle.y, 0, 600);
    }
}


function returningLid() {
    if(abs(candle.y) > 300) {
        pumpkinLid.returning = true;
    }
}


function lidReturns() {
    if(pumpkinLid.returning) {
        let dx = originalPosition.x - pumpkinLid.x;
        let dy = originalPosition.y - pumpkinLid.y;
        let distance = sqrt(dx * dx + dy * dy);
        if(distance > 1) {
            let angle1 = atan2(dy, dx);
            pumpkinLid.x += cos(angle1) * 2;
            pumpkinLid.y += sin(angle1) * 2;
        }
        else {
            pumpkinLid.returning = false;
        }
    }
}


function nowThisIsTheEnd() {
    if(candle.y > 500 && pumpkinLid.returning === false) {
        displayEnding();
        state = 'end';
    }
}
