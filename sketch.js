var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider("circle",0,0,45)
  
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(trex.x,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(ground.width/2,190,2388,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  console.log(ground.width)
  score = 0;
  
  spawnClouds();
  spawnObstacles();
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, camera.position.x,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
    if(keyDown(RIGHT_ARROW) ) {
      trex.x = trex.x+8;
    }
  console.log(trex.x)
    trex.velocityY = trex.velocityY + 0.8
  camera.position.x=trex.x
    // if (ground.x < 0){
    //   ground.x = ground.width/2;
    // }
  
    trex.collide(invisibleGround);
   
  
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
    }
    if(trex.x>=2340){
      gameState="win"
      
    }
    
  }
  else if(gameState==="win"){
    textSize(30)
    stroke("black")
    text("YOU WIN !!!!!!",camera.position.x,100)
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  
  }

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
 for(i=10;i<2377;i=i+100) {
    var cloud = createSprite(i,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    //cloud.velocityX = -3;
    
     //assign lifetime to the variable
   // cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  for(i=200;i<2377;i=i+200) {
    var obstacle = createSprite(i,165,10,40);
    //obstacle.debug = true;
   // obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
   // obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

// function reset(){
//   gameState = PLAY;
//   gameOver.visible = false;
//   restart.visible = false;
  
//   obstaclesGroup.destroyEach();
//   cloudsGroup.destroyEach();
  
//   trex.changeAnimation("running",trex_running);
  
//   if(localStorage["HighestScore"]<score){
//     localStorage["HighestScore"] = score;
//   }
//   console.log(localStorage["HighestScore"]);
  
//   score = 0;
  
// }
