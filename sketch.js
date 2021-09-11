var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 700);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg);
  
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();
  bubbleGroup=createGroup();
  
  heading=createElement("h1");
  scoreBoard=createElement("h1");

  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreBoard.html("score:"+score);
  scoreBoard.style("color:red");
  scoreBoard.position(width-150,20);

  heading.html("life:"+life);
  heading.style("color:blue");
  heading.position(width-250,20);

  if(gameState===1){
    gun.y=mouseY  
if(keyDown("space")){
  shootBullet();
}
if(gameState===1){

if(frameCount %80===0){
  drawblueBubble();
}
if(frameCount%100===0){
  drawRedBubble();
}
}
    drawSprites();
  }
     handleBubbleCollision();
     handleGameOver();
}

function shootBullet(){
  bullet=createSprite(150,width/2,50,20);
  bullet.y=gun.y-20;
  bullet.velocityX=9;
  bullet.addImage(bulletImg);
  
  bullet.scale=0.04;
  bullet.lifeTime=100;
  bulletGroup.add(bullet);
}

function  drawblueBubble(){
  bluebubble = createSprite(800,random(20,650),40,40); 
  bluebubble.addImage(blueBubbleImg);
   bluebubble.scale = 0.1; 
   bluebubble.velocityX = -8; 
   bluebubble.lifetime = 400;
   blueBubbleGroup.add(bluebubble);
   bubbleGroup.add(bluebubble);
}

function drawRedBubble(){
redbubble=createSprite(800,random(20,650),40,40);
redbubble.addImage(redBubbleImg);
redbubble.scale=0.1;
redbubble.velocityX=-8;
redbubble.lifeTime=400;
redBubbleGroup.add(redbubble);
bubbleGroup.add(redbubble);
}

function handleBubbleCollision(bubbleGroup){
  if(bulletGroup.collide(blueBubbleGroup)){
    blast=createSprite(150,50);
    blast.x=bullet.x;
    blast.y=bullet.y;
   blast.addImage(blastImg);
   blast.scale=0.3;
   blast.lifetime=20;
   

   blueBubbleGroup.destroyEach();
   bulletGroup.destroyEach();
  
  if(life>0){
    score=score+1;
  }
}
if(bulletGroup.collide(redBubbleGroup)){
  blast2=createSprite(150,50);

  blast2.x=bullet.x;
    blast2.y=bullet.y;
   blast2.addImage(blastImg);
   blast2.scale=0.3;
   blast2.lifetime=20;

   redBubbleGroup.destroyEach();
   bulletGroup.destroyEach();
  
  if(life>0){
    score=score+1;
  }
}
}

function  handleGameOver(bubbleGroup) {
  if(backBoard.collide(blueBubbleGroup)){
   blueBubbleGroup.destroyEach();
    life=life-1;
  }
  if(backBoard.collide(redBubbleGroup)){
    redBubbleGroup.destroyEach();
     life=life-1;
   }

    if(life===0){
      gameState=2;

      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
    

  }
  


