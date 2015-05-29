function loadScenes(){


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
        Q.stageScene("mainMenu", 1);
      });
    }
  });

  /*-----  End of Background   ----*/

  /*==================================
  =             Main Menu            =
  ==================================*/

  Q.scene("mainMenu", function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2 , y: Q.height/2 + Q.height/10, fill: "#444444", border: 1.5
    }));

    var button1 = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#337ab7", label: "Level 1", border: 1}));
    var button2 = container.insert(new Q.UI.Button({ x: 0, y: 60, fill: "#337ab7", label: "Level 2", border: 1 }));
    var button3 = container.insert(new Q.UI.Button({ x: 0, y: 120, fill: "#337ab7", label: "Legend", border: 1 }));
    button1.on("click",function() {
      Q.clearStages();
      Q.stageScene('level1');
    });
    button2.on("click",function() {
    });
    button3.on("click",function() {
      Q.stageScene('legend', 2);
    });

    container.fit(20);
  });

  /*==================================
  =              Legend             =
  ==================================*/

  Q.scene("legend", function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2 , y: 20, fill: "#444444", border: 1.5
    }));

    var text1 = container.insert(new Q.UI.Text({ x: 0, y: 0, fill: "#337ab7", label: "End of game node, you will\n win if you find this node", scale: 0.6, color: "white"}));
    var node1 = container.insert(new Q.UI.Button({asset: 'endNode.png', x: 0, y: 60, scale: 1}));
    var text2 = container.insert(new Q.UI.Text({ x: 0, y: 80, fill: "#337ab7", label: "Caution! if you see this node\n crocodiles will kill you if you\n don't have a sword", scale: 0.6, color: "white"}));
    var node2 = container.insert(new Q.UI.Button({asset: 'enemyNode.png', x: 0, y: 150, scale: 1}));
    var text3 = container.insert(new Q.UI.Text({ x: 0, y: 170, fill: "#337ab7", label: "In this node you will find useful\n objects like swords or gems", scale: 0.6, color: "white"}));
    var node4 = container.insert(new Q.UI.Button({asset: 'objectNode.png', x: 0, y: 230, scale: 1}));
    //var text4 = container.insert(new Q.UI.Text({ x: 0, y: 300, fill: "#337ab7", label: "Legend", border: 1 }));
    var back = container.insert(new Q.UI.Button({ x: 0, y: 420, fill: "#337ab7", label: "Back", border: 1 }));

    back.on("click",function() {

      Q.stageScene('mainMenu', 2);
    });

    container.fit(10, 10);
  });

  /*==================================
  =            Stats Container      =
  ==================================*/

  Q.scene("stats", function(stage) {
    var statsContainer = stage.insert(new Q.UI.Container({
        x: 0,
        y: 0
      })
    );
    var messageLabel = stage.insert(new Q.Message(), statsContainer);
    var scoreLabel = stage.insert(new Q.Score(), statsContainer);
    var swordLabel = stage.insert(new Q.SwordLabel(), statsContainer);
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
      if(Q.stage().scene.name == "initGame")
        Q.stageScene("mainMenu", 1);
    });


  });


//level1
  Q.scene("level1",function(stage) {
    Q.stageTMX("level1.tmx",stage);
    //crate elements
    Q.state.reset({ message: " "});
    Q.state.reset({ score: "0"});
    Q.state.reset({ swordLabel: 0});
    Q.stageScene("stats", 1);
    trace = new Array();
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
}