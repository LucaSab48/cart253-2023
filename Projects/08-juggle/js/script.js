/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

let paddle;
let gravityForce = 0.0025;
let balls = [];
let numBalls = 3;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    paddle = new Paddle(300, 20);
    for(let i = 0; i < numBalls; i++) {
        let x = random(0, width);
        let y = random(-400, -100);
        let ball = new Ball(x, y);
        balls.push(ball);
    }
}


function draw() {
    background(0);
    paddle.move();
    paddle.display();
    for(let j = 0; i=j < balls.length; j++) {
        let ball = balls[j];
        if(ball.active){
            ball.display();
            ball.gravity(gravityForce);
            ball.move();
            ball.bounce(paddle);
        }
    }
}


