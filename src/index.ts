import { Application } from "pixi.js";
import { IsoGrid } from "./objects/isogrid";

const CANVAS_WIDTH:number   = 1280;
const CANVAS_HEIGHT:number  = 720;

const app = new Application({
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT
});
document.getElementById("scene").appendChild(app.view);


function init() 
{
    const grid:IsoGrid = new IsoGrid(10, 10);
    app.stage.addChild(grid);

    app.stage.position.set(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);
}

window.onload = init;
