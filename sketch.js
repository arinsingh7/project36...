var dog;
var happydog;
var database;
var foodS;
var foodStock;
var saddog;


function preload()
{
  saddog = loadImage("dogImg.png");
	happydog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 350, 40, 40);
  dog.addImage(saddog);
  dog.scale = 1/6;
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800, 95);
  add.mousePressed(addFoods);
  


}


function draw() {  
background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happydog);
  }
  drawSprites();

  

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  //readStock();
  writeStock();

  fill(255,255,254); 
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13); 
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
  
  
}
function readStock(data) {
  foodS = data.val();
}
function writeStock(x){

  if(x<= 0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

