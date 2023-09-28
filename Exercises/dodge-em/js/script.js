/**
 * Cat Game
 * Luca Sabelli
 */


//This variable is used to iterate the number of circles we will have in the background.
let staticAmount = 50;

//This is used to keep track of the number of fishes the cat catches.
let count = 0;

//This object is our cat that will catch the fish.
//The active component in the object is to keep track of when the mouse is clicked. 
let cat = {
    x: 0,
    y: 650,
    size: 200,
    fill: 255,
    active: false,
    image: undefined
};

//This object is the fish we're catching.
let fish = {
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 10,
    image: undefined
};


//In this function, we are creating the canvas for our game and loading the images for the cat and fish.
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    //Here, we are setting the initial x position of our fish and assigning the y velocity to it's speed component.
    fish.x = random(0, width);
    fish.vy = fish.speed;
    cat.image = loadImage("assets/images/cat1.png");
    fish.image = loadImage("assets/images/fishbone.png");
    
    //This part is here to stylize the text in the next function.
    textSize(50);
    textAlign(CENTER, CENTER);
    
}


//In the draw function, we have the meat of our code.
//We initially set the background color, then we add all the movement and images.
function draw() {
    background(70, 150, 100);
    
    //This section draws the score board in the top right section of our canvas.
    fill(0);
    text(count, 1400, 30);
    text("score:", 1300, 30);
    
    //This "for" loop is to create th circles in the background of our game.  
    for (let i = 0; i < staticAmount; i++) {
       let posX = random(0, width);
       let posY = random(0, height);
       let size1 = random(0, 20);
       fill(random(0, 255), random(0, 255), random(0, 255));
       noStroke();
       ellipse(posX, posY, size1);
    }
    
    //This section is to insert our cat and fish images as well as giving the fish it's movement.
    imageMode(CENTER);
    image(cat.image, cat.x, cat.y, cat.size, cat.size);
    fish.x += fish.vx;
    fish.y += fish.vy;
    image(fish.image, fish.x, fish.y, fish.size, fish.size);
    
    //This "for" loop is to reset the fish after it has reached the end of the canvas.
    if (fish.y > height) {
        fish.y = 0;
        fish.x = random(0, width);
    }
    
    //This section of code allows our cat to catch the fish and add it to the scoreboard. 
    //It also resets the fishes position when it touches the cat so that it will only count it 1 time.
    let d = dist(cat.x, cat.y, fish.x, fish.y);
    if (d < fish.size / 2 + cat.size / 3) {
        fish.y = 0;
        fish.x = random(0, width);
        count += 1;
    }
    
    //This "if" statement ends the draw loop and displays a message when the player gets 10 fishes.
    //The winning text will be a random color.   
    if (count === 10) {
        textSize(80);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("YOU WIN!!!", 750, 350);
        noLoop();
    }
}


//This function allows our code to know when the mouse is being moved without any buttons pressed.
//It returns our active component as true to know when the player is not clicking.
//This "if" statement also allows our program to reset the cat's active component after each click.  
function mouseMoved() {
    if (cat.active === false) {
        cat.x = mouseX;
        cat.active = true;
    }
}


//This function allows the code to know when the user clicks the mouse. 
//It then sets the x position of the cat to the mouse position and the y position stays fixed. 
function mouseClicked() {
    cat.x = mouseX;
    cat.y = 650;
}