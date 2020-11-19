var play = 1;
var end = 0;
var gameState = play;

var monkey, monkey_running, ground, invisibleGround;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime;

function preload(){
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 500);
  
  monkey = createSprite(60,470,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(300,470,600,10);
  ground.x = ground.width /2;
   
  invisibleGround = createSprite(300,470,600,10);
  invisibleGround.visible = false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  food();
  obstacles();
  
  background(180);

  if(gameState === play) {
    //jump when the space key is pressed
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
     
   }
    
 //add gravity
  monkey.velocityY = monkey.velocityY + 1;
  
  //stop trex from falling down
  monkey.collide(invisibleGround);
 stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100, 50);
  }
 
  if(obstacleGroup.isTouching(monkey)) {
    gameState = end;
    }
  
  if(gameState === end) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.destroyEach();
    monkey.collide(ground);
  
  }
 
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(300,250,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -7;
    banana.scale = 0.2;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
        
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(550,420,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7;
    obstacle.scale = 0.3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
        
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}