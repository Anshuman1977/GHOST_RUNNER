const PLAY = 1;
const END = 0;
var gameState = PLAY;

var ghost, ghostImg;
var tower, towerImg;

var door, doorImg;
var climber, climberImg;
var block;

var invisibleGround;

var doorsGroup, climbersGroup, blocksGroup;


function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
 
}


function setup(){
  createCanvas(500,500);
  
  //spookySound.loop();
  
  tower = createSprite(250,300);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  
  
  ghost = createSprite(300,430,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = .3;
  
  invisibleGround = createSprite(250,480,380,1);
  invisibleGround.visible = false;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  blocksGroup = new Group();
  
  //console.log(tower.height/2);
  
}// ------------end of setup -------------------

function draw(){
  background(0);
  
  if (gameState == PLAY) {
    
    // for infinite ground
    if(tower.y > 400){
     tower.y = 300
     }
    
    
    //left and right movement to ghost
    if (keyDown("left_arrow")){
      ghost.x -=3;
    }
    if (keyDown("right_arrow")){
      ghost.x +=3
    }
    // make the ghost jump using gravity
    if (keyDown("up_arrow")){
      ghost.velocityY = -5}
     ghost.velocityY +=0.8
   
    // call function spawnDoors()
    spawnDoors()
    
    // ghost is touching climbersGroup
    if (ghost.isTouching(climbersGroup) ){
        ghost.bounceOff(climbersGroup)
  }  
    
    // ghost is touching blocksGroup
    if (ghost.isTouching(blocksGroup)){
        gameState = END
        }
     

    
  }else if(gameState == END){
    
    // "Game Over" should appear
    fill("red")
    textSize(35)
    text("GAME OVER",150,250)
    
    
    // tower should disappear
    tower.visible = false
    ghost.visible = false
    
    doorsGroup.destroyEach()
    climbersGroup.destroyEach()
    blocksGroup.destroyEach()

  }
  
  ghost.collide(invisibleGround);
  drawSprites();
  
}
// -----------------end of draw ---------------------


function spawnDoors() {
  
  if (frameCount % 100 === 0) {
    var rand = Math.round(random(120,400));
    var door = createSprite(rand, -50);
        door.addImage(doorImg);
        door.velocityY = 3
        door.lifetime = 200
    var climber = createSprite(rand, door.y+door.height/2);
        climber.addImage(climberImg)
        climber.velocityY = 3;
        climber.lifetime = 200
    var block = createSprite(rand, climber.y+15, 80, 5);
        block.velocityY = 3;
        block.lifetime = 200;
        block.visible = false ; 
    // add velocities
    
    
    // add lifetime
    
    
    
    doorsGroup.add(door);
  climbersGroup.add(climber);
  blocksGroup.add(block);
    
    //change depth of the ghost
    ghost.depth = door.depth+1;
  }
}


