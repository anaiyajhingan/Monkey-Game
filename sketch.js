var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage,ground,groundI,bananafunc,rock,invisibleGround;
var bananaGroup, obstacleGroup;
var survivalTime=0;
var score=0;
var gameOver, restart;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadAnimation("sprite_0.png")
  groundI=loadImage("istockphoto-936785762-612x612.jpg")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
gameOverI=loadImage("download (2).png");
  restartI=loadImage("reload.png");
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(50,350,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;

    
  ground=createSprite(400,400 ,900,10);
  ground.velocityX = -4;
 ground.x = ground.width/2;
   
  
  invisibleGround = createSprite(0,400,20,20);
  invisibleGround.visible = false;
  

 bananaGroup=createGroup();
  obstacleGroup=createGroup();
  monkey.setCollider("circle",0,0,270);
 
  gameOver = createSprite(190,100);
  gameOver.addImage("g",gameOverI);
  
  restart = createSprite(200,200);
  restart.addImage("r",restartI);
  
  gameOver.scale = 1.2;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  
  score=0;
  
}


function draw() {
  background(255);
    
  stroke("white");
  textSize(20);
  fill("black");
   stroke("black");
  fill("black");
  textSize(20);
  
  text("Survival Time :" + score ,100,50);

 
  bananafunc();
  rock();

 if(gameState===PLAY){
   if(frameCount % 60 === 0){
     score=score+1
   }
   
   
  if(ground.x<0){
    ground.x=ground.width/2;
      }
   
   
 if(keyDown("space") && monkey.y >= 315) {
      monkey.velocityY = -15;
    }
  
    monkey.velocityY = monkey.velocityY + 0.5
    monkey.collide(ground)
    
 

   
   
   if(obstacleGroup.isTouching(monkey)){
     gameState= END;
      
      monkey.changeAnimation("collided",monkey_collided  );
  
     
    
   }
 }
  else if (gameState === END) {
     gameOver.visible = true;
    restart.visible = true;
  
    ground.velocityX = 0;
   monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);

    
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }
  
console.log(ground.x);
  drawSprites();

}

function bananafunc(){
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}
function rock(){
  if(frameCount%60===0){
    var obstacles =createSprite(400,165,10,40);
    obstacles.velocityX=-6;
    obstacles.y= Math.round(random(370,370));
    obstacles.addImage(obstacleImage);
    obstacles.scale=0.13 ;
    obstacles.lifeTime=300;
    obstacleGroup.add(obstacles);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  
  score = 0;
  
}
