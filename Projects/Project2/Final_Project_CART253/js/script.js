/**
 * Instrument Simulator Prototype
 * Luca Sabelli
 * 
 */

"use strict"

//This changes the state of the simulator to the different instruments, title screen and selection menu
let state = "title";

//This tracks if the user is dragging the mouse
let isDragging;

//This tracks the state of the drums to stop the sound from repeating
let dKit;

//This variable stores the random selection of the drum songs
let drumSong = undefined;

//This allows the program to keep track if a song is being played or not
let drumSongPlayed = false;

//This allows the program to keep track if the song has been stopped
let drumSongPaused = false;

//This variable stops the song from being played repeatedly
let songOn = false;

//The angle variable allows the drum stick to rotate
let angle1 = 50;

//This variable contains the array of choir boys for the top row
let choirRow1 = [];

//Same thing as before but for the middle row 
let choirRow2 = [];

//Same thing as before but for the bottom row
let choirRow3 = [];

//This determines the amount of choir bows for the first row
let numChoirBoys1 = 20;

//Same thing but for the second row
let numChoirBoys2 = 19;

//Same thing but for the third row
let numChoirBoys3 = 18;

//This variable contains the one of the choir sounds
let choirV1 = undefined;

//This variable contains the other choir sound
let choirV2 = undefined;

//This variable keeps track of the selection for the choir sound
let choirSound = undefined;

//Contains the background for the choir simulator
let choirBG = undefined;

//Contains the image of the robe for the choir 
let choirRobe = undefined;

//Contains image of closed eyes for choir
let choirClosedEyes = undefined;

//Contains images of open eyes for choir
let choirOpenEyes = undefined;

//Array of images for choir hair
let choirHair = [];

//Variable that keeps track of the random selection of hair type for the choir
let choirHairPick;

//Keeps the map of rate for the choir to change pitch
let pitch;

//Keeps the map of the pan for the choir
let path;

//This variable becomes the oscillator for the theremin instrument
let theremin;

//This keeps track if the theremin is playing or not for the mini-game
let thereminOn = false;

//This keeps the map of the amplitude for the theremin
let amplitude;

//This variable keeps track of what wave is selected 
let wave = "sine";

//This variable keeps track of the count for the theremin game
let gameCount = 0;

//Checks if the game is currently on
let gameOn = false;

//Contains the sound effect for winning the game
let gameWinSFX = undefined;

//Contains the sound effect for touching the circles in the game 
let gameSFX = undefined;

//Stops the winning sound effect for repeatedly playing 
let noLoop = false;

//Object of choir song selection button
let choirV1Button = {
    x: 0,
    y: 0,
    size: 50, 
    fill: 200,
};

//Same thing as before but for the other song
let choirV2Button = {
    x: 0,
    y: 0,
    size: 50, 
    fill: 200,
};

//Object for the base of the theremin
let thereminBase = {
    x: 0, 
    y: 0, 
    width: 600, 
    height: 60,
    fill: 175
};

//Object for the rod of the theremin
let thereminRod = {
    x: 0, 
    y: 0, 
    width: 20, 
    height: 550, 
    fill: 210
};

//Object for the sin wave image on the theremin base 
let sineButton = {
    x: 0, 
    y: 0,
    size: 50,  
    width: 50, 
    height: 50, 
    img: undefined
};

//Object for the triangle wave image
let triangleButton = {
    x: 0, 
    y: 0,
    size: 50, 
    width: 75, 
    height: 75, 
    img: undefined
};

//Object for the square wave image
let squareButton = {
    x: 0, 
    y: 0,
    size: 50, 
    width: 75, 
    height: 75, 
    img: undefined
};

//Object for the sawtooth wave image
let sawtoothButton = {
    x: 0, 
    y: 0,
    size: 50, 
    width: 75, 
    height: 75, 
    img: undefined
};

//Object for the button where all the wave images are on 
let thereminCircle = {
    x: 0, 
    y: 0, 
    size: 50, 
    fill: {
        r: 255, 
        g: 0, 
        b: 0, 
    minSize: 5,
    sizeRed: 5
    }
};

//Object for the hand image in the theremin instrument
let thereminHand = {
    x: 0,
    y: 0, 
    width: 120,
    height: 80,
    img: undefined
};

//Object for selecting drum kit in selection menu
//Image property for the selection menu
let drumSelect = {
    x: 0, 
    y: 0, 
    width: 250,
    height: 200,
    img: undefined
};

//Same thing as before but for the theremin
let thereminSelect = {
    x: 0,
    y: 0, 
    width: 250,
    height: 200,
    img: undefined
};

//Same thing as before but for the choir
let choirSelect = {
    x: 0, 
    y: 0, 
    width: 250,
    height: 200,
    img: undefined
};

//This object is to start the drum songs to play along to
//The array will contain all the songs and will be selected at random when clicking the image for the drum song select
let drumSongSelect = {
    x: 0, 
    y: 0,
    width: 60,
    height: 60,
    sound: [],
    img: undefined
};

//Object to stop drum song and image property to load image for stop button
let drumPlayButton = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    fill: 200,
    img: undefined
};

//This object is the drum stick that follows the users mouse
let drumStick = {
    x: 0,
    y: 0, 
    width: 100, 
    height: 100, 
};

//Object for the big drum and the sound property is to define the sound that will play when clicked
//The isOn property is to stop the sound from constantly playing in the draw function
let drum1 = {
    x: 0, 
    y: 0,
    size: 300,
    fill: 100,
    sound: undefined,
    isOn: false,
};

//Similar to the object above, but for the smaller drum
let drum2 = {
    x: 0, 
    y: 0, 
    size: 200, 
    fill: 100, 
    sound: undefined,
    isOn: false,
};

//Once again, similar to the other drum objects but slightly bigger
let drum3 = {
    x: 0, 
    y: 0, 
    size: 250, 
    fill: 100, 
    sound: undefined,
    isOn: false,
};

//Smallest drum out of them all
let drum4 = {
    x: 0, 
    y: 0, 
    size: 180, 
    fill: 100, 
    sound: undefined,
    isOn: false,
};

//Cymbal with almost the same properties as the drum objects, but with a different fill for the yellow
let cymbal1 = {
    x: 0,
    y: 0,
    size: 200,
    fill: {
        r: 255,
        g: 215,
        b: 10,
    },
    sound: undefined,
    isOn: false,
};

//Same as object above but bigger
let cymbal2 = {
    x: 0,
    y: 0,
    size: 250,
    fill: {
        r: 255,
        g: 215,
        b: 10,
    },
    sound: undefined,
    isOn: false,
};

//Exact same as the drum objects but with width and height because it is a rectangle 
let bass = {
    x: 0, 
    y: 0,
    width: 250,
    height: 300,
    fill: 100,
    sound: undefined,
    isOn: false,
};

//Kick for the base, but with a y1 initial position so that the small square inside the kick can move
let kick = {
    x: 0,
    y1: 0, 
    y: 0, 
    width: 50,
    height: 120
};


//Here we are pre loading all the sounds and images that will be used 
function preload () {
    drum1.sound = loadSound("assets/sounds/drum1.1.mp3");
    drum1.sound.loop = false; //ensures the sound doesn't loop
    cymbal1.sound = loadSound("assets/sounds/snare1.mp3");
    drum2.sound = loadSound("assets/sounds/drum2.mp3");
    drum3.sound = loadSound("assets/sounds/drum3.mp3");
    drum4.sound = loadSound("assets/sounds/drum4.mp3");
    cymbal2.sound = loadSound("assets/sounds/cymbal2.mp3");
    bass.sound = loadSound("assets/sounds/bass.mp3");
    drumSongSelect.sound[0] = loadSound("assets/sounds/jazz1.mp3");
    drumSongSelect.sound[1] = loadSound("assets/sounds/funk1.mp3");
    drumSongSelect.sound[2] = loadSound("assets/sounds/rock1.mp3");
    drumSongSelect.sound[3] = loadSound("assets/sounds/prog1.mp3");
    drumSongSelect.sound[4] = loadSound("assets/sounds/bossanova1.mp3");
    choirV1 = loadSound("assets/sounds/choir3.mp3");
    choirV2 = loadSound("assets/sounds/choir.v2.mp3");
    gameSFX = loadSound("assets/sounds/game1.mp3");
    gameWinSFX = loadSound("assets/sounds/gameWin1.mp3");
    drumSelect.img = loadImage("assets/images/drumKitImage.png");
    thereminSelect.img = loadImage("assets/images/thereminKit.png");
    choirSelect.img = loadImage("assets/images/choirKit.png");
    choirHair[0]= loadImage("assets/images/hair1.png");
    choirHair[1] = loadImage("assets/images/hair2.png");
    choirHair[2] = loadImage("assets/images/hair3.png");
    choirHair[3] = loadImage("assets/images/hair4.png");
    sineButton.img = loadImage("assets/images/sinewave1.png");
    triangleButton.img = loadImage("assets/images/triangleWave1.png");
    squareButton.img = loadImage("assets/images/squarewave1.png");
    sawtoothButton.img = loadImage("assets/images/sawtoothwave1.png");
    drumStick.img = loadImage("assets/images/images/drumstick1.webp");
    drumSongSelect.img = loadImage("assets/images/playButton1.png");
    drumPlayButton.img = loadImage("assets/images/stopButton1.png");
    thereminHand.img = loadImage("assets/images/hand2.png");
    choirBG = loadImage("assets/images/choirBG.jpg");
    choirRobe = loadImage("assets/images/robe2.png");
    choirClosedEyes = loadImage("assets/images/choir_closedeyes.png");
    choirOpenEyes = loadImage("assets/images/choir_openEyes.png");
}


//In the set up i am setting the initial location of all my objects and creating my array of choir boys
//I'm creating a canvas as well as selecting an initial random song for the drums
function setup() {
    createCanvas(1000, 700);
    
    choirV1Button.x = 50;
    choirV1Button.y = height - 50;
    choirV2Button.x = width - 50;
    choirV2Button.y = height - 50;
     
    
    drumSelect.x = width * (1/6);
    drumSelect.y = height/2;

    thereminSelect.x = width / 2;
    thereminSelect.y = height / 2;

    choirSelect.x = width * (5/6);
    choirSelect.y = height/2;

    choirSound = choirV1; //here we are setting an initial choir sound 

    drum1.x = width/2 + 300;
    drum1.y = height/2 + 100;

    cymbal1.x = width - 250;
    cymbal1.y = height - 500;

    drum2.x = width/2 + 150;
    drum2.y = height/2 - 100;

    drum3.x = width/2 - 250;
    drum3.y = height/2 + 100;

    drum4.x = width/2 - 150;
    drum4.y = height/2 - 100;

    cymbal2.x = width/2 - 300;
    cymbal2.y = height - 500;

    bass.x = width/2;
    bass.y = height/2 - 100;

    kick.x = width/2;
    kick.y = height/2 + 120;
    kick.y1 = kick.y;

    drumSongSelect.x = 400;
    drumSongSelect.y = 630;
    drumPlayButton.x = 600;
    drumPlayButton.y = 630;

    let x1 = 25;
    let y1 = 150;
    let x2 = 50;
    let y2 = 250;
    let x3 = 75;
    let y3 = 350;

    thereminCircle.x = random(200, 800); //setting an initial x position for the theremin game circles
    thereminCircle.y = random(100, 600); //same thing but for the y position

    userStartAudio();
    theremin = new p5.Oscillator(0, wave); //sets the theremin as an oscillator
    amplitude = new p5.Amplitude(); //sets amplitude property for theremin
    thereminBase.x = width/2;
    thereminBase.y = height - 50;
    thereminRod.x = thereminBase.x + 290;
    thereminRod.y = thereminBase.y - 305;
    sineButton.x = thereminBase.x - 250;
    sineButton.y = thereminBase.y - 25;
    triangleButton.x = thereminBase.x - 125;
    triangleButton.y = thereminBase.y - 35;
    squareButton.x = thereminBase.x;
    squareButton.y = thereminBase.y - 35;
    sawtoothButton.x = thereminBase.x + 125;
    sawtoothButton.y = thereminBase.y - 35;

    for(let i = 0; i < numChoirBoys1; i++) {
        choirHairPick = random(choirHair); //sets random hair image to give a little more uniqueness
        let choirBoy1 = new Choir(x1, y1, choirRobe, choirHairPick, choirClosedEyes, choirOpenEyes);
        choirRow1.push(choirBoy1);
        x1 += 50; //pushes x position for the next choir boy
    }

    for(let j = 0; j < numChoirBoys2; j++) {
        choirHairPick = random(choirHair);
        let choirBoy2 = new Choir(x2, y2, choirRobe, choirHairPick, choirClosedEyes, choirOpenEyes);
        choirRow2.push(choirBoy2);
        x2 += 50;
    }

    for(let z = 0; z < numChoirBoys3; z++) {
        choirHairPick = random(choirHair);
        let choirBoy3 = new Choir(x3, y3, choirRobe, choirHairPick, choirClosedEyes, choirOpenEyes);
        choirRow3.push(choirBoy3);
        x3 += 50;
    }

    drumSong = random(drumSongSelect.song); //sets initial drum song 
}

//In the draw function, I am switching the states of the simulation as well as printing the state in the command 
function draw() {
    print(state);
    if (state === "title") {
        title();
    }
    else if (state === "simulation") {
        simulation();
    }
    else if (state === "drum kit") {
        drumKit();
    }
    else if (state === "theremin") {
        thereminPick();
    }
    else if (state === "choir") {
        choirPick();
    }
}


//In here we have all the overlap checking for the drum kit and selection menu
//I am also changing the theremin oscillator wave type as well as changing the choir song  
function mousePressed() {
    let d1 = dist(mouseX, mouseY, drum1.x, drum1.y);
    let d2 = dist(mouseX, mouseY, cymbal1.x, cymbal1.y);
    let d3 = dist(mouseX, mouseY, drum2.x, drum2.y);
    let d4 = dist(mouseX, mouseY, drum3.x, drum3.y);
    let d5 = dist(mouseX, mouseY, drum4.x, drum4.y);
    let d6 = dist(mouseX, mouseY, cymbal2.x, cymbal2.y);
    let d7 = dist(mouseX, mouseY, bass.x, bass.y);
    let d8 = dist(mouseX, mouseY, drumSelect.x, drumSelect.y);
    let d9 = dist(mouseX, mouseY, choirSelect.x, choirSelect.y);
    let d10 = dist(mouseX, mouseY, sineButton.x + 25, sineButton.y + 25);
    let d11 = dist(mouseX, mouseY, triangleButton.x + 38, triangleButton.y + 35);
    let d12 = dist(mouseX, mouseY, squareButton.x + 38, squareButton.y + 35);
    let d13 = dist(mouseX, mouseY, sawtoothButton.x + 38, sawtoothButton.y + 35);
    let d14 = dist(mouseX, mouseY, thereminSelect.x, thereminSelect.y);
    let d15 = dist(mouseX, mouseY, choirV1Button.x, choirV1Button.y);
    let d16 = dist(mouseX, mouseY, choirV2Button.x, choirV2Button.y);
    let d17 = dist(mouseX, mouseY, drumPlayButton.x, drumPlayButton.y);
    let d18 = dist(mouseX, mouseY, drumSongSelect.x, drumSongSelect.y);

    //If user is holding mouse down, theremin sound starts 
    if(state === "theremin") {
        theremin.start();
        thereminOn = true;
    }

    //Plays the drum audio once by changing the isOn variable as well as shrinks the object slightly for more interactivity
    //It also changes the angle of the drum stick as well as sets the dKit to the state the drum that has been clicked
    if(d1 < drum1.size / 2 && state === "drum kit") {
        if(!drum1.isOn){
            drum1.sound.play();
            drum1.isOn = true;
            drum1.size = drum1.size - 10;
            dKit = "drum1";
            angle1 = 110;
        }
    }

    //Same as if statement above
    if(d2 < cymbal1.size / 2 && state === "drum kit") {
        if(!cymbal1.isOn) {
            cymbal1.sound.play();
            cymbal1.isOn = true;
            dKit = "cymbal1";
            cymbal1.size += -10;
            angle1 = 110;
        }

    }

    //Same as if statement above
    if(d3 < drum2.size / 2 && state === "drum kit" && d2 > cymbal1.size / 2) {
        if(!drum2.isOn) {
            drum2.sound.play();
            drum2.isOn = true;
            drum2.size += -10;
            dKit = "drum2";
            angle1 = 110;
        }
    }

    //Same as if statement above
    if(d4 < drum3.size / 2 && state === "drum kit") {
        if(!drum3.isOn) {
            drum3.sound.play();
            drum3.isOn = true;
            drum3.size += -10;
            dKit = "drum3";
            angle1 = 110;
        }
    }
    
    //Same as if statement above
    if(d5 < drum4.size / 2 && state === "drum kit" && d6 > cymbal2.size / 2) {
        if(!drum4.isOn) {
            drum4.sound.play();
            drum4.isOn = true;
            drum4.size += -10;
            dKit = "drum4";
            angle1 = 110;
        }
    }

    //Same as if statement above
    if(d6 < cymbal2.size / 2 && state === "drum kit") {
        if(!cymbal2.isOn) {
            cymbal2.sound.play();
            cymbal2.isOn = true;
            dKit = "cymbal2";
            cymbal2.size += -10;
            angle1 = 110;
        }
    }
 
    //Same as if statement above but instead of changing the angle of rotation for the drum stick, it changes the position of the square in the kick for the bass
    if((d7 < bass.width / 2 || d7 < bass.height / 2) && state === "drum kit" && d3 > drum2.size / 2 && d5 > drum4.size / 2) {
        if(!bass.isOn) {
            bass.sound.play();
            bass.isOn = true;
            dKit = "bass";
            kick.y1 += -70;  
        }
    }

    //Drum select in the selection menu changes the state when clicked
    if((d8 < drumSelect.height / 2 || d8 < drumSelect / 2) && state === "simulation") {
        state = "drum kit";
    }

    //Same thing as above but changes the state to choir
    if((d9 < choirSelect.height / 2 || d9 < choirSelect.width / 2) && state === "simulation") {
        state = "choir";
    }

    //Changes wave type to sine for theremin and wave string to display what the current wave is
    if(d10 < sineButton.size / 2 && state === "theremin") {
        theremin.setType('sine');
        wave = "sine";
    }
    
    //Same thing as above but for triangle wave
    if(d11 < triangleButton.size / 2 && state === "theremin") {
        theremin.setType("triangle");
        wave = "triangle";
    }
    
    //Same thing as above but for square wave
    if(d12 < squareButton.size / 2 && state === "theremin") {
        theremin.setType('square');
        wave = "square";
    }
    
    //Same thing as above but for sawtooth wave
    if(d13 < sawtoothButton.size / 2 && state === "theremin") {
        theremin.setType('sawtooth');
        wave = "sawtooth";
    }

    //Same thing as the drum and choir select but changes the state to theremin
    if((d14 < thereminSelect.width / 2 || d14 < thereminSelect.height / 2) && state === "simulation") {
        state = "theremin";
    }

    //Changes the choir song when clicked 
    if(d15 < choirV1Button.size / 2 && state === "choir") {
        choirSound = choirV1;
    }

    //Same thing as before but for other choir song
    if(d16 < choirV2Button.size / 2 && state === "choir") {
        choirSound = choirV2;
    }

    //This sets the drum song played to true to start an if statement that will be seen later
    if((d18 < drumSongSelect.width / 2 || d18 < drumSongSelect.height / 2) && state === "drum kit") {    
        drumSongPlayed = true;
    }
    
    //This sets the drum song paused to true for a later if statement and the songOn to false to stop looping of the songs
    if((d17 < drumPlayButton.width / 2 || d17 < drumPlayButton.height / 2) && state === "drum kit") {
        drumSongPaused = true;
        songOn = false;
    } 

}


//This function checks when the user releases the mouse
function mouseReleased() {
    //Depending on the state of the dKit, it stops the drum sound from looping and allows the user replay it by changing the isOn property
    //It also regrows the drum size and resets the drum stick angle
    if(dKit === "drum1") {
        if(drum1.isOn){
            drum1.isOn = false;
            drum1.size = drum1.size + 10;
            angle1 = 50;
        }
    }

    //Same thing as above but for cymbal
    if(dKit === "cymbal1") {
        if(cymbal1.isOn){
            cymbal1.isOn = false;
            cymbal1.size += 10;
            angle1 = 50;
        }
    }

    //Same thing as above but for drums
    if(dKit === "drum2") {
        if(drum2.isOn){
            drum2.isOn = false;
            drum2.size += 10;
            angle1 = 50;
        }
    }

    //Same thing as above 
    if(dKit === "drum3") {
        if(drum3.isOn){
            drum3.isOn = false;
            drum3.size += 10;
            angle1 = 50;
        }
    }

    //Same thing as above
    if(dKit === "drum4") {
        if(drum4.isOn){
            drum4.isOn = false;
            drum4.size += 10;
            angle1 = 50;
        }
    }

    //Same thing as above
    if(dKit === "cymbal2") {
        if(cymbal2.isOn){
            cymbal2.isOn = false;
            cymbal2.size += 10;
            angle1 = 50;
        }
    }

    //Same thing as above but instead of regrowing bass it resets the position of bass kick square
    if(dKit === "bass") {
        if(bass.isOn) {
            bass.isOn = false;
            kick.y1 += 70
        }
    }

    //This stops the theremin sound when the mouse is released 
    if(state === "theremin") {
        theremin.stop();
        thereminOn = false;
    }
}


//This function allows our program to know when any key is pressed.
//This allows the user to switch between states using the arrow keys
function keyPressed() {
    //Depending on the state, this long if statement changes the states depending on the arrow key pressed
    if(state === "title") {
        state = "simulation";
    }
    else if(keyCode === RIGHT_ARROW && state === "simulation") {
        state = "drum kit";
    }
    else if(keyCode === RIGHT_ARROW && state === "drum kit") {
        state = "theremin";
    }
    else if(keyCode === RIGHT_ARROW && state === "theremin") {
        state = "choir";
    }
    else if(keyCode === RIGHT_ARROW && state === "choir") {
        state = "drum kit";
    }
    else if(keyCode === LEFT_ARROW && state === "simulation") {
        state = "choir";
    }
    else if(keyCode === LEFT_ARROW && state === "drum kit") {
        state = "choir";
    }
    else if(keyCode === LEFT_ARROW && state === "theremin") {
        state = "drum kit";
    }
    else if(keyCode === LEFT_ARROW && state === "choir") {
        state = "theremin";
    }
    //This section is to make the choir sound start when the user hits the space bar and loops the sound so it is continuous  
    else if(keyCode === 32 && state === "choir") {
        isDragging = true;
        if(!choirSound.isPlaying() && state === "choir") {
                choirSound.loop();
        }
        
    }
    //This section is to start the theremin game when the user hits the enter key and resets the score so you can replay the game
    else if(keyCode === 13 && state === "theremin") {
        gameOn = true;
        gameCount = 0;
    }
}


//This function checks when the user releases a key for the choir sound
function keyReleased() {
    //When the user lets go of the space bar, the choir sound stops 
    if(keyCode === 32 && state === "choir") {
        isDragging = false;
        choirSound.stop();
    }
}


//Displays box to choose drum kit using a screenshot of the drum kit simulation 
function displayDrumSelection() {
    noStroke();
    imageMode(CENTER);
    image(drumSelect.img, drumSelect.x, drumSelect.y, drumSelect.width, drumSelect.height);
}


//Same thing as above but for the theremin selection
function displayThereminSelect() {
    noStroke();
    imageMode(CENTER);
    image(thereminSelect.img, thereminSelect.x, thereminSelect.y, thereminSelect.width, thereminSelect.height);
}


//Same thing as above but for the choir selection
function displayChoirSelection() {
    noStroke();
    imageMode(CENTER);
    image(choirSelect.img, choirSelect.x, choirSelect.y, choirSelect.width, choirSelect.height);
}


//Displays large drum in drum kit
function displayDrum1() {
    noStroke();
    fill(drum1.fill);
    ellipseMode(CENTER);
    ellipse(drum1.x, drum1.y, drum1.size);
    fill(200);
    ellipse(drum1.x, drum1.y, drum1.size - 20);
}


//Same thing as above but for smaller drum
function displayDrum2() {
    noStroke();
    fill(drum2.fill);
    ellipseMode(CENTER);
    ellipse(drum2.x, drum2.y, drum2.size);
    fill(200);
    ellipse(drum2.x, drum2.y, drum2.size - 20);
}


//Same thing as above but for another drum
function displayDrum3() {
    noStroke();
    fill(drum3.fill);
    ellipseMode(CENTER);
    ellipse(drum3.x, drum3.y, drum3.size);
    fill(200);
    ellipse(drum3.x, drum3.y, drum3.size - 20);
}


//Same thing as above but for another drum
function displayDrum4() {
    noStroke();
    fill(drum4.fill);
    ellipseMode(CENTER);
    ellipse(drum4.x, drum4.y, drum4.size);
    fill(200);
    ellipse(drum4.x, drum4.y, drum4.size - 20);
}


//Displays cymbal in drum kit
function displayCymbal1() {
    noStroke();
    fill(cymbal1.fill.r, cymbal1.fill.g, cymbal1.fill.b);
    ellipse(cymbal1.x, cymbal1.y, cymbal1.size);
    fill(0);
    ellipse(cymbal1.x, cymbal1.y, cymbal1.size / 20);
}


//Same thing as above but for other symbol
function displayCymbal2() {
    noStroke();
    fill(cymbal2.fill.r, cymbal2.fill.g, cymbal2.fill.b);
    ellipse(cymbal2.x, cymbal2.y, cymbal2.size);
    fill(0);
    ellipse(cymbal2.x, cymbal2.y, cymbal2.size / 20);
}


//Displays bass in drum kit using a rectangle instead of ellipse like other objects
function displayBass() {
    noStroke();
    fill(bass.fill);
    rectMode(CENTER);
    rect(bass.x, bass.y, bass.width, bass.height);
    fill(255, 0, 0);
    rect(bass.x, bass.y, bass.width, bass.height - 20);
}


//Displays the kick for the bass and a smaller rectangle as the tip of the kick 
function displayBassKick() {
    noStroke();
    fill(100);
    rectMode(CENTER);
    rect(kick.x, kick.y, kick.width, kick.height);
    fill(255);
    rect(kick.x, kick.y1 + 20, kick.width - 20, kick.height - 90);
}


//Displays the play button image for the random song selection in the drum kit
function displaySongSelect() {
    noStroke();
    imageMode(CENTER);
    image(drumSongSelect.img, drumSongSelect.x, drumSongSelect.y, drumSongSelect.width, drumSongSelect.height);
}


//Displays the stop button for the drum kit (i know the name is confusing i had other intentions for it at first lol)
function displayDrumPlayButton() {
    noStroke();
    imageMode(CENTER);
    image(drumPlayButton.img, drumPlayButton.x, drumPlayButton.y, drumPlayButton.width, drumPlayButton.height);
}


//This function displays the drum stick and makes the x and y position follow the mouse
//It also removes the cursor and rotates the stick depending on angle1
function displayDrumStick() {
    noCursor();
    drumStick.x = mouseX;
    drumStick.y = mouseY;
    angleMode(DEGREES);
    noStroke();
    translate(drumStick.x, drumStick.y);
    rotate(angle1);
    fill(200, 87, 51);
    ellipse(0, 80, drumStick.width - 90, drumStick.height + 80);
    ellipse(0, -15, drumStick.width - 88);
}


//This function displays the theremin object 
function displayTheremin() {
    //Theremin Base
    push();
    noStroke();
    rectMode(CENTER);
    fill(thereminBase.fill);
    rect(thereminBase.x, thereminBase.y, thereminBase.width, thereminBase.height);
    pop();
  
    //Theremin Rod
    push();
    noStroke();
    rectMode(CENTER);
    fill(thereminRod.fill);
    rect(thereminRod.x, thereminRod.y, thereminRod.width, thereminRod.height);
  
    //All the buttons 
    fill(255);
    ellipse(sineButton.x + 25, sineButton.y + 25, sineButton.size);
    ellipse(triangleButton.x + 38, triangleButton.y + 35, triangleButton.size);
    ellipse(squareButton.x + 38, squareButton.y + 35, squareButton.size);
    ellipse(sawtoothButton.x + 38, sawtoothButton.y + 35, sawtoothButton.size);
  
    //All the images on the buttons
    imageMode(CORNER);
    image(sineButton.img, sineButton.x, sineButton.y, sineButton.width, sineButton.height);
    image(triangleButton.img, triangleButton.x, triangleButton.y, triangleButton.width, triangleButton.height);
    image(squareButton.img, squareButton.x, squareButton.y, squareButton.width, squareButton.height);
    image(sawtoothButton.img, sawtoothButton.x, sawtoothButton.y, sawtoothButton.width, sawtoothButton.height);
}


//This function is where the player can select the instrument
//It calls all necessary functions
function simulation() {
    background(255); //resets background
    displayThereminSelect();
    displayChoirSelection();
    displayDrumSelection();
}


//This function displays the initial message at the start of our simulation when the program's state is title 
function title() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("Instrument Simulator", width/2, height/2);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Press any key to start", width/2, height/2 + 100);
}


//This function starts when the state of our game is drum kit and calls all the necessary functions for it
function drumKit() {
    background(0);
    displayBass();
    displayDrum4();
    displayDrum3();
    displayDrum2();
    displayDrum1();
    displayCymbal1();
    displayCymbal2();
    displayBassKick();
    displayDrumPlayButton();
    displaySongSelect();
    displayDrumStick();
    
    //This if statement selects a random song from the song select array and ensures that the song doesn't repeat 
    if(drumSongPlayed && state === "drum kit") { 
        //Only lets user pick a new song once they click the stop button
        if(!songOn) {
            drumSong = random(drumSongSelect.sound);
            drumSong.play();
            songOn = true;
        }
        drumSongPlayed = false;
    }

    //Starts when user hits stop button and stops the song
    //It also resets the songOn so that the user can reset the song 
    if(drumSongPaused && state ==="drum kit") {
        drumSong.stop();
        songOn = false;
        drumSongPaused = false; 
    }

}

//Function that activates when state switches to choir
function choirPick() {
    background(0); 
    displayChoirBG();   
    displayChoirSound();
    cursor();

    //Maps the pitch to the y position by changing the rate of the song 
    pitch = map(mouseY, 0, height, 2, 0.5);
    choirSound.rate(pitch);

    //Maps the pan to the x position of the mouse
    path = map(mouseX, 0, width, -1.0, 1.0);
    choirSound.pan(path);

    //Stops the drum song if user switches state when drum song is on
    if(songOn) {
        drumSong.stop();
    }

    //Displays top row of choir boys 
    for(let j = 0; j < choirRow1.length; j++) {
        let choirBoy1 = choirRow1[j];
        choirBoy1.display();
    }

    //Displays middle row of choir boys 
    for(let i = 0; i < choirRow2.length; i++) {
        let choirBoy2 = choirRow2[i];
        choirBoy2.display();
    }

    //Displays bottom row of choir boys
    for(let z = 0; z < choirRow3.length; z++) {
        let choirBoy3 = choirRow3[z];
        choirBoy3.display();
    }

    //If the user is dragging the mouse, activates functions in the choir class for all the rows of choir boys 
    if(isDragging === true) {
        for(let j = 0; j < choirRow1.length; j++) {
            let choirBoy1 = choirRow1[j];
            choirBoy1.mouthMove();
            choirBoy1.bodyShake();
            choirBoy1.redFace();
            choirBoy1.closeEyes();
        }

        for(let i = 0; i < choirRow2.length; i++) {
            let choirBoy2 = choirRow2[i];
            choirBoy2.mouthMove();
            choirBoy2.bodyShake();
            choirBoy2.redFace();
            choirBoy2.closeEyes();
        }

        for(let z = 0; z < choirRow3.length; z++) {
            let choirBoy3 = choirRow3[z];
            choirBoy3.mouthMove();
            choirBoy3.bodyShake();
            choirBoy3.redFace();
            choirBoy3.closeEyes();
        }
    }

    //When user stops dragging, initiates the return function for all the choir rows
    if(isDragging === false) {
        for(let j = 0; j < choirRow1.length; j++) {
            let choirBoy1 = choirRow1[j];
            choirBoy1.return();
        }
    
        for(let i = 0; i < choirRow2.length; i++) {
            let choirBoy2 = choirRow2[i];
            choirBoy2.return();
        }

        for(let z = 0; z < choirRow3.length; z++) {
            let choirBoy3 = choirRow3[z];
            choirBoy3.return();
        }
    }
}


//This function displays the buttons to change the choir sound
function displayChoirSound() {
    noStroke();
    fill(choirV1Button.fill);
    ellipse(choirV1Button.x, choirV1Button.y, choirV1Button.size);
    fill(choirV2Button.fill);
    ellipse(choirV2Button.x, choirV2Button.y, choirV2Button.size);

}


//This function displays the background for the choir state
function displayChoirBG() {
    imageMode(CENTER);
    image(choirBG, 500, 350, 1000, 700);
}


//This function calls all the necessary functions for the theremin as well as the other features for the theremin
function thereminPick() {
    background(0);
    cursor();
    displayLine();
    displayTheremin();
    displayValues();
    displayHandTheremin();
    
    //Stops the drum song when switching instruments
    if(songOn) {
        drumSong.stop();
    }

    //Maps the theremin frequency to the y position of the mouse and maintains the map in the canvas 
    if(mouseY > 0 || mouseY < 700) {
        let newFreq = map(mouseY, height, 0, 0, 900);
        theremin.freq(newFreq);
    }

    //Maps the amplitude of the theremin to the x position of the mouse and maintains the map in the canvas 
    if(mouseX > 0 || mouseX < 1000) {
        let newAmp = map(mouseX, 0, width, 0, 0.6);
        theremin.amp(newAmp, 0.1);
    }

    //Initiates the game
    if(gameOn) {
        thereminGameDisplay();
        
        //Changes the position of the red circles that pop up when user touches it and sound is playing 
        let d1 = dist(mouseX, mouseY, thereminCircle.x, thereminCircle.y);
        if(d1 < thereminCircle.size / 2 + thereminHand.width / 3 && gameOn && thereminOn) {
            thereminCircle.x = random(200, 800);
            thereminCircle.y = random(100, 600);
            gameCount += 1; //Adds to score
            gameSFX.play(); //Plays sound when user touches circle
            noLoop = false; //Stops winning sound effect from playing until user wins
        }
    }

    //Checks when user achieved specified amount to winning state of game 
    if(gameCount === 20) {
        gameOn = false; //Stops game 
        thereminGameWin(); //Display winning statement
        gameWinSFX.setLoop(false); //Stops winning sound from looping 
        
        //Plays sound when user wins and stops it from continuously playing
        if(!gameWinSFX.isPlaying() && !noLoop) {
            gameWinSFX.play();
        }
        noLoop = true;
    }
}


//Displays line in the back of the theremin 
function displayLine() {
    stroke(255);
    strokeWeight(5);
    noFill();
    let mappedAmp = map(theremin.getAmp(), 0, 0.6, width, 0); //Maps amplitude to canvas 
    let mappedFreq = map(theremin.getFreq(), 0, 900, height, 0);//Maps frequency to canvas
    bezier(0, height / 2, width / 3, mappedAmp, (2/3) * width, mappedFreq, width, height / 2);//Changes the two center points of the bezier depending on the mapped frequency and amplitude 
};


//Displays the values for the theremin 
function displayValues() {
    let amp = theremin.getAmp();
    let frequency = theremin.getFreq();
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Amp: " + amp, width / 2, 100);
    text("Frequency: " + frequency, width / 2, 125);
    text("Wave Type: " + wave, width / 2, 150);
}


//Displays the hand in the theremin instrument
function displayHandTheremin() {
    noCursor(); //removes cursor
    thereminHand.x = mouseX; //sets x position to mouseX 
    thereminHand.y = mouseY; //sets y position to mouseY
    imageMode(CENTER);
    image(thereminHand.img, thereminHand.x, thereminHand.y, thereminHand.width, thereminHand.height);
}


//Displays the game messages and red circles
function thereminGameDisplay() {
    push();
    noStroke();
    fill(thereminCircle.fill.r, thereminCircle.fill.g, thereminCircle.fill.b);
    ellipse(thereminCircle.x, thereminCircle.y, thereminCircle.size);
    pop();

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Score: " + gameCount, width / 2, 175); //Shows game score
    pop();
}


//Displays the winning message when game is complete
function thereminGameWin() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("YOU WON!", width / 2, 175);
    pop();
}



