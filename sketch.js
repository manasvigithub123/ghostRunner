var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climbersImage,climbersGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var gameState="play"

function preload(){
  towerImage= loadImage("tower.png");
  doorImage= loadImage("door.png");
  doorsGroup=new Group()
  climberImage= loadImage("climber.png");
  climbersGroup= new Group()
  ghostImage= loadImage("ghost-standing.png")
  invisibleBlockGroup= new Group()
  
}

function setup(){
  createCanvas(600,600);
  
  tower= createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY= 2;
  
  ghost = createSprite(200,200)
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
}

function draw(){
  background("black")
  if (gameState==="play"){
  if (tower.y > 400){
    tower.y=300;
  }
  
  if (keyDown("left")){
    ghost.x= ghost.x-3
  }
  
   if (keyDown("right")){
    ghost.x= ghost.x+3
  }
      
   if (keyDown("space")){
    ghost.velocityY=-5
   }
  
  ghost.velocityY=ghost.velocityY+0.8;                     
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;                 
  }
       
  if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end"
  }
  
  
  spawnDoors();
  drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30);
    text("Game Over", 230,250) 
  }
  
  
  
  
  
  
}

function spawnDoors(){
  if (frameCount%200===0){
    door =  createSprite(200,-50)
  door.velocityY=2;
  door.addImage(doorImage);
    door.x=Math.round(random(100,500))
    door.lifetime=600;
    doorsGroup.add(door)
    
    
    ghost.depth=door.depth+1                 
    
    climber= createSprite(door.x,10)
    climber.addImage(climberImage);
    climber.velocityY=2;
    climber.lifetime=600;
    climbersGroup.add(climber)
    
    invisibleBlock= createSprite(door.x,15,climber.width,2);
invisibleBlock.velocityY=2;   
    invisibleBlockGroup.add(invisibleBlock)
                               
                               
                               
  }
  
  
}