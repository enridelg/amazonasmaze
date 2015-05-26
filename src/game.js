/**
*
* @name AmazonasMaze
* @author Jesus Vazquez Pigueiras
* @author Diego Díaz Bailón
* @author Enrique Delgado Solana
*
**/

var game = function () {
	var Q = window.Q = Quintus()
		.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
		.enableSound()
		.setup({width: 320, height:  480})
		.controls().touch();

		Q.gravityY = 0;
		Q.gravityX = 0;

	/*==============================
	=          		Boat		         =
	==============================*/

	Q.animations('boat', {
		move_right: 		{ frames: [19, 20, 21, 22, 23, 24, 25, 26], rate: 1/5 },
		move_left: 		{ frames: [46, 47, 48, 49, 50, 51, 52, 53], rate: 1/5 },
		move_top: 		{ frames: [1, 2, 3, 4, 5, 6, 7, 8], rate: 1/5 },
		move_bottom: 		{ frames: [37, 38, 39, 40, 41, 42, 43, 44], rate: 1/5 },
		stand_right: 	{ frames: [18] },
		stand_left: 	{ frames: [45] },
		stand_top: 	{ frames: [0] },
		stand_bottom: 	{ frames: [36] },
		sink_boat: { frames: [56, 57, 58, 59] }
	});

	Q.Sprite.extend("Boat", {
		init: function(p) {
			this._super(p, {
					sheet: "boatT",
					sprite: "boat",
					frame: 0,
					moving: false,
					speed: 300,
					collisionMask: Q.SPRITE_ACTIVE,
					vx: 0,
					vy: 0,
					sword: false
				});

				this.add('2d, animation, tween');
				this.play("stand_right");
				this.on("hit");
		},
		hit: function(collision){
			// Asi ponemos lo que queramos
			Q.state.set("message","Corred Insensatos!");
			// Asi lo quitamos
			//Q.state.set("message","");

			// console.log(collision.obj);
			// a = collision.obj;
		},
		step: function(dt) {
			if(!this.p.moving){
				if(Q.inputs['up'] && map_data[this.p.actualNode].north != null){
					//nos movemos y hacemos animacion
					Q.inputs['up'] = false;
					this.p.moving = true;
					this.p.actualNode = map_data[this.p.actualNode].north;
					this.p.vy = -this.p.speed;
					this.play("move_top");

				}else if(Q.inputs['down'] && map_data[this.p.actualNode].south != null){
					//nos movemos y hacemos animacion
					Q.inputs['down'] = false;
					this.p.moving = true;
					this.p.actualNode = map_data[this.p.actualNode].south;
					this.p.vy = this.p.speed;
					this.play("move_bottom");

				}else if(Q.inputs['left'] && map_data[this.p.actualNode].west != null){
					//nos movemos y hacemos animacion
					Q.inputs['left'] = false;
					this.p.moving = true;
					this.p.actualNode = map_data[this.p.actualNode].west;
					this.p.vx = -this.p.speed;
					this.play("move_left");

				}else if(Q.inputs['right'] && map_data[this.p.actualNode].east != null){
					//nos movemos y hacemos animacion
					Q.inputs['right'] = false;
					this.p.moving = true;
					this.p.actualNode = map_data[this.p.actualNode].east;
					this.p.vx = this.p.speed;
					this.play("move_right");
				}
			}else{
				if(this.p.vx > 0 || this.p.vy > 0){
					if(this.p.x + dt * this.p.vx > map_data[this.p.actualNode].x ||
						this.p.y + dt * this.p.vy > map_data[this.p.actualNode].y){

							if(this.p.vx > 0){ //right
								this.p.vx = 0;
								this.p.x = map_data[this.p.actualNode].x;
								this.play("stand_right");
							}
							else{							//botom
								this.p.vy = 0;
								this.p.y = map_data[this.p.actualNode].y;
								this.play("stand_bottom");
							}
							this.p.moving = false;
						}else{
							this.p.x = this.p.x + dt * this.p.vx;
							this.p.y = this.p.y + dt * this.p.vy;
						}

				}else {
					if(this.p.x + dt * this.p.vx < map_data[this.p.actualNode].x ||
						this.p.y + dt * this.p.vy < map_data[this.p.actualNode].y){
							if(this.p.vx < 0){ //left
								this.p.vx = 0;
								this.p.x = map_data[this.p.actualNode].x;
								this.play("stand_left");
							}
							else{							//top
								this.p.vy = 0;
								this.p.y = map_data[this.p.actualNode].y;
								this.play("stand_top");
							}
							this.p.moving = false;
						}else{
							this.p.x = this.p.x + dt * this.p.vx;
							this.p.y = this.p.y + dt * this.p.vy;
						}
				}

			}
		}
	});

	/*==============================
	=        Enemy Boat		         =
	==============================*/

	Q.animations('eBoat', {
		move_right: 		{ frames: [19, 20, 21, 22, 23, 24, 25, 26], rate: 1/5 },
		move_left: 		{ frames: [46, 47, 48, 49, 50, 51, 52, 53], rate: 1/5 },
		move_top: 		{ frames: [1, 2, 3, 4, 5, 6, 7, 8], rate: 1/5 },
		move_bottom: 		{ frames: [37, 38, 39, 40, 41, 42, 43, 44], rate: 1/5 },
		stand_right: 	{ frames: [18] },
		stand_left: 	{ frames: [45] },
		stand_top: 	{ frames: [0] },
		stand_bottom: 	{ frames: [36] }
	});

	Q.Sprite.extend("EBoat", {
	init: function(p) {
		this._super(p, {
			sheet: "eBoatT",
			sprite: "eBoat",
			frame: 0,
			moving: false,
			speed: 300,
			vx: 0,
			vy: 0
				//frame: 0,
				//jumpSpeed: -400,
				//speed: 300

			});

			this.add('animation, tween');
			this.play("stand_right");
	},

	step: function(dt) {
		if(!this.p.moving){
			/*
			if(Q.inputs['up'] && map_data[this.p.actualNode].north != null){
				//nos movemos y hacemos animacion
				Q.inputs['up'] = false;
				this.p.moving = true;
				this.p.actualNode = map_data[this.p.actualNode].north;
				this.p.vy = -this.p.speed;
				this.play("move_top");

			}else if(Q.inputs['down'] && map_data[this.p.actualNode].south != null){
				//nos movemos y hacemos animacion
				Q.inputs['down'] = false;
				this.p.moving = true;
				this.p.actualNode = map_data[this.p.actualNode].south;
				this.p.vy = this.p.speed;
				this.play("move_bottom");

			}else if(Q.inputs['left'] && map_data[this.p.actualNode].west != null){
				//nos movemos y hacemos animacion
				Q.inputs['left'] = false;
				this.p.moving = true;
				this.p.actualNode = map_data[this.p.actualNode].west;
				this.p.vx = -this.p.speed;
				this.play("move_left");

			}else if(Q.inputs['right'] && map_data[this.p.actualNode].east != null){
				//nos movemos y hacemos animacion
				Q.inputs['right'] = false;
				this.p.moving = true;
				this.p.actualNode = map_data[this.p.actualNode].east;
				this.p.vx = this.p.speed;
				this.play("move_right");
			}
			*/
		}else{
			if(this.p.vx > 0 || this.p.vy > 0){
				if(this.p.x + dt * this.p.vx > map_data[this.p.actualNode].x ||
					this.p.y + dt * this.p.vy > map_data[this.p.actualNode].y){

						if(this.p.vx > 0){ //right
							this.p.vx = 0;
							this.p.x = map_data[this.p.actualNode].x;
							this.play("stand_right");
						}
						else{							//botom
							this.p.vy = 0;
							this.p.y = map_data[this.p.actualNode].y;
							this.play("stand_bottom");
						}
						this.p.moving = false;
					}else{
						this.p.x = this.p.x + dt * this.p.vx;
						this.p.y = this.p.y + dt * this.p.vy;
					}

			}else {
				if(this.p.x + dt * this.p.vx < map_data[this.p.actualNode].x ||
					this.p.y + dt * this.p.vy < map_data[this.p.actualNode].y){
						if(this.p.vx < 0){ //left
							this.p.vx = 0;
							this.p.x = map_data[this.p.actualNode].x;
							this.play("stand_left");
						}
						else{							//top
							this.p.vy = 0;
							this.p.y = map_data[this.p.actualNode].y;
							this.play("stand_top");
						}
						this.p.moving = false;
					}else{
						this.p.x = this.p.x + dt * this.p.vx;
						this.p.y = this.p.y + dt * this.p.vy;
					}
			}

		}
	}
	});



	/*==============================
	=          		Nodes	         =
	==============================*/

	//Common Node
	Q.animations('nodeB', {
		shine: { frames: [0, 1, 2], rate: 3 }
	});

	Q.Sprite.extend("Node", {
		init: function(p) {
			this._super(p, {
				sprite:"nodeB",
				sheet:"nodeB",
				frame: 0,
				type: Q.SPRITE_NONE

			});

				this.add('animation, tween');
		},

		step: function(dt) {
			this.play("shine");
		}
	});

	//Node End
	Q.animations('nodeO', {
		shine: { frames: [0, 1, 2], rate: 3 }
	});

	Q.Sprite.extend("NodeEnd", {
		init: function(p) {
			this._super(p, {
				sprite:"nodeO",
				sheet:"nodeO",
				frame: 0,
				sensor: true
		});

			this.add('animation, tween');
			this.on("sensor");
			this.on("hit", function(collide){
				console.log("hola");
			})
		},
		sensor: function(sensor) {
			console.log("sensor");
			if(sensor.isA("Boat")){
				console.log("win");
			}
		},

		step: function(dt) {
			this.play("shine");
		}
	});

	/*==============================
	=          		Sword 	         =
	==============================*/

	Q.animations('sword', {
	  float: { frames: [0, 1, 2, 3], rate: 1/2 }
	});

	Q.Sprite.extend("Sword", {
	  init: function(p) {
	    this._super(p, {
	      sprite:"sword",
	      sheet:"sword",
	      frame: 0,
	      sensor: true
	    });

	      this.add('animation, tween');
	      this.on("sensor");
	    },
	    sensor: function(sensor) {
	      if(sensor.isA("Boat")){
	        this.destroy();
	        sensor.p.sword = true;
	      }
	    },

	  step: function(dt) {
	    this.play("float");
	  }
	});

	/*==============================
	=          Background          =
	==============================*/

	Q.Sprite.extend("Background",{
		init: function(p) {
			this._super(p,{
				x: Q.width/2,
				y: Q.height/2,
				asset: 'intro_f.png'
			});
			this.on("touch",function() {
				Q.stageScene("level1");
			});
		}
	});

	/*-----  End of Background   ----*/




	/*==================================
	=            Message            =
	==================================*/

	Q.UI.Text.extend("Message", {
		init: function(p) {
			this._super({
				label: "Te han visto",
				color: "white",
				x: 150,
				y: 50
			});
			Q.state.on("change.message", this, "message");
		},

		message: function(message) {
			this.p.label = message;
		}
	});

	Q.scene("stats", function(stage) {
		var statsContainer = stage.insert(new Q.UI.Container({
				x: 0,
				y: 0
			})
		);
		var messageLabel = stage.insert(new Q.Message(), statsContainer);
	});



	/*==============================
	=            Scenes            =
	==============================*/

/*

	Q.scene('hud',function(stage) {
	  var container = stage.insert(new Q.UI.Container({
	    x: 50, y: 0
	  }));

	  var label = container.insert(new Q.UI.Text({x:100, y: 20,
	    label: "Coins: " + Q.state.get("coins"), color: "Black" }));

	  container.fit(20);


	  //Cuando hay un cambio de valor limpiamos la escena 1 y la volvemos a introducir
	  Q.state.on("change.coins", function() {
	  	Q.clearStage(1);
	  	Q.stageScene('hud', 1);
	  })
	});

*/

//initial scene
	Q.scene('initGame',function(stage) {

		//Q.clearStage(1);
		var bg = new Q.Background({ type: Q.SPRITE_UI });
		stage.insert(bg);
		//Q.audio.stop(); //Stop all the music

		Q.input.on("confirm",function() {
			//si estamos en la escena inicial cargamos el nivel 1
			if(Q.stage().scene.name == "initGame")
				Q.stageScene("level1");
		});


	});


//level1
	Q.scene("level1",function(stage) {
		Q.stageTMX("level1.tmx",stage);
		//crate elements
		Q.state.reset({ message: ""});
		Q.stageScene("stats", 1);
		boat = createElements(stage);
		stage.insert(boat);

		stage.add("viewport").follow(boat);
	 	//var boat = stage.insert(new Q.Boat({x:20, y:20}));
	 	//Q.audio.play('music_main.mp3', {loop: true});
/*
	 	var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0)"
		}));
*/
		//var label = stage.insert(new Q.UI.Text({x: Q.width/2, y: Q.height/2, label: "Coins: " }));

	 	//stage.add("viewport").follow(mario);//.follow(Q("Player").first());

	 	//stage.viewport.offsetX = -100;
	 	//stage.viewport.offsetY = 180;
	 	//stage.add("viewport").centerOn(150, 380);
	});


//End game scene
	Q.scene('endGame',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));

		var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Play Again" }))
		var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));
		button.on("click",function() {
			Q.clearStages();
			Q.stageScene('initGame');
		});

		container.fit(20);
	});

	/*-----   End of Scenes   -----*/

	Q.load(["intro_f.png",
						"boat.png", "boat_enemy.png", "boat.json", "eBoat.json",
						"nodes.png", "nodes.json",
						"sword.png", "sword.json",
						"bg.png", "tiles.png"], function() {

		Q.compileSheets("boat.png","boat.json");
		Q.compileSheets("boat_enemy.png","eBoat.json");
		Q.compileSheets("nodes.png","nodes.json");
		Q.compileSheets("sword.png","sword.json");

		Q.loadTMX("level1.tmx, tiles.png", function() {
			Q.stageScene("initGame");
		});
	});

};
