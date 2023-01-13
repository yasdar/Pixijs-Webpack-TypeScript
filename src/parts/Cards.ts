import * as PIXI from 'pixi.js';
import gsap from "gsap";
import { TotalCard } from '../config';

/**
   * create Mix Class
   * * the total number of cards is defined in TotalCard
   * @param app - reference to my pixi app
   * @param Textures - reference to my pixi app Textures
   */
 
export class Cards{

    container:PIXI.Container;
    all_cards:Array<PIXI.Sprite>;
    app:PIXI.Application;
    Textures:any;
    //tween refrence
    tween:gsap.core.Timeline;
    
    constructor(app:PIXI.Application,Textures:any) {

       this.Textures = Textures;
       this.app = app;
       this.container = new PIXI.Container();
       app.stage.addChild(this.container);
      
       this.CreateSprites();
       this.ArrangeCards();

       //hide this
       this.container.visible = false;
      
    }CreateSprites(){
      this.all_cards = [];
      //create cards
      for(let i=0; i< TotalCard ; i++){
        let card:PIXI.Sprite = new PIXI.Sprite(this.Textures.AC);
         card.anchor.set(0.5,0.5);
         card.scale.set(0.5,0.5)
         this.container.addChild(card);
         this.all_cards.push(card);
      }
     //arrage cards, start with the top card
     this.all_cards.reverse();
  }ArrangeCards(){
   //arrange cards and tinit them randomly
   for(let i=0; i< TotalCard ; i++){
   let card:any= this.container.getChildAt(i);
   card.position.set((this.app.screen.width*0.3),(this.app.screen.height*0.3)+(i*1.25))
   card.tint = Math.random() * 0xFFFFFF;
   }
  }
  Start(){
   this.container.visible = true;
   this.AnimateCards();
  }
  AnimateCards(){
     //move cards
     this.tween = gsap.timeline();
     this.all_cards.forEach((card:PIXI.Sprite)=>{
      this.tween.to(card, {
           delay:this.all_cards.indexOf(card),
           x:this.app.screen.width*0.8, 
           duration: 2,
           onStart:()=>{ 
              //bring to top
              this.container.setChildIndex(card,this.all_cards.length-1);
           }
        });
     })
  }diseable(){
   this.container.visible = false;
   //kill all tweens
   this.tween.kill();
  // reset cards
  this.ArrangeCards();
  }

}