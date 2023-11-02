/**
 * kill-the-garden
 * Luca Sabelli
 * 
 */

"use strict";

//
let state = "title";

let isAlive = true;

let count = 0;

let player = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 5,
  width: 150,
  height: 150,
  health: 1000,
  img: undefined,
};

let bg = {
  x: 0,
  y: 0, 

}

let garden = {
  //
  flowers: [],
  //
  numFlowers: 50,

  bees: [],
  //
  numBees: 10,
  //
  bunnies: [],

  numBunnies: 4,
  
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};


function preload() {
  player.img = loadImage("assets/images/construction_guy.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  player.x = width/2;
  player.y = height/2;
  
  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255)
    }
    // Create a new flower using the arguments
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }

  for (let i = 0; i < garden.numBees; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new bee using the arguments
    let bee = new Bee(x, y);
    // Add the bee to the array of bees
    garden.bees.push(bee);
  }
  
  for (let i = 0; i < garden.numBunnies; i++) {
    //
    let x = random(0, width);
    let y = random(0, height);
    // 
    let bunny = new Bunny(x, y);
    // 
    garden.bunnies.push(bunny);
  }
}

// draw()
// Displays our flowers
function draw() {
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


function title() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("Kill the Garden Simulator", width/2, height/2);
  textSize(50);
  text("press any key to start", width/1.5, height/1.5);
}


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


function end1() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("YA GOT STUNG", width/2, height/2);
}


function end2() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("end2", width/2, height/2);
}


function makeFlower() {
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    if (flower.alive) {
      flower.display();
    }
    let d = dist(player.x, player.y, flower.x, flower.y);
    if (d < player.width / 2 + flower.size / 2 || d < player.height / 2 + flower.size / 2){
    flower.shrink();
    } 
  }
}


function makeBee() {
  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    // Check if this bee is alive
    if (bee.alive) {
      // Update the bee by shrinking, moving and displaying it
      bee.shrink();
      bee.move();
      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        bee.tryToPollinate(flower);
      }
      let d = dist(player.x, player.y, bee.x, bee.y);
      if(d < player.width / 3 + bee.size / 2 || d < player.height / 3 + bee.size / 2) {
        player.health += -5;
      }
      // Display the bee
      bee.display();
    }
  }
}


function makeBunny() {
  for (let i = 0; i < garden.bunnies.length; i++) {
    let bunny = garden.bunnies[i];
    // Check if this bee is alive
    if (bunny.alive) {
      // Update the bee by shrinking, moving and displaying it
      bunny.display();
      bunny.move();
      let d = dist(player.x, player.y, bunny.x, bunny.y);
      if(d < player.width / 2 + bunny.size / 2 || d < player.height / 2 + bunny.size / 2) {
        player.health += 100;
        bunny.alive = false;
      }
    }
  }
}


function keyPressed() {
  if(state === "title") {
      state = "simulation";
  }
}


function displayPlayer() {
  noStroke();
  imageMode(CENTER, CENTER);
  image(player.img, player.x, player.y, player.width, player.height);
}


function playerMove() {
  player.x += player.vx;
  player.y += player.vy;
}


function playerMovementX() {
  if(keyIsDown(65)) {
    player.vx = -player.speed;
  }
  else if (keyIsDown(68)) {
    player.vx = player.speed;
  }

  else {
    player.vx = 0;
  } 
}


function playerMovementY() {
  if (keyIsDown(87)) {
    player.vy = -player.speed;
  }
  else if (keyIsDown(83)) {
    player.vy = player.speed;
  }
  else {
    player.vy = 0;
  }
}


function playerDeath() {
  if(player.health <= 0) {
    state = "end1";
  }
}

function playerHealth() {
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("Health:" + player.health, width - 100, height - 100);
}


function playerWins() {
  for(let j of garden.flowers) {
    if(j.alive){
      isAlive = true;
      count = 100
    }
    else{
      isAlive = false;
      count += -1
    }
  }
  if(isAlive === false && count <= 0){
    state = "end2";
  }
}