var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var player;
var coins;
var undeadz;
var platforms;
var cursors;
var score = 0;
var livesLabel; 
var lives = 3; 
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload (){
  this.load.image('graveyard', 'graveyard.jpeg');
  this.load.image('ground', 'platform.jpg');
  this.load.image('coining', 'coin.png');
  this.load.image('undead', 'undead.png');
  this.load.spritesheet('protag', 'protag.png', { frameWidth: 32, frameHeight: 48 });
  this.load.audio('music', 'music.mp3'); 
  this.load.audio('ow', 'pain.mp3'); 
  this.load.audio('coin', 'coin.mp3');
}

function create (){

  let bg = this.add.sprite(0, 0, 'graveyard'); 
  bg.setOrigin(0,0);

  this.music = this.sound.add("music", {loop: true});  
  this.music.play(); 

  platforms = this.physics.add.staticGroup();

  platforms.create(100, 400, 'ground'); 
  platforms.create(850, 300, 'ground').setScale(2).refreshBody();
  platforms.create(50, 150, 'ground');
  platforms.create(400, 510, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(400, 450, 'protag');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.ow_sound = this.sound.add("ow", { loop: false}); 
  this.coin_sound = this.sound.add("coin", { loop: false}); 


  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('protag', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'protag', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('protag', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
      key: 'coining',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  undeadz = this.physics.add.group();

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(coins, platforms);
  this.physics.add.collider(undeadz, platforms);

  this.physics.add.overlap(player, coins, collectCoins, null, this);

  this.physics.add.collider(player, undeadz, hitUndead, null, this);

  lives = 3; 
  livesLabel = this.add.text(605, 550, "Lives: " + lives, {
    font: "35px Arial",
    fill: "black"
  });
  this.add.text(20, 585, "Abdul-Azeez Akiyele"); 
  this.help = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
  this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  this.quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);



}

function update (){
  if (gameOver)
  {
      return;
  }
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);

      player.anims.play('left', true);
  } else if (cursors.right.isDown)
  {
      player.setVelocityX(160);

      player.anims.play('right', true);
  }else{
      player.setVelocityX(0);

      player.anims.play('turn');
  }
  if (cursors.up.isDown && player.body.touching.down){
      player.setVelocityY(-330);
  }
   if(this.lives ==0){
    this.scene.stop(); 
  }
  if((this.help.isDown)){
      this.scene.pause();
      this.add.text(200, 100, "Arrow keys allow you to move\n Collect as many coins as possible\n Watch out for The Undead\n You only get three lives\n Press N to restart\n Press Q to Quit", {
        font: "35px Copperplate",
        fill: "green"
      });

  }

    if(this.restart.isDown){
      this.scene.restart(); 
    }
    if (this.quit.isDown){
      this.music.stop(); 
      this.scene.stop(); 
    }
}

function collectCoins (player, coins){
  this.coin_sound.play(); 

  coins.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (coins.countActive(true) === 0){
      coins.children.iterate(function (child) {

          child.enableBody(true, child.x, 0, true, true);
      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var undead = bombs.create(x, 16, 'undead');
      undead.setBounce(1);
      undead.setCollideWorldBounds(true);
      undead.setVelocity(Phaser.Math.Between(-200, 200), 20);
      undead.allowGravity = false;
  }
}

function hitUndead (player, undead){
  lives = lives - 1; 
  livesLabel.text = "Lives: " + lives;
  this.ow_sound.play(); 

  player.setTint(0xff0000);

  if (lives ==0){
    this.music.stop(); 
    player.anims.play('turn');
    this.physics.pause();
    gameOver = true;
    this.add.text(400, 300, "Game Over"); 
  }
}


  


