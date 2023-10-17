/**
 * Pumpkin Carving Simulator
 * Luca Sabelli
 * 
 */

"use strict"

//Here we have the state of the game, this determines what phase of the simulator the user is at.
let state = "title";

//Over here is the arrays for the users objects. It stores the copies of each shape.
let triangles = [];
let rectangles = [];
let circles = [];

let amount;

//The endPhrases array stores multiple strings that are the options for our message variable.
//The message variable will store one random end phrase and allow it to be displayed at the end of the program.
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

];

//This variable allows the program to know when the user is finished making his pumpkin.
let ending = false;

//Here we have the variable that will store the original position of the pumpkin lid.
let originalPosition;

//Here are the variables that store the value of the original position (before any rotation) of the different objects.
//This will allow the objects to return to their original position before rotation.
let ogPosXCircle;
let ogPosYCircle;
let ogPosXRectangle;
let ogPosYRectangle;
let ogPosXTriangle;
let ogPosYTriangle;

let bg = undefined;
//Here we have the user object.
//The increment properties determine the rate of increase in size for each object.
//The shape property allows the program to track which shape the user is currently using. 
let user = {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    speed: 5,
    inc: 10,
    inc2: 10,
    shape: undefined,
};

//This object is the main body of the pumpkin that the user draws on.
let pumpkinBody = {
    x: 768,
    y: 460,
    width: 700,
    height: 465,
    img: undefined
};

//This object is the lid of the pumpkin. 
//The dragging component is to let the program know if the user is clicking the top and dragging it off screen.
//The returning component allows the program to know if it has to automatically return the object or not.
let pumpkinLid = {
    x: 768,
    y: 120,
    width: 700,
    height: 215,
    img: undefined,
    dragging: false,
    returning: false
};

//This object is the candle that falls into the pumpkin after the user drags the pumpkin lid away.
let candle = {
    x: 768,
    y: 0,
    vy: 1,
    width: 200,
    height: 200,
    img: undefined,
};

//The object over here is the mouse/knife. 
//The clicked component allows the program to know when the user selects the mouse.
let mouse = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    clicked: false,
    img: undefined
};

//This object displays the circle that follows the user around.
//The fill component allows the program to change the circles color when desired.
//The clicked component does the same thing as the mouse component, it allows the program to know when it is selected.
//The angle component determines the rotation angle of the object.
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

//This is the triangle that follows the users mouse.
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
};

//This is the rectangle object that follows the users mouse.
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
};


//This function preloads all the images and sounds used in the program.
function preload () {
    pumpkinBody.img = loadImage("assets/images/images/pumpkin5_02.png");
    pumpkinLid.img = loadImage("assets/images/pumpkin4_01.png");
    candle.img = loadImage("assets/images/candle.png");
    mouse.img = loadImage("assets/images/knife3.png");
    bg = loadImage("assets/images/background4.1.png");
}


//In the setup, i am creating a canvas and creating a vector for the pumpkin lid so it can have a return path when it auto tracks back.
//I am also setting the variables to store the original position of the pumpkin lid and all the shape objects.
//I am setting the message variable to store a random end phrase as well.
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
    else if (state === "end") {
        end();
    }
    else if (state === "secret") {
        secret();
    }
}


//This function tracks when the mouse is pressed in the simulation.
function mousePressed() {
    //This if statement allows the user to create their desired shape when clicking the mouse.
    //It then adds the shape to the desired array to keep track of all the objects created.
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
    
    //This allows the program to print the different fill color for the objects if selected.
    colorSwitch();

    //This if statement allows the program to determine if the user is clicking the pumpkin lid and drag it away.
    let d = dist(mouseX, mouseY, pumpkinLid.x, pumpkinLid.y);
    if(d < pumpkinLid.width / 2 && user.shape === "mouse" && ending) {
    pumpkinLid.dragging = true;
    }
}


//This function allows the program to track when the user lets go of the click button. 
//It then changes the dragging component of the pumpkin lid so the program knows its no longer following the mouse. 
function mouseReleased() {
    pumpkinLid.dragging = false;
}
    

//This function lets the program know when the mouse is being dragged.
function mouseDragged() {
    //This if statement checks if the dragging component is true, then it tracks the pumpkin lid to where the users mouse is. 
    if(pumpkinLid.dragging) {
        pumpkinLid.x = mouseX;
        pumpkinLid.y = mouseY;
    }
}


//This function checks if the user double clicks. 
function doubleClicked() {
    //These for loops allow the user to delete any specific object they want by tracking the mouse distance and the shape copies.
    for (let i = 0; i < triangles.length; i++) {
        let triCopy = triangles[i]
        let d = dist(mouseX, mouseY, triCopy.x, triCopy.y)

        //This if statement checks if the user selected the mouse then deletes a specific object when double clicked.
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

//This function determines the background color.
//I made it its own function so i can determine the layering more precisely in the simulation and in the ending.
function backgroundColor() {
    imageMode(CENTER);
    image(bg, width/2, height/2, width, height);
};

//This function displays our pumpkin body and pumpkin lid.
function display() {
    noStroke();
    imageMode(CENTER, CENTER);
    image(pumpkinBody.img, pumpkinBody.x, pumpkinBody.y, pumpkinBody.width, pumpkinBody.height);  
    image(pumpkinLid.img, pumpkinLid.x, pumpkinLid.y, pumpkinLid.width, pumpkinLid.height); 
}


//This function determines our users movement.
function userMovement() {
    user.x = mouseX;
    user.y = mouseY;  
}

//This function is the main body of the program.
//When the state of the game is in simulation, this function calls all the functions necessary for our simulation.
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


//This function displays the initial message at the start of our game when the program's state is title. 
function title() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(0);
    text("Pumpkin Carving Simulator", width/2, height/2);
}


//This function starts when the state of our game is in end and calls all the necessary functions for our ending. 
function end() {
    backgroundColor();
    display();
    cirCopyPaste();
    rectCopyPaste();
    triCopyPaste();
    displayEnding();
}


//This function displays the ending message of our game when called upon. 
//It also selects the font used and displays the random end phrase. 
function displayEnding() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text(message, width/2, height/2);
}


//bla bla bla
function secret() {
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(0, 255, 0);
    text("ERROR 404: love not found :(", width/2, height/2);
}


//This function allows our program to know when any key is pressed.
function keyPressed() {
    //This if statement allows the user to hit any key to change the state of the game from title to simulation.
    if(state === "title") {
        state = "simulation";
    }

    //This if statement allows the user to click the enter button to tell the program that they are finished making their pumpkin.
    if(keyCode === ENTER && state === "simulation") {
        ending = true;
    }
}


//This function allows the user to select the triangle shape. 
function triangleClicked() {
    //These if statements lets the program know when the user hits the T key to select the triangle, then sets the user shape to triangle, and then calls the triangle selected function. 
    if(keyIsDown(84)) {
        tri1.clicked = true;
        user.shape = "triangle";
    }

    if(tri1.clicked === true && user.shape === "triangle") {
        triangleSelected();
    }
}


//This function allows the triangle shape selected to follow the users mouse, rotate the shape, change its fill, change its size, and remove the cursor. 
function triangleSelected() {
    tri1.x1 = user.x;
    tri1.y1 = user.y;
    translate(tri1.x1, tri1.y1);
    rotate(tri1.angle);
    fill(tri1.fill.r, tri1.fill.g, tri1.fill.b);
    triangle(0, 0 - user.inc, 0 - user.inc, 0 + user.inc, 0 + user.inc, 0 + user.inc);
    noCursor();
}


//This function allows the program to know when the user chooses the circle shape. 
function circleClicked() {
    //These if statements let the program know when the user hits the C key, then sets the user's shape to circle, then calls the circle selected function.
    if(keyIsDown(67)) {
        cir1.clicked = true;
        user.shape = "circle";
    }

    if(cir1.clicked === true && user.shape === "circle") {
        circleSelected(); 
    }
}


//This function allows the circle to be selected, lets the circle shape follow the mouse around.
//It also does the same things as the triangle selected function but for our circle shape. 
function circleSelected() {
    cir1.x = user.x;
    cir1.y = user.y;
    translate(cir1.x, cir1.y);
    rotate(cir1.angle)
    fill(cir1.fill.r, cir1.fill.g, cir1.fill.b);
    ellipse(0, 0, cir1.size + user.inc2, cir1.size + user.inc);
    noCursor();
}


//This function allows the program to know when the user selects the rectangle shape. 
function rectangleClicked() {
    //These if statements allow the user to hit the R key to select to rectangle shape, change the user's shape to rectangle, then call the rectangle selected function.
    if(keyIsDown(82)) {
        rec1.clicked = true;
        user.shape = "rectangle";
    }

    if(rec1.clicked === true && user.shape === "rectangle") {
        rectangleSelected();
    }
}


//This function allows the rectangle shape to do all the same things as the triangle selected function and the circle selected function but for our rectangle object. 
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


//This function allows the program to display the image of the mouse and remove the cursor. 
function displayMouse() {
    noStroke();
    imageMode(CENTER, CENTER);
    image(mouse.img, mouse.x, mouse.y, mouse.width, mouse.height);
    noCursor();
}


//This function allows the program to know when the user selects the mouse. 
function mouseSelected() {
    //This if statement lets the program know when the user hits the M key, then changes the user's shape to mouse. 
    if(keyIsDown(77)) {
        mouse.clicked = true;
        user.shape = "mouse";
    }

    //This if statement allows the mouse image to follow the users mouse and calls the display mouse function. 
    if(mouse.clicked === true && user.shape === "mouse"){
        mouse.x =mouseX;
        mouse.y = mouseY;
        displayMouse();
    }
}


//This function allows the user to increase or decrease the height of the rectangle and circle, or increase or decrease the size of triangle. 
function sizeInc() {
    //This if statement lets the program know when the up arrow key is selected, then increases the size of the objects. 
    if(keyIsDown(UP_ARROW)) {
        amount = 1;
        user.inc += amount;
    }
    else {
        amount = 0;
    }

    //This if statement lets the program know when the down arrow key is selected, then decreases the size of the objects. 
    if(keyIsDown(DOWN_ARROW)) {
        amount = 1;
        user.inc += -amount;
    }
    else {
        amount = 0;
    }
}


//This function allows the user to increase or decrease the width of the rectangle shape and the circle shape. 
function sizeInc2() {
    //This if statement lets our program know when the user hits the right arrow key, then increases the width. 
    if(keyIsDown(RIGHT_ARROW)) {
        amount = 3;
        user.inc2 += amount;
    }
    else {
        amount = 0;
    }

    //This if statement lets the program know when the user hits the left arrow key, then decreases the width of our objects.
    if(keyIsDown(LEFT_ARROW)) {
        amount = 3;
        user.inc2 += -amount;
    }
    else {
        amount = 0;
    }
}


//This function allows the user to rotate the shapes as well as return it to its original position before the rotation. 
function rotateShape() {
    //This if statement allows the program to know when the user hits the S key to rotate the selected shapes.
    if(keyIsDown(83)) {
        if(user.shape === "circle") {
            cir1.angle += radians(1);
        }
        if(user.shape === "rectangle") {
            rec1.angle += radians(1);
        }
        if(user.shape === "triangle") {
            tri1.angle += radians(1);
        }
    }

    //This if statement allows the user to hit the O key to return all the shapes to their original position when desired. 
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


//This function allows the user to switch the fill of all the objects when desired. 
function colorSwitch() {
    //This if statement lets the program know when the user holds the space bar the fill changes for all the objects, and when its released, the fill goes back to black.
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


//This function has a for loop that prints out copies of the triangle by calling the display triangle copies function and prints out the triangle copy from the array. 
function triCopyPaste() {
    for (let i = 0; i < triangles.length; i++) {
        displayTriCopies(triangles[i]);
    }
}


//This function creates our triangle copy object with an angle component, a triangle copy fill components, and a triangle copy increase component to store those values in each object in the array.
//It the returns the triangle copy. 
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

//This function displays the copies of the triangles created when the user clicks the mouse. 
//This function also allows the copies to be rotated and change their fill. 
function displayTriCopies(triCopy) {
    push();
    translate(triCopy.x, triCopy.y);
    rotate(triCopy.angle);
    fill(triCopy.fill.r, triCopy.fill.g, triCopy.fill.b);
    triangle(0, 0 - triCopy.triInc, 0 - triCopy.triInc, 0 + triCopy.triInc, 0 + triCopy.triInc, 0 + triCopy.triInc);
    pop();
}


//This function does the same thing as the triangle copy paste function.
function cirCopyPaste() {
    for (let i = 0; i < circles.length; i++) {
        displayCirCopies(circles[i]);
    }
}


//This function does the same thing as the create triangle copies function, but it has an additional component for the width increments for these objects. 
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


//This function does the same thing as the display triangle copies function.
function displayCirCopies(cirCopy) {
    push();
    translate(cirCopy.x, cirCopy.y);
    rotate(cirCopy.angle);
    fill(cirCopy.fill.r, cirCopy.fill.g, cirCopy.fill.b);
    ellipse(0, 0, cirCopy.size + cirCopy.cirInc2, cirCopy.size + cirCopy.cirInc);
    pop();
}


//This function does the same thing as the triangle copy paste function and the circle copy paste function. 
function rectCopyPaste() {
    for (let i = 0; i < rectangles.length; i++) {
        displayRectCopies(rectangles[i]);
    }
}


//This function does the same thing as the create circle copy function. 
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


//This function does the same thing as the display triangle copies function and the display circle copies function.
function displayRectCopies(rectCopy) {
    push();
    translate(rectCopy.x, rectCopy.y);
    rotate(rectCopy.angle);
    fill(rectCopy.fill.r, rectCopy.fill.g, rectCopy.fill.b);
    rect(0, 0, rectCopy.width + rectCopy.rectInc2, rectCopy.height + rectCopy.rectInc);
    pop();
}


//This function displays the candle and gives it it's motion and constriction. 
function displayCandle() {
    //This if statement allows the candle to display, then start falling when the user moves the lid out of the way and releases the lid.
    //It also constrains the candles movement to not go past the pumpkin body. 
    if((abs(pumpkinLid.x) < 700 || abs(pumpkinLid.x) > 800) && !pumpkinLid.dragging) {
        image(candle.img, candle.x, candle.y, candle.width, candle.height);
        candle.y += candle.vy;
        candle.y = constrain(candle.y, 0, 600);
    }
}


//This function allows the program to know when the pumpkin lid auto track return should start.
function returningLid() {
    //This if statement lets the tracking start when the candle's y position is further than 300 pixels.
    if(abs(candle.y) > 300) {
        pumpkinLid.returning = true;
    }
}


//This function returns the lid to its original position by tracking its new position and returning it with the created vector. 
function lidReturns() {
    //This if statement allows the pumpkin lid's new position to be tracked and does a couple math equations to determine the magnitude of the vector. 
    if(pumpkinLid.returning) {
        let dx = originalPosition.x - pumpkinLid.x;
        let dy = originalPosition.y - pumpkinLid.y;
        let distance = sqrt(dx * dx + dy * dy);
        
        //This if statement allows the pumpkin lid to have movement and track back to it's original position by calculating the x and y components of the pumpkin lid vector. 
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


//This function allows the program to change states from simulation to end. 
//It is also named after an Adele line in her song Skyfall.
function nowThisIsTheEnd() {
    //This if statement changes the state of the game when the candle's y position is further than 500 pixels and the pumpkin lid is done returning. 
    if(candle.y > 500 && pumpkinLid.returning === false) {
        state = 'end';
    }
}
