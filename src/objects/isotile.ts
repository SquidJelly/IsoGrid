import { Graphics, Point } from "pixi.js";
import { indexToIso } from "../util/math";
import { SelectTileEvent } from "../events/event";
import { COLOR } from "../util/constants";

/** Isometric Tile */
export class IsoTile extends Graphics
{
    private color:COLOR = COLOR.GRAY;

    private isHighlighted:boolean   = false;
    private isSelected:boolean      = false;

    constructor(readonly row:number, readonly column:number)
    {
        super();

        this.zIndex = row + column;

        const pos:Point = indexToIso(new Point(row, column));
        this.position.set(pos.x, pos.y);

        this.interactive = true;
        this.on("mouseover", () => this.setHighlight(true));
        this.on("mouseout", () => this.setHighlight(false));

        //toggle selected tile
        this.on("mousedown", () => this.setSelected(!this.isSelected));

        this.redraw();
    }

    public setSelected(bool:boolean):void
    {
        this.isSelected = bool;
        this.redraw();
        //Emit event to parent grid to deselect previously selected tile
        if(this.isSelected)
            this.parent.emit(SelectTileEvent.name, new SelectTileEvent(this.row, this.column));
    }

    public setHighlight(bool:boolean):void
    {
        this.isHighlighted = bool;
        this.redraw();
    }

    public setColor(color:COLOR):void
    {
        this.color = color;
        this.redraw();
    }

    /** Redraws tile graphic */
    public redraw():void
    {
        const fill:number = (this.isSelected)? COLOR.RED : this.color;

        this.clear();
        this.beginFill(fill);
        this.drawPolygon(POLY);
        this.endFill();

        //draw highlighted border
        if(this.isHighlighted)
        {
            this.lineStyle(2, COLOR.YELLOW);
            this.moveTo(POLY[0], POLY[1]);
            for (let i = 2; i < POLY.length; i += 2)
                this.lineTo(POLY[i], POLY[i + 1]);
            this.lineTo(POLY[0], POLY[1]);
        }
    }
}

//Cache iso poly array
const POLY:number[] = constructIsoPoly();

/** Creates an isometric polygon array */
function constructIsoPoly():number[]
{
    //Unit vertices of an orthogonal square
    const BOX:Point[] = [
        new Point(0, 0),
        new Point(1, 0),
        new Point(1, 1),
        new Point(0, 1),
    ];

    let pts:number[] = new Array();
    for (let i = 0; i < BOX.length; i++)
    {
        const pt:Point = indexToIso(BOX[i]);
        pts.push(pt.x, pt.y);
    }
    return pts;
}