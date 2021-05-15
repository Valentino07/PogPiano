/*
Pog Piano: A piano for memers of the modern day. 

Four different modes of play: "Sheeeeeesh"(most current meme audio), "YeahBoyyyyyy" (5 year old meme), "Ka-chowwwwwww" (eternal meme), "WoOOoow" (Owen Wilson)

Piano that plays when keys are pressed on the keyboard

Referenced Coding Examples:
For spacing of keys on the keyboard:
https://editor.p5js.org/mrbombmusic/sketches/ryeLfZTd-

For triggering audio with keypresses:
https://editor.p5js.org/maxremfort/sketches/dPfuMj3Nk

*/

//variables
let baseColor;
let space;
let active = false;
let whiteKeyColor;
let blackKeyColor;

let w;
let x;

let w2;
let x2;

let modeSheesh;
let modeKachow;
let modeYeahboi;
let modeWow;

let modes;

let mode = "sheesh"; //mode of play

let sheesh = []; //array of sheesh sound effects
let kachow = []; //array of kachow sound effects
let yeahboi = []; //array of yeahboi sound effects
let wow = []; //array of wow sound effects

let currentAudio;

//load the sounds
function preload() {
  for (i = 1; i < 18; i++) {
    sheesh[i] = loadSound("Assets/Sheesh/Sheesh-" + i + ".wav");
    kachow[i] = loadSound("Assets/Kachow/Kachow-" + i + ".wav");
    yeahboi[i] = loadSound("Assets/Yeahboi/Yeahboi-" + i + ".wav");
    wow[i] = loadSound("Assets/Wow/Wow-" + i + ".wav");
  }
}

// setup() runs once at the load of the page.
function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
  modeSheesh = createButton("Sheeeeeesh");
  modeKachow = createButton("Ka-chow");
  modeYeahboi = createButton("YeahBoyyyyyy");
  modeWow = createButton("WoOooW");

  // modeKachow = createButton("Ka-chow");

  // modeKachow.mousePressed(changeToKachow);

  // modeYeahboi = createButton("Yeah Boiiiii");
  // modeYeahboi.mousePressed(changeToYeahboi);

  // modeWow = createButton("WooOow");
  // modeWow.mousePressed(changeToWow);

  //make radiobuttons to select mode

  // modes = createRadio();
  // modes.option("sheesh", 'Sheeeeesh');
  // modes.option("kachow", "Ka-chow");
  // modes.option("yeahboi", "Yeah Boiiii");
  // modes.option("wow", "woOOoow");
  // modes.position(width/20+150, height/10);
  // modes.style("padding", "10px");
  // modes.style("font-weight", "bold");
  // modes.style("font-size", "24px");
  // modes.style("font-family", "helvetica");
}

// draw() runs in a loop as many times as specified by frameRate() per second.
function draw() {
  getBaseColor();
  background(baseColor);
  rectMode(CENTER);
  space = width / 15;
  keyspace = width / 16;
  //create piano big background
  fill("#de4600"); //bright orange color
  noStroke();
  rect(width / 2, height / 2, space * 11, height / 1.1, 70);
  //create piano small background

  fill("#ff641c"); //light orange color
  noStroke();
  rect(width / 2, height / 2 + 30, space * 10, height / 1.7, 20);

  //drawkeyboard
  w = keyspace;
  for (var i = 0; i < 10; i++) {
    x = space * 3.4 + i * w;
    x2 = space * 3.4 + (i + 1) * w;

    fill("#ffffff");
    rect(x, height / 2 + 30, keyspace - 1, height / 1.9);
  }

  fill("#000000");
  rect(space * 2.9 + w, height / 2 - 65, keyspace - 5, height / 3);
  rect(space * 3 + 2 * w, height / 2 - 65, keyspace - 5, height / 3);
  rect(space * 2.9 + 4 * w, height / 2 - 65, keyspace - 5, height / 3);
  rect(space * 3 + 5 * w, height / 2 - 65, keyspace - 5, height / 3);
  rect(space * 3 + 6 * w, height / 2 - 65, keyspace - 5, height / 3);
  rect(space * 3 + 8 * w, height / 2 - 65, keyspace - 5, height / 3);
  rect(space * 3 + 9 * w, height / 2 - 65, keyspace - 5, height / 3);

  //drawtitle
  textSize(70);
  fill("#ffe49e");
  textFont("Garamond");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  text("POG  PIANO", width / 2, height - height / 1.13);

  textSize(24);
  text(
    "Select a mode and use your keyboard to play the Pog Piano",
    width / 2,
    height - height / 1.24
  );

  //draw key names
  fill(245, 116, 42, 155);
  textSize(48);
  text("A", space * 2.45 + w, height / 1.35);
  text("S", space * 3.4 + w, height / 1.35);
  text("D", space * 4.33 + w, height / 1.35);
  text("F", space * 5.3 + w, height / 1.35);
  text("G", space * 6.2 + w, height / 1.35);
  text("H", space * 7.15 + w, height / 1.35);
  text("J", space * 8.14 + w, height / 1.35);
  text("K", space * 9 + w, height / 1.35);
  text("L", space * 10 + w, height / 1.35);
  text(";", space * 10.9 + w, height / 1.35);

  fill(255, 205, 176, 155);
  text("W", space * 2.9 + w, height / 1.85);
  text("E", space * 3.95 + w, height / 1.85);
  text("T", space * 5.74 + w, height / 1.85);
  text("Y", space * 6.75 + w, height / 1.85);
  text("U", space * 7.71 + w, height / 1.85);
  text("O", space * 9.55 + w, height / 1.85);
  text("P", space * 10.52 + w, height / 1.85);

  //draw buttons on bottom

  modeSheesh.style("background-color", "#ff6c17");
  modeSheesh.style("padding", "10px");
  modeSheesh.style("color", "#1b3b52");
  modeSheesh.style("font-weight", "bold");
  modeSheesh.position(space * 3.4, height / 1.18);
  modeSheesh.mousePressed(changeToSheesh);

  modeKachow.style("background-color", "#ff6c17");
  modeKachow.style("color", "#1b3b52");
  modeKachow.style("padding", "10px");
  modeKachow.style("font-weight", "bold");
  modeKachow.position(space * 3.4 + 2.5 * w, height / 1.18);
  modeKachow.mousePressed(changeToKachow);

  modeYeahboi.style("background-color", "#ff6c17");
  modeYeahboi.style("color", "#1b3b52");
  modeYeahboi.style("padding", "10px");
  modeYeahboi.style("font-weight", "bold");
  modeYeahboi.position(space * 3.4 + 5 * w, height / 1.18);
  modeYeahboi.mousePressed(changeToYeahboi);

  modeWow.style("background-color", "#ff6c17");
  modeWow.style("color", "#1b3b52");
  modeWow.style("padding", "10px");
  modeWow.style("font-weight", "bold");
  modeWow.position(space * 3.4 + 7.5 * w, height / 1.18);
  modeWow.mousePressed(changeToWow);

  textSize(30);
  fill("#1b3b52");
  text("current mode: " + mode, width / 2, height / 1.08);

  //set mode = to value
  // mode = modes.value();
  // whiteWidth = space;
  //  whiteHeight = height/2;
  // xPos = keyspace*3.35;
  // regCol = color("#fffdfc");
  // activeCol = color("#87ff8b");
  // blackRegCol = color("#000000")

  // stroke("#222b23");
  // for(var i=0; i<10; i++){
  //   if(active){
  //     fill(activeCol);
  //   }
  //   else{
  //     fill(regCol);
  //   }
  //   rect(xPos + i*90, height/2+30, whiteWidth, whiteHeight);
  // }
}

function changeToSheesh() {
  mode = "sheesh";
}

function changeToKachow() {
  mode = "kachow";
}

function changeToYeahboi() {
  mode = "yeahboi";
}

function changeToWow() {
  mode = "wow";
}

//if a key is pressed
function keyPressed() {
  if (key === "a") {
    if (mode == "sheesh") {
      sheesh[1].play();
      currentAudio = sheesh[1];
    } else if (mode == "kachow") {
      kachow[1].play();
      currentAudio = kachow[1];
    } else if (mode == "yeahboi") {
      yeahboi[1].play();
      currentAudio = yeahboi[1];
    } else if (mode == "wow") {
      wow[1].play();
      currentAudio = wow[1];
    } else {
      currentAudio.stop();
    }
  }

  if (key === "w") {
    if (mode == "sheesh") {
      sheesh[2].play();
      currentAudio = sheesh[2];
    } else if (mode == "kachow") {
      kachow[2].play();
      currentAudio = kachow[2];
    } else if (mode == "yeahboi") {
      yeahboi[2].play();
      currentAudio = yeahboi[2];
    } else if (mode == "wow") {
      wow[2].play();
      currentAudio = wow[2];
    }
  }

  if (key === "s") {
    if (mode == "sheesh") {
      sheesh[3].play();
      currentAudio = sheesh[3];
    } else if (mode == "kachow") {
      kachow[3].play();
      currentAudio = kachow[3];
    } else if (mode == "yeahboi") {
      yeahboi[3].play();
      currentAudio = yeahboi[3];
    } else if (mode == "wow") {
      wow[3].play();
      currentAudio = wow[3];
    }
  }

  if (key === "e") {
    if (mode == "sheesh") {
      sheesh[4].play();
      currentAudio = sheesh[4];
    } else if (mode == "kachow") {
      kachow[4].play();
      currentAudio = kachow[4];
    } else if (mode == "yeahboi") {
      yeahboi[4].play();
      currentAudio = yeahboi[4];
    } else if (mode == "wow") {
      wow[4].play();
      currentAudio = wow[4];
    }
  }

  if (key === "d") {
    if (mode == "sheesh") {
      sheesh[5].play();
      currentAudio = sheesh[5];
    } else if (mode == "kachow") {
      kachow[5].play();
      currentAudio = kachow[5];
    } else if (mode == "yeahboi") {
      yeahboi[5].play();
      currentAudio = yeahboi[5];
    } else if (mode == "wow") {
      wow[5].play();
      currentAudio = wow[5];
    }
  }

  if (key === "f") {
    if (mode == "sheesh") {
      sheesh[6].play();
      currentAudio = sheesh[6];
    } else if (mode == "kachow") {
      kachow[6].play();
      currentAudio = kachow[6];
    } else if (mode == "yeahboi") {
      yeahboi[6].play();
      currentAudio = yeahboi[6];
    } else if (mode == "wow") {
      wow[6].play();
      currentAudio = wow[6];
    }
  }

  if (key === "t") {
    if (mode == "sheesh") {
      sheesh[7].play();
      currentAudio = sheesh[7];
    } else if (mode == "kachow") {
      kachow[7].play();
      currentAudio = kachow[7];
    } else if (mode == "yeahboi") {
      yeahboi[7].play();
      currentAudio = yeahboi[7];
    } else if (mode == "wow") {
      wow[7].play();
      currentAudio = wow[7];
    }
  }

  if (key === "g") {
    if (mode == "sheesh") {
      sheesh[8].play();
      currentAudio = sheesh[8];
    } else if (mode == "kachow") {
      kachow[8].play();
      currentAudio = kachow[8];
    } else if (mode == "yeahboi") {
      yeahboi[8].play();
      currentAudio = yeahboi[8];
    } else if (mode == "wow") {
      wow[8].play();
      currentAudio = wow[8];
    }
  }

  if (key === "y") {
    if (mode == "sheesh") {
      sheesh[9].play();
      currentAudio = sheesh[9];
    } else if (mode == "kachow") {
      kachow[9].play();
      currentAudio = kachow[9];
    } else if (mode == "yeahboi") {
      yeahboi[9].play();
      currentAudio = yeahboi[9];
    } else if (mode == "wow") {
      wow[9].play();
      currentAudio = wow[9];
    }
  }

  if (key === "h") {
    if (mode == "sheesh") {
      sheesh[10].play();
      currentAudio = sheesh[10];
    } else if (mode == "kachow") {
      kachow[10].play();
      currentAudio = kachow[10];
    } else if (mode == "yeahboi") {
      yeahboi[10].play();
      currentAudio = yeahboi[10];
    } else if (mode == "wow") {
      wow[10].play();
      currentAudio = wow[10];
    }
  }

  if (key === "u") {
    if (mode == "sheesh") {
      sheesh[11].play();
      currentAudio = sheesh[11];
    } else if (mode == "kachow") {
      kachow[11].play();
      currentAudio = kachow[11];
    } else if (mode == "yeahboi") {
      yeahboi[11].play();
      currentAudio = yeahboi[11];
    } else if (mode == "wow") {
      wow[11].play();
      currentAudio = wow[11];
    }
  }

  if (key === "j") {
    if (mode == "sheesh") {
      sheesh[12].play();
      currentAudio = sheesh[1];
    } else if (mode == "kachow") {
      kachow[12].play();
      currentAudio = kachow[12];
    } else if (mode == "yeahboi") {
      yeahboi[12].play();
      currentAudio = yeahboi[12];
    } else if (mode == "wow") {
      wow[12].play();
      currentAudio = wow[12];
    }
  }

  if (key === "k") {
    if (mode == "sheesh") {
      sheesh[13].play();
      currentAudio = sheesh[13];
    } else if (mode == "kachow") {
      kachow[13].play();
      currentAudio = kachow[13];
    } else if (mode == "yeahboi") {
      yeahboi[13].play();
      currentAudio = yeahboi[13];
    } else if (mode == "wow") {
      wow[13].play();
      currentAudio = wow[13];
    }
  }

  if (key === "o") {
    if (mode == "sheesh") {
      sheesh[14].play();
      currentAudio = sheesh[14];
    } else if (mode == "kachow") {
      kachow[14].play();
      currentAudio = kachow[14];
    } else if (mode == "yeahboi") {
      yeahboi[14].play();
      currentAudio = yeahboi[14];
    } else if (mode == "wow") {
      wow[14].play();
      currentAudio = wow[14];
    }
  }

  if (key === "l") {
    if (mode == "sheesh") {
      sheesh[15].play();
      currentAudio = sheesh[15];
    } else if (mode == "kachow") {
      kachow[15].play();
      currentAudio = kachow[15];
    } else if (mode == "yeahboi") {
      yeahboi[15].play();
      currentAudio = yeahboi[15];
    } else if (mode == "wow") {
      wow[15].play();
      currentAudio = wow[15];
    }
  }

  if (key === "p") {
    if (mode == "sheesh") {
      sheesh[16].play();
      currentAudio = sheesh[16];
    } else if (mode == "kachow") {
      kachow[16].play();
      currentAudio = kachow[16];
    } else if (mode == "yeahboi") {
      yeahboi[16].play();
      currentAudio = yeahboi[16];
    } else if (mode == "wow") {
      wow[16].play();
      currentAudio = wow[16];
    }
  }

  if (key === ";") {
    if (mode == "sheesh") {
      sheesh[17].play();
      currentAudio = sheesh[17];
    } else if (mode == "kachow") {
      kachow[17].play();
      currentAudio = kachow[17];
    } else if (mode == "yeahboi") {
      yeahboi[17].play();
      currentAudio = yeahboi[17];
    } else if (mode == "wow") {
      wow[17].play();
      currentAudio = wow[17];
    }
  }
}

function getBaseColor() {
  if (mode == "sheesh") {
    baseColor = "#b463d4";
  }
  if (mode == "kachow") {
    baseColor = "#f54257";
  }
  if (mode == "yeahboi") {
    baseColor = "#ebca46";
  }
  if (mode == "wow") {
    baseColor = "#5ca7f2";
  }
}

//if key is released (code commented out because gave a bug where you couldn't repeat a key)
// function keyReleased(){
//   currentAudio.fade(0,0.5); //fade audio out when you release the key

// }

// windowResized() is called whenever the browser size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
