/**
 * i-like-to-move-it
 * Luca Sabelli
 * 
 */

//declaring variables that are going to be used 
let size;

//defining our objects that will be used 
//this one is the face
let circle1 = {
    x: 0,
    y: 250,
    size: 100, 
    speed: 2,
    fill: 255,
    growth: 1.5,
};

//this one is the mouth
let circle2 = {
    x: 500,
    y: 350,
    size: 20,
    speed: -2, 
    fill: 0,
    growth: 0.5,
};

//this one is the left retina
let circle3 = {
    x: 0,
    y: 170,
    size: 50, 
    speed: 0.5,
    fill: 0,
    growth: 1.5,
};

//this one is the right retina
let circle4 = {
    x: 500,
    y: 170,
    size: 50, 
    speed: -0.5,
    fill: 0,
    growth: 1.5,
};

//this is the left eye
let rectangle1 = {
    x: 150, 
    y: 0, 
    w: 120,
    h: 120,
    speed: 1
};

//this is the right eye
let rectangle2 = {
    x: 350,
    y: 0,
    w: 120,
    h: 120,
    speed: 1,   
};

//this is the hair
let triangle1 = {
    x1: 110,
    y1: 0,
    x2: 390,
    y2: 0,
    x3: 250,
    y3: 0,
    growth: 1
}


//here we are creating the canvas being used
function setup() {

    createCanvas(500, 500);

}


/**
  This creates my guy's face, and it's movement and growth path's for all the objects inside
*/
function draw() {
    
    //this is to just ensure that no shape has a stroke unintentionally
    noStroke();
    
    //here we are defining and mapping variables for the background color
    let x1 = map(mouseX, 0, width, 0, 255);
    let y1 = map(mouseY, 0, height, 0, 255);
    background(x1, 50, y1);

    //here we are creating the face of the final product as well as its movement path using constrain
    fill(circle1.fill);
    ellipse(circle1.x, circle1.y, circle1.size);
    circle1.x = circle1.x + circle1.speed;
    circle1.x = constrain(circle1.x, 0, 250);
    circle1.size += circle1.growth;
    circle1.size = constrain(circle1.size, 100, 450);

    //we are defining and mapping another variable to control the growth of the mouth 
    let y2 = map(mouseY, 0, width, 0, 200);
    size = constrain(y2, 20, 200);
    //now we are creating the mouth itself 
    fill(circle2.fill);
    ellipse(circle2.x, circle2.y, size);
    circle2.x = circle2.x + circle2.speed;
    circle2.x = constrain(circle2.x, 250, 500);

    //this section creates the left eye of the guy's glasses and its movement path 
    //I added a random number generator for his shades to add a sort of reflection   
    fill(0, random(230, 255), 0);
    rectMode(CENTER);
    rect(rectangle1.x, rectangle1.y, rectangle1.w, rectangle1.h);
    rectangle1.y += rectangle1.speed;
    rectangle1.y = constrain(rectangle1.y, 0, 170);

    //this part makes the right eye of the glasses and its movement path
    fill(0, random(230, 255), 0);
    rectMode(CENTER);
    rect(rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h);
    rectangle2.y += rectangle2.speed;
    rectangle2.y = constrain(rectangle2.y, 0, 170);

    //now we are creating the left retina and its movement as well
    fill(circle3.fill);
    ellipse(circle3.x, circle3.y, circle3.size);
    circle3.x = circle3.x + circle3.speed;
    circle3.x = constrain(circle3.x, 0, 150);

    //here we are making the right retina and its movement
    fill(circle4.fill);
    ellipse(circle4.x, circle4.y, circle4.size);
    circle4.x = circle4.x + circle4.speed;
    circle4.x = constrain(circle4.x, 350, 500);

    //this part creates his hair and its growth path
    fill(255, 0, 0);
    triangle(triangle1.x1, triangle1.y1, triangle1.x2, triangle1.y2, triangle1.x3, triangle1.y3);
    triangle1.y3 += triangle1.growth;
    triangle1.y3 = constrain(triangle1.y3, 0, 150);
    
    //finally, we are making the connection between the eyes for the man's glasses
    stroke(0, 0, 0);
    strokeWeight(5);
    line(210, 170, 290, 170);

}