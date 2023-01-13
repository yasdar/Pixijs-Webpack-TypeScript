import * as PIXI from 'pixi.js';
const particles = require('@pixi/particle-emitter')

 /**
   * create ParticulesFlame calss
   * @param app - reference to my pixi app
   * @param Textures - reference to my pixi app Textures
   */

export class ParticulesFlame{

    container:PIXI.Container;
    app:PIXI.Application;
    Textures:any;

    emitter:any;
    elapsed:number=0;

    Playing:boolean= false;
    constructor(app:PIXI.Application,Textures:any) {
       this.Textures = Textures;
       this.app = app;
       this.container = new PIXI.Container();
       this.app.stage.addChild(this.container);
       this.container.position.set(this.app.screen.width*0.5,this.app.screen.height*0.6)

       this.emitter = new particles.Emitter(
        this.container,
        {
            "lifetime": {
                "min": 0.75,
                "max": 1
            },
            "frequency": 0.1,
            "emitterLifetime": 0,
            "maxParticles": 10,
            "addAtBack": false,
            "pos": {
                "x": 0,
                "y": 0
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.7
                                },
                                {
                                    "time": 1,
                                    "value": 0
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeedStatic",
                    "config": {
                        "min": 50,
                        "max": 100
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.1
                                },
                                {
                                    "time": 2,
                                    "value": 1
                                }
                            ]
                        },
                        "minMult": 1
                    }
                },
             {
                    "type": "color",
                    "config": {
                        "color": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": "fff191"
                                },
                                {
                                    "time": 1,
                                    "value": "E25822"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 0,
                        "minSpeed": -10,
                        "maxSpeed": 10,
                        "minStart": 270,
                        "maxStart": 270
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            "assets/images/flame.png",
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "torus",
                        "data": {
                            "x": 0,
                            "y": 0,
                            "radius": 0,
                            "innerRadius": 0,
                            "affectRotation": false
                        }
                    }
                }
            ]
        }
    );
      // Calculate the current time
        this.elapsed = Date.now();
  }
  updateParticules(){
	var now = Date.now();
	// The emitter requires the elapsed
	// number of seconds since the last update
	this.emitter.update((now - this.elapsed) * 0.001);
	this.elapsed = now;
};
  Start(){
    if( !this.Playing ){
        this.container.visible = true;
        this.emitter.emit = true;
        this.Playing = true;
    }
  }
 
  diseable(){
    this.Playing = false;
    this.container.visible = false;
  }
  setPosition(X:number,Y:number){
    //control the flame position
    this.container.position.set(X,Y);
  }
}