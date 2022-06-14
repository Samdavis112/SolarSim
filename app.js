canvasSize = 600;
var orbitCenterX = canvasSize / 2;
var orbitCenterY = canvasSize / 2;
var x;
var y;
let NumOfPlanets = 5;
let angles = [];
let oRad = [];
let rad = [];
let speed = [];
var trails = true;
var normalMode = true;
const btnTrails = document.getElementById("btnTrails");
const inpNoPlanets = document.getElementById("noPlanets");
const btnNormalMode = document.getElementById("btnNormal");
const btnReset = document.getElementById("btnReset");

function setup() {
    let canvas = createCanvas(canvasSize, canvasSize );
    canvas.parent("Canvas");
    btnTrails.addEventListener("click", function(){
        if(trails){trails = false;}
        else{trails = true;}
    });
    btnNormalMode.addEventListener("click", function(){
        if (normalMode){normalMode = false;}
        else {normalMode = true; }
    })
    inpNoPlanets.addEventListener("input", function(){
        if(!normalMode){
            NumOfPlanets = inpNoPlanets.value;
            angles = [];
            oRad = [];
            rad = [];
            speed = [];
            start();
        }
    });
   btnReset.addEventListener("click", function(){
     document.location.reload();
    });
    start();
}

function start(){
    for(let i = 0; i < NumOfPlanets; i++){
        angles[i] = 0;
        rad[i] = randomFromInterval(5, 15);
        speed[i] = Math.random() * 0.05;
        if(!normalMode){
            oRad[i] = randomFromInterval(50, 280);
        }
    }
    if(normalMode){
        oRad[0] = randomFromInterval(60, 75);
        for(let i = 1; i < NumOfPlanets; i++){
            oRad[i] = randomFromInterval(oRad[i - 1]+ 30, 80 + 50 * i);
        }
    }
    oRad.sort(sortFloat);
    oRad.reverse();
    console.log(oRad);
}

function sortFloat(a,b) { return a - b; }

function draw() {
  background(220);
  fill(220);
    
    //Drawing the "Orbits"
    if (trails){
        stroke(0);
        for(let i = 0; i < NumOfPlanets; i++)
        {
          ellipse(orbitCenterX, orbitCenterY, oRad[i] *2);
        }
    }
    
  //Drawing the star
  noStroke();
  drawStar(30);

  //Drawing individual planets.
  for(let i = 0; i < NumOfPlanets; i++)
  {
    angles[i] = addPlanet(oRad[i], rad[i], speed[i], angles[i]);
  }
}

function addPlanet(orbitRadius, radius, orbitSpeed, orbitAngle){
  fill(255);
  x = orbitCenterX + orbitRadius * cos(orbitAngle);
  y = orbitCenterY + orbitRadius * sin(orbitAngle);
  ellipse(x, y, radius*2);
  orbitAngle += orbitSpeed;
  return orbitAngle;
}

function drawStar(radius){
  fill(255, 231, 0);
  ellipse(orbitCenterX, orbitCenterY, radius*2);
}

function randomFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min;
}
