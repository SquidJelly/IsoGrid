import { expect } from 'chai';
import { Point } from 'pixi.js';
import { SKEW, TILE_HALF } from '../util/constants';
import { indexToIso } from '../util/math';

describe('Math', function () {

    describe(indexToIso.name, function () {

        it('should exist', function () {
            expect(indexToIso).to.be.a('function');
        });

        const testCases = [
            [[0,0],[0,0]],
            [[1,0],[TILE_HALF, TILE_HALF * SKEW]],
            [[0,1],[-TILE_HALF, TILE_HALF * SKEW]],
            [[1,1],[0,TILE_HALF]],
        ];

        const testPoints:Array<Array<Point>> = [];
        testCases.forEach(array => {
            const indexPt   = new Point(array[0][0], array[0][1]);
            const isoPt     = new Point(array[1][0], array[1][1]);
            testPoints.push([indexPt, isoPt]);
        });

        testPoints.forEach(([index, iso]) => {
            it(`should properly convert ${index.toString()} to ${iso.toString()}`, () =>{
                const converted = indexToIso(index);
                expect(converted.x).to.equal(iso.x);
                expect(converted.y).to.equal(iso.y);
            });
        });

    });
    
});