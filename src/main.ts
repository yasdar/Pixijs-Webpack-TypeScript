import * as PIXI from 'pixi.js';
import { GameCanvas, assets } from './config';
import { Fps } from './parts/Fps';
import { Cards } from './parts/Cards';
import { Menu } from './parts/Menu';
import { Mix } from './parts/Mix';
import { ParticulesFlame } from './parts/ParticulesFlame';


/**
   * create the game and start the menu
   */

export class GameManager{
    app:PIXI.Application;
    //Textures reference
    TextTures:any;
    //reference to the current diaplay
    CurrentDisplay:any;
   // constainers ( classes )
    fps:Fps;
    menu:Menu;
    cards:Cards;
    mix:Mix;
    particulesFlame:ParticulesFlame;
    constructor(){
       //create the game
       this.app = new PIXI.Application(GameCanvas);	
       //add the game to html
       document.body.appendChild(this.app.view as HTMLCanvasElement);
       //add fps
       this.fps = new Fps(this.app);
       //start loading assets
       this.loadAssets();
      //listen for frame updates
      this.app.ticker.add(() => {this.update();});
    }
    async loadAssets() {
      //load all graphic assets defined in the assets (config.ts)
      let keys:Array<string>=[];
      assets.images.forEach((img)=>{
        PIXI.Assets.add(img.key, img.src); keys.push(img.key)
      });
      const texturesPromise = PIXI.Assets.load(keys);
      texturesPromise.then((textures) => {
         this.TextTures = textures;
         //create the menu
         this.createParts();
      });
    }createParts(){

      this.menu = new Menu(this.app, this.TextTures,this.Show.bind(this));
      // prepare the 3 parts
      this.cards = new Cards(this.app,this.TextTures);
      this.mix = new Mix(this.app,this.TextTures);
      this.particulesFlame = new ParticulesFlame(this.app,this.TextTures);

    }
    update(){
      //update the FPS meter
      this.fps.measureFPS();
      //update Particules if exist
      if(this.particulesFlame){
        if(this.particulesFlame.Playing){
          this.particulesFlame.updateParticules();
        }
      }
     
    }
    Show(arg:string){
      //disactivate the current part
      if(this.CurrentDisplay){this.CurrentDisplay.diseable();}
      //show 
      switch(arg) {
         case 'cards':
          this.showCards();
           break;
         case 'mix':
            this.showMix();
           break;
         case 'particules':
            this.showParticules();
           break;
       }
    }
    showCards(){
     this.cards.Start();
     this.CurrentDisplay = this.cards;
    }showMix(){
      this.mix.Loop = true;
      this.mix.Start();
      this.CurrentDisplay = this.mix;
    }showParticules(){
      this.particulesFlame.Start();
      this.CurrentDisplay = this.particulesFlame;
    }
};

     
 window.onload = function () {
     new GameManager();
 }
 
