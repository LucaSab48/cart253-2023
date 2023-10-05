/**
 * Love, Actually
 * Luca Sabelli
 * 
 */


//This variable is to determine what state the game is currently in.
//I am starting it in the title state so the game initiates with the title.
let state = "title";

//Here we have the user object.
let user = {
    x: 640,
    y: 640,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5,
};

//Here is our heart object, where the user wants to get to.
let heart = {
    x: 1280,
    y: 640,
    size: 100,
    dragging: false,
};

//Here is our first hazard object, the red circle that goes across the middle of the screen.
let hazard1 = {
    x: 700, 
    y: 0,
    size: 200, 
    vx: 0,
    vy: 0,
    speed: 5 
};

//Over here is our block to the heart.
//I had to separate the long rectangle into multiple squares so that the program can register when the user or heart collides with it.
//They are all immediately next to each other so it looks continuous. 
let hazard2 = {
    x: 900,
    y: 500,
    width: 100,
    height: 100
};

let hazard3 = {
    x: 1000,
    y: 500,
    width: 100,
    height: 100
};

let hazard4 = {
    x: 1100,
    y: 500,
    width: 100,
    height: 100
};

let hazard5 = {
    x: 1200,
    y: 500,
    width: 100,
    height: 100
};

let hazard6 = {
    x: 1300,
    y: 500,
    width: 100,
    height: 100
};

let hazard7 = {
    x: 1400,
    y: 500,
    width: 100,
    height: 100
};


//In the setup, i am creating a canvas and setting the y-axis velocity of the red circle to its speed component.
function setup() {
    createCanvas(windowWidth, windowHeight);
    hazard1.vy = hazard1.speed;
}


//In the draw function, I am switching the states of the game.
//I am also inserting the movement for the user circle and setting the background color. 
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


//This function is dedicated to the movement of our objects. 
function move() {
    user.x += user.vx;
    user.y += user.vy;
    hazard1.y += hazard1.vy; 
}


//This function is checking if any of our objects get off the screen.
function checkOffScreen() {

    //This if statement checks if the user veers off the canvas and sends him to the other side.
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

    //This if statement checks if the heart is off the canvas, in which case the game ends and you get the sad ending.
    if(heart.x < 0 || heart.x > width || heart.y < 0 || heart.y > height) {
        state = "sad";
    }

    //This statement resets the position of the red circle after it goes past the canvas.
    if(hazard1.y > height) {
        hazard1.y = 0;
    }

    //This is my secret ending to the game, where if the player drags the heart high up, a message appears.
    if(heart.y < 100) {
        state = "secret";
    }

}


//This function displays all my objects on the canvas as well as filling their color. 
//I added no stroke so the line of squares would be seamless. 
function display() {
    noStroke();
    fill(255);
    ellipse(user.x, user.y, user.size);
    fill(0, 255, 0);
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


// This function verifies if the user or heart are overlapping with each other or any other object.
// Depending on which objects are overlapping, the if statements will change the state of the game. 
function checkOverlap() {
    
    //Here we are checking if the user and heart have touched and the player gets the love ending.
    let d = dist(user.x, user.y, heart.x, heart.y);
    if(d < user.size / 2 + heart.size / 2) {
        state = "love";
    }
    
    //Here is our red circle, if touched the player gets the sad ending. 
    let d1 = dist(user.x, user.y, hazard1.x, hazard1.y);
    if(d1 < user.size / 2 + hazard1.size / 2) {
        state = "sad";
    }

    //Over here is the long section of checking each individual square to see if the user or heart are touching it.
    //If either are touching the square, the player will get the sad ending. 
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

//This is the games main state.
//It calls upon a few of our other functions.
//This initiates after the title state.
function simulation() {
    move();
    display();
    checkOffScreen();
    checkOverlap();
}


//This function is the beginning to the game.
//It displays a message and is the initial state of my game. 
function title() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text("does true love exist?", width/2, height/2);
}


//This function is our love ending.
//It will display a message if the player wins by touching the user and the heart.
function love() {
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(255);
    text("LOVE DOES EXIST!", width/2, height/2);
}


//This is the sad ending to the game.
//It will initiate if the player touches any hazard object or if he drags the heart outside of the canvas. 
function sad() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text("i guess we all die alone", width/2, height/2);
}

//This is our secret ending to the game.
//It will display a funny message if the player discovers the secret. 
function secret() {
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(0, 255, 0);
    text("ERROR 404: love not found :(", width/2, height/2);
}


//This function allows the player to initiate the simulation state after the title screen.
//Any key he presses will work.
function keyPressed() {
    if (state === "title") {
        state = "simulation";
    }
}

//This function determines the user's controls for the x-axis.
//It is the A key and the D key to move left and right.
function xControls() {
    //This is the A key  
    if(keyIsDown(65)) {
        user.vx = -user.speed;
    }

    //This is the D key
    else if (keyIsDown(68)) {
        user.vx = user.speed;
    }

    else {
        user.vx = 0;
    }   
}


//This function determines the users controls for the y-axis.
//The key W is up and S is down.
function yControls() {
    //This is W  
    if (keyIsDown(87)) {
        user.vy = -user.speed;
    }

    //This is S
    else if (keyIsDown(83)) {
        user.vy = user.speed;
    }

    else {
        user.vy = 0;
    }
}


//This function is the movement for the heart.
function mousePressed() {
    let d = dist(mouseX, mouseY, heart.x, heart.y);
    
    //This if statement is to let the program know when you press the mouse.
    if(d < heart.size / 2) {
        heart.dragging = true;
    }
}


//This function is to know when the player is releasing the click button on the heart.
function mouseReleased() {
    heart.dragging = false;
}


//This function determines the position of the mouse while dragging the heart object. 
function mouseDragged() {
    if(heart.dragging) {
        heart.x = mouseX;
        heart.y = mouseY;
    }
}

