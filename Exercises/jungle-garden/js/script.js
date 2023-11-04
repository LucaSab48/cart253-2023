/**
 * kill-the-garden
 * Luca Sabelli
 * 
 */

"use strict";

//This variable is to determine the state of the game
let state = "title";

//This variable is to check if there is any flowers left
let count = 0;

//This is the player object, the health property is to check when the player dies 
let player = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 5,
  width: 150,
  height: 150,
  health: 800,
  img: undefined,
};

//This variable is for the parking lot ending screen
let bg = {
  x: 0,
  y: 0,
  img: undefined 
};

//The garden variable contains all the elements in our garden
let garden = {
  //This is the array that contains our flowers
  flowers: [],
  //This variable determines the number of flowers on screen
  numFlowers: 50,
  //This array contains all our bee objects
  bees: [],
  //This variable determines the number of bees on screen
  numBees: 10,
  //This array contains all our bunny objects
  bunnies: [],
  //This variable determines the number of bunnies
  numBunnies: 4,
  //This variable sets the color of the background for my simulation
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};


//In the preload function, I am loading all the images that will be used in the game
function preload() {
  player.img = loadImage("assets/images/construction_guy.png");
  bg.img = loadImage("assets/images/parkinglot1.jpeg")
}


//In the set up function, I am creating the canvas for the game, setting the player's initial position, and creating all of the gardens objects in the proper arrays. 
function setup() {
  createCanvas(windowWidth, windowHeight);
  player.x = width/2;
  player.y = height/2;
  
  //This for loop creates the flowers by counting up to the number of the flowers variable 
  for (let i = 0; i < garden.numFlowers; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255)
    };
    //Now I am using the class of our flower object and assigning it to a variable
    let flower = new Flower(x, y, size, stemLength, petalColor);
    //This line then adds our new flower object to our array 
    garden.flowers.push(flower);
  }

  //This for loop is doing the exact same thing as the previous one, but for the bees
  for (let i = 0; i < garden.numBees; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let bee = new Bee(x, y);
    garden.bees.push(bee);
  }
  
  //This for loop is doing the same as the other two, but for our bunny objects
  for (let i = 0; i < garden.numBunnies; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let bunny = new Bunny(x, y);
    garden.bunnies.push(bunny);
  }
}

//The draw() function is switching the states of our game
//The count variable is set at 0 at the top of this function so that the game will constantly check if there are any flowers left displayed
function draw() {
  count = 0;
  if(state === "title") {
    title();
  }
  else if(state === "simulation") {
    simulation();
  }
  else if(state === "end1") {
    end1();
  }
  else if(state === "end2") {
    end2();
  }
}


//In the title function, I am setting a simple opening screen for the game using text
function title() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("Kill the Garden Simulator", width/2, height/2);
  textSize(50);
  text("press any key to start", width/1.5, height/1.5);
}


//In the simulation function, I am setting the background color to the designated grass variable and calling all the necessary functions for the game
function simulation() {
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);
  makeBee();
  makeFlower();
  makeBunny();
  displayPlayer();
  playerMove();
  playerMovementX();
  playerMovementY();
  playerDeath();
  playerHealth();
  playerWins();
}


//In the end1 function, I am making a simple ending for when the player runs out of health due to bees.
function end1() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("YA GOT STUNG", width/2, height/2);
}


//In this end2 function, I am changing the background of the screen to a parking lot and displaying a message and player character
function end2() {
  noStroke();
  imageMode(CENTER, CENTER);
  image(bg.img, width / 2, height / 2, width, height);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("Congratulations, you've made a brand new parking lot!", width/2, height/2);
  displayPlayer();
}


//In this function, I am displaying and shrinking the flower using a couple another function created in the class
function makeFlower() {
  //This for loop displays the number of flowers in our array and counts 1 for each flower being displayed if it's alive
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    if (flower.alive) {
      flower.display();
      count += 1; 
    }
    //This section is determining if the player is touching the flower and then shrinking the flower if so
    let d = dist(player.x, player.y, flower.x, flower.y);
    if (d < player.width / 2 + flower.size / 2 || d < player.height / 2 + flower.size / 2){
    flower.shrink();
    } 
  }
}

//This function is doing something similar to the makeFlower() function but with a few additional functions in the class such as move()
function makeBee() {
  //This for loop is doing the exact same as the previous one for the flower, but it is not counting every time a bee is made
  //It is also shrinking the bee constantly as opposed to when the player is touching.
  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    if (bee.alive) {
      // Update the bee by shrinking, moving and displaying it
      bee.shrink();
      bee.move();
      //This for loop is checking if the bees are touching the flower and then applying a new function from the bee class
      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        bee.tryToPollinate(flower);
      }
      //This section of the code checks if the bee is touching our player and then reducing the players health if so
      let d = dist(player.x, player.y, bee.x, bee.y);
      if(d < player.width / 2.5 + bee.size / 2 || d < player.height / 2.5 + bee.size / 2) {
        player.health += -5;
      }
      //Display the bee
      bee.display();
    }
  }
}


//This function is doing something very similar to the previous two but with one addition
function makeBunny() {
  //This for loop is doing the same as the previous one for the bee
  for (let i = 0; i < garden.bunnies.length; i++) {
    let bunny = garden.bunnies[i];
    if (bunny.alive) {
      bunny.display();
      bunny.move();
      
      //This section is determining if the player is touching the bunnies, if so it adds additional health to our player
      let d = dist(player.x, player.y, bunny.x, bunny.y);
      if(d < player.width / 2 + bunny.size / 2 || d < player.height / 2 + bunny.size / 2) {
        player.health += 100;
        bunny.alive = false;
      }
    }
  }
}


//This function checks if the player hits any key to change the state of our game from title to simulation
function keyPressed() {
  if(state === "title") {
      state = "simulation";
  }
}


//This function displays our character image
function displayPlayer() {
  noStroke();
  imageMode(CENTER, CENTER);
  image(player.img, player.x, player.y, player.width, player.height);
}


//This function changes our player position depending on our x and y velocities 
function playerMove() {
  player.x += player.vx;
  player.y += player.vy;
}


//This function changes the players x velocity depending on the key they press
function playerMovementX() {
  //This if statement is checking if the player is hitting the a key, then moves the player to the left
  if(keyIsDown(65)) {
    player.vx = -player.speed;
  }
  //This is checking the d key then moves player to the right 
  else if (keyIsDown(68)) {
    player.vx = player.speed;
  }
  //This resets the velocity so the user has to hold the key to move the character in the desired direction
  else {
    player.vx = 0;
  }
  //This part constrains our player's movement to the window 
  player.x = constrain(player.x, 0, width);
}


//This function changes the y velocity to allow vertical movement, similar to the last function
function playerMovementY() {
  //This is the W key and moves player up
  if (keyIsDown(87)) {
    player.vy = -player.speed;
  }
  //This is S key and moves player down
  else if (keyIsDown(83)) {
    player.vy = player.speed;
  }
  //This resets y velocity 
  else {
    player.vy = 0;
  }
  //Constrains players movement to window
  player.y = constrain(player.y, 0, height);
}


//This function changes the state of the game to end1 if the player dies
function playerDeath() {
  //Checks if player has lost all health 
  if(player.health <= 0) {
    state = "end1";
  }
}


//This function displays our player's health at the bottom right of the screen so the user can keep track
function playerHealth() {
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("Health:" + player.health, width - 100, height - 100);
}


//This function changes the state of my game to end2 if the player wins
function playerWins() {
  //If the count is 0, then there are no remaining alive flowers on screen
  if(count === 0) {
    state = "end2";
  }
}