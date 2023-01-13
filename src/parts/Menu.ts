import * as PIXI from 'pixi.js';

 /**
   * create menu Class
   * @param app - reference to my pixi app
   * @param Textures - reference to my pixi app Textures
   * @param Callback
   */

export class Menu{

    container:PIXI.Container;
    app:PIXI.Application;
    //click callback reference
    Callback:Function;

    constructor(app:PIXI.Application,Textures:any,CallBack:Function) {

       this.Callback = CallBack;
       this.app = app;
       this.container = new PIXI.Container();
       
      //create and add 3 buttons
      this.container.addChild(
        //cards
        this.createButton(
            Textures.bt1,
            this.app.screen.width*0.24,
            this.app.screen.height*0.15,
            'cards'),
        //mix text and images
        this.createButton(
            Textures.bt2,
            this.app.screen.width*0.5,
            this.app.screen.height*0.15,
            'mix'),
        //particules
        this.createButton(
            Textures.bt3,
            this.app.screen.width*0.76,
            this.app.screen.height*0.15,
            'particules')
      );
     
      //add this menu to the game
      app.stage.addChild(this.container);

    }calculateScale(objectWidth:number):number{

        let MaxButtonWidth:number = this.app.screen.width*0.25;
        let sc:number = MaxButtonWidth/objectWidth;
        return sc;
    }
    createButton(btTexture:any,X:number,Y:number,callbackagument:string){
        let bt:PIXI.Sprite = new PIXI.Sprite(btTexture);
        bt.anchor.set(0.5,0.5);
        bt.scale.set(this.calculateScale(bt.width)); 
        bt.position.set(X,Y);
        //set interactive
        bt.interactive = true;
        bt.cursor = 'pointer';
        bt.on('pointertap', async () => {this.Callback(callbackagument);});
        return bt;
    }
}