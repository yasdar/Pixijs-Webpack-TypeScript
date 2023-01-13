import * as PIXI from 'pixi.js';
import { MixObject, MixObjectOptions } from '../config';


 /**
   * create Mix Class
   * * this class use images and text defined in MixObject
   * @param app - reference to my pixi app
   * @param Textures - reference to my pixi app Textures
   */

export class Mix{

  
    container:PIXI.Container;
    app:PIXI.Application;

    counter:number=0;
    //timer reference
    myTimeout:any;
    Loop:boolean=false;
    Textures:any;
    // it depand on textfield height
    MaxHeight:number; 
    // check next (vertical) position
    NextX:number; 
    //vertical gap between elements
    GapX:number=12;
    
    constructor(app:PIXI.Application,Textures:any) {
      this.Textures = Textures;
      this.app = app;
      }
  Start(){

    //destroy all created elements ( images and text);
    if(this.container){this.container.destroy();}
    //recreate the container
    this.container = new PIXI.Container();
    this.container.position.set(50,this.app.screen.height*0.4);
    this.app.stage.addChild(this.container);
    //reset x posyion and height
    this.NextX = 0;
    this.MaxHeight = MixObjectOptions.DefaultIconHeight;
    //get elemnt from MixObject const
    let Elements:Array<string>=MixObject[this.counter];
    //create image or text
    Elements.forEach((element:string)=>{
        if(element.charAt(0)=='#'){this.addimage(element.replace('#',''))}
        else{this.addText(element)}
    })
    //set scale and postions
    this.arrangeElements();
    //looping each 2 seconds
    this.myTimeout = setTimeout(() => {
        if(this.Loop){ 
            this.counter++;
            if(this.counter>=MixObject.length){this.counter = 0}
            this.Start();
        } 
    }, 2000);
  }
  addText(text:string){
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: MixObjectOptions.MinFontSize + Math.round(Math.random()*(MixObjectOptions.MaxFontSize-MixObjectOptions.MinFontSize)),
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: '#ffffff'
    });
   let TextField = new PIXI.Text(text,style);
   TextField.anchor.set(0,0.5);
   TextField.name ='txt';
   this.container.addChild(TextField);
   //get text height
   this.MaxHeight = TextField.height;
  }addimage(key:string){
    let ico:PIXI.Sprite = new PIXI.Sprite(this.Textures[key]);
    ico.anchor.set(0,0.5);
    ico.name ='sp';
    this.container.addChild(ico);
  }
  arrangeElements(){
    //horizental arrangment
    // icon scale depand on the text height
    this.container.children.forEach((display:any)=>{
        //an image
        if( display.name == "sp"){
            //calculate scale
            let sc = this.MaxHeight/display.height;
            display.scale.set(sc,sc);
            //set position X
            display.position.set(this.NextX,0);
            this.NextX = this.NextX + display.width+this.GapX;
        }
        //a text
        else if( display.name == "txt"){
            //check position
            display.position.set(this.NextX,0);
             //set position X
            this.NextX = this.NextX + display.width+this.GapX;
        }
    })
  }
  diseable(){
   //destroy all created elements ( images and text);
   this.container.destroy();
   //stop looping
   this.Loop = false;
   //reset counter
   this.counter = 0;
   //remove timer
   clearTimeout(this.myTimeout);
  }
}