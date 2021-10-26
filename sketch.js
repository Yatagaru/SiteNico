var trex, trex_correndo, trex_morto;
var solo, solo_imagem, solo_invisivel;
var Nuvem_imagem;
var Cacto_imagem1, Cacto_imagem2, Cacto_imagem3,
    Cacto_imagem4, Cacto_imagem5, Cacto_imagem6;
var Pontos = 0;
var gCactos, gNuvens;

var SomPulo, SomMorte, SomPontos;
var Fonte;
var reiniciar, reiniciar_imagem;
var Game_Over, Game_Over_imagem;
const JOGAR = 1;
const ENCERRAR = 0;
var estado = JOGAR;

function preload(){
  //carregando animação do trex
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_morto = loadAnimation("trex_colidiu.png");
  // Carregando Imagems
 
 solo_imagem = loadImage("solo2.png");
 Nuvem_imagem = loadImage("nuvem.png");
 Cacto_imagem1 = loadImage("obstaculo1.png")
 Cacto_imagem2 = loadImage("obstaculo2.png")
 Cacto_imagem3 = loadImage("obstaculo3.png")
 Cacto_imagem4 = loadImage("obstaculo4.png")
 Cacto_imagem5 = loadImage("obstaculo5.png") 
 Cacto_imagem6 = loadImage("obstaculo6.png")
 reiniciar_imagem = loadImage("reiniciar.png");
 Game_Over_imagem = loadImage("fimDoJogo.png");

 SomPulo = loadSound("pulo.mp3");
 SomMorte = loadSound("morte.mp3");
 SomPontos = loadSound("checkPoint.mp3");
 Fonte = loadFont("FonteTrex.ttf")
}

function setup(){
  createCanvas(600,200);
  // Fazer o solo e solo invisivel
  solo = createSprite(300,150,600,10);
  solo_invisivel = createSprite(300,160,600,10);
  solo_invisivel.visible = false;
  // Imagem do solo
  solo.addImage(solo_imagem);
  reiniciar = createSprite(300,120,0,0);
  reiniciar.addImage(reiniciar_imagem);
  reiniciar.scale = 0.4
  reiniciar.visible = false
  //criando trex
  trex = createSprite(50,100,20,50);
  trex.debug = false;
  
  Game_Over = createSprite(300,80,0,0);
  Game_Over.addImage(Game_Over_imagem);
  Game_Over.scale = 0.4
  Game_Over.visible = false
  trex.setCollider("circle",0,0,46);
  trex.addAnimation("correndo", trex_correndo);
  trex.addAnimation("morto", trex_morto);
  trex.scale = 0.5;
  console.info("Este é o jogo do T-rex");
  gCactos = new Group();
  gNuvens = new Group();

}

function draw(){
  background("white");
 // console.log(trex.y) 
 // console.count("Frames do FunctionDraw")
  trex.collide(solo_invisivel);
  textFont(Fonte);
  fill(80);
  text("Pontos: "+Pontos,470,30);
  

  // Resetar o solo
  if(solo.x < 0) {
    solo.x = solo.width/2;
  }
  if(Pontos%100===0 && Pontos>0 ){
    SomPontos.play();
  }
  trex.debug=false
  trex.setCollider("Circle",0,0,42)
  
// Tudo que estiver no estado JOGAR
 if (estado === JOGAR){
   CriarNuvens();
   CriarCactos();
   Pontos = Math.round((Pontos + frameCount/3)/2);
   solo.velocityX = -(6+Pontos*3/100)
   //gravidade
  trex.velocityY = trex.velocityY + 1;
   if(trex.isTouching(gCactos)){
     SomMorte.play();
     estado = ENCERRAR;
   //if(trex.y>130) {
     
     //trex.velocityY = -11;
    //SomPulo.play();
    //}
   }
   
   if(keyWentDown("space")&& trex.y>130) {
    trex.velocityY = -11;
    SomPulo.play();
     //Tudo que vai acontecer no estado ENCERRAR   
    }
  } else if(estado === ENCERRAR){
   gCactos.setVelocityXEach(0);
   gNuvens.setVelocityXEach(0);
   solo.velocityX = 0;
   trex.changeAnimation("morto",trex_morto);
   trex.velocityY = 0;
   reiniciar.visible = true
   Game_Over.visible = true
    gCactos.setLifetimeEach(-1);
    gNuvens.setLifetimeEach(-1);
  if(mousePressedOver(reiniciar)) {
    Reinicie();
   }
  }
reiniciar.depth = gCactos.maxDepth() + 1;   
 drawSprites();
}
function CriarNuvens() {
  if(frameCount%60 === 0) {
    var Nuvem = createSprite(620,100,50,50);
    Nuvem.velocityX = -3;
    Nuvem.y = Math.round(random(40,100));
    Nuvem.addImage(Nuvem_imagem);
    Nuvem.scale = 0.7;
    trex.depth = Nuvem.depth;
    trex.depth++;
    Nuvem.lifetime = 220;
    gNuvens.add(Nuvem);
  }
}
function CriarCactos() {
  if(frameCount%50 === 0)  {
    var Cacto = createSprite(610,135,10,10)
    
    Cacto.velocityX = -(6+Pontos*3/100)
    Cacto.lifetime = 115;
    Cacto.scale = 0.52;
    Cacto.depth = trex.depth
    Cacto.depth++;
    var Num = Math.round(random(1,6));
   // Randomizar entre uma das imagens 
    switch(Num){
      case 1: Cacto.addImage(Cacto_imagem1); 
         break;
      case 2: Cacto.addImage(Cacto_imagem2);
         break;
      case 3: Cacto.addImage(Cacto_imagem3);
         break;
      case 4: Cacto.addImage(Cacto_imagem4);
         break;
      case 5: Cacto.addImage(Cacto_imagem5);
         break;
      case 6: Cacto.addImage(Cacto_imagem6);
         break;
          // Reiniciar e quebrar a sequencia
         default: break;
     
    }
   gCactos.add(Cacto);
  }
}
function Reinicie(){
  estado = JOGAR;
  gCactos.destroyEach();
  gNuvens.destroyEach();
  reiniciar.visible = false
  Game_Over.visible = false
  trex.changeAnimation("correndo", trex_correndo);
  frameCount = 0
  Pontos = 0
  
}
