import * as PIXI from 'pixi.js';

/**
   * create FPS class
   * @param app - reference to my pixi app
   */

export class Fps{
    _lastTime:number;
    _timeValues:Array<number>=[];

    _fpsTextField:PIXI.Text;
    container:PIXI.Container;
    constructor(app:PIXI.Application) {

       this._lastTime = new Date().getTime();

       this.container = new PIXI.Container();

       const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: '#ffffff'
    });
       this._fpsTextField = new PIXI.Text("FPS",style);

       app.stage.addChild(this.container);
       this.container.addChild(this._fpsTextField);

      
    }measureFPS() {
      var currentTime = new Date().getTime();
      this._timeValues.push(1000 / (currentTime - this._lastTime));
      if (this._timeValues.length === 30) {
        var total = 0;
        for (var i = 0; i < 30; i++) {
          total += this._timeValues[i];
        }
        this._fpsTextField.text = `FPS : ${(total / 30).toFixed(2)}`;
        this._timeValues.length = 0;
      }
      this._lastTime = currentTime;
    }
}