import { Container, Point } from 'pixi.js'
import { IsoTile } from "./isotile";
import { indexToIso } from "../util/math";
import { SelectTileEvent } from "../events/event";
import { COLOR } from "../util/constants";

/** Creates an isometric grid with a variable width and height */
export class IsoGrid extends Container
{
    private tiles:Array<IsoTile>;

    //Reference to previously selected tile
    private selected:SelectTileEvent;

    constructor(readonly rows:number, readonly columns:number)
    {
        super();

        this.tiles = new Array<IsoTile>();
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0; j < this.columns; j++)
            {
                let tile:IsoTile = new IsoTile(i, j);
                this.tiles.push(tile);
                this.addChild(tile);
            }
        }

        //Set the border tiles green
        const borderTiles:Array<IsoTile> = this.tiles.filter((tile) => this.isBorderTile(tile));
        borderTiles.forEach(tile => {
            tile.setColor(COLOR.GREEN);
        });

        //listen for new selection events
        this.addListener(SelectTileEvent.name, this.handleSelectTileEvent);

        //position center
        const dimensions:Point = indexToIso(new Point(this.rows, this.columns));
        this.position.set(dimensions.x * -0.5, dimensions.y * -0.5);

        this.sortableChildren = true;
    }

    /** Indicates whether the tile is on the border of the grid */
    private isBorderTile(tile:IsoTile): boolean {
        return tile.row < 1 || tile.row >= this.rows - 1 || tile.column < 1 || tile.column >= this.columns - 1;
    }

    /** Deselects the previously selected tile */
    private handleSelectTileEvent(e:SelectTileEvent)
    {
        if(this.selected?.row != null && this.selected?.column != null)
        {
            const index:number = this.getTileIndex(this.selected.row, this.selected.column);
            this.tiles[index].setSelected(false);
        }
        this.selected = e;
    }

    /** Get the 1D tile index from row / column coords */
    private getTileIndex(row:number, column:number):number{
        return this.columns * row + column;
    }
}