var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var survivalTime;

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
   monkey.debug = false;

  survivalTime = 0;
}


function draw() {
  background(255);
  
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);
  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* survivalTime/100)
    
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    spawnFood();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        //trex.velocityY = -12
        gameState = END;
    }
  }
  
   else if (gameState === END) {
     ground.velocityX = 0; 
     obstacleGroup.setvelocity = 0;
     FoodGroup.setvelocity = 0;
     reset();    
   }
 
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
    monkey.collide(ground);
  
   //survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  //spawnFood();
  //spawnObstacles();
  
  //obstacleGroup.setLifetimeEach(-1);
  //FoodGroup.setLifetimeEach(-1);
     
  //obstacleGroup.setVelocityXEach(0);
  //FoodGroup.setVelocityXEach(0);   
 
  drawSprites();
  //reset();
  
}

function reset(){
 gameState = PLAY; 
 obstacleGroup.destroyEach();
 FoodGroup.destroyEach();
}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    var food = createSprite(300,120,40,10);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     
    food.lifetime = 200;
    
    FoodGroup.add(food);
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,200,10,40);
   obstacle.y = Math.round(random(325,325));
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -3;
    obstacle.lifetime = 300;
   
   
    obstacleGroup.add(obstacle);
  }
}