import { Point } from "pixi.js";
import { TILE_HALF, SKEW } from "./constants";

/** Converts orthogonal indicies to isometric tile coords */
export function indexToIso(ortho:Point):Point
{
    let x:number = (ortho.x - ortho.y) * TILE_HALF;
    let y:number = (ortho.x + ortho.y) * TILE_HALF * SKEW;
    return new Point(x, y);
}

/** Converts isometric tile coords to an orthogonal 2D index */
export function isoToIndex(iso:Point):Point
{
    const dx:number = iso.x / TILE_HALF;
    const dy:number = iso.y / TILE_HALF / SKEW;
    let x:number = (dx + dy) * 0.5;
    let y:number = (dy - dx) * 0.5;
    return new Point(x, y);
}