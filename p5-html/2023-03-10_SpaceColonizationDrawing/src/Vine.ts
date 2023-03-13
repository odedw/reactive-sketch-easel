import { Vector } from 'p5';
import { AttractionPoint } from './AttractionPoint';
import { Branch } from './Branch';
import { makeNoise2D } from 'open-simplex-noise';
import { Noise2D } from 'open-simplex-noise/lib/2d';

export class Vine {
  attractionPoints: AttractionPoint[] = [];
  branches: Branch[] = [];
  flowerColor: string;
  branchColor: string;
  noise2D: Noise2D;

  constructor(
    branchColor: string,
    flowerColor: string,
    attractionPointPositions: { v: Vector; sproutFlower: boolean }[],
    branchPositions: Vector[]
  ) {
    this.flowerColor = flowerColor;
    this.branchColor = branchColor;
    this.noise2D = makeNoise2D(Date.now() + random(0, 10000000));
    for (const ap of attractionPointPositions) {
      this.attractionPoints.push(new AttractionPoint(ap.v, ap.sproutFlower));
    }

    for (const v of branchPositions) {
      this.branches.push(new Branch(this.branchColor, this.flowerColor, null, v, new Vector(0, -1)));
    }
  }

  step(MAX_DISTANCE: number, MIN_DISTANCE: number) {
    // find closest branch for each attraction point
    for (let i = 0; i < this.attractionPoints.length; i++) {
      const ap = this.attractionPoints[i];
      let closestBranch = null;
      let minDistance = MAX_DISTANCE;
      for (let j = 0; j < this.branches.length; j++) {
        const branch = this.branches[j];
        var d = Vector.dist(ap.pos, branch.pos);
        if (d < MIN_DISTANCE) {
          ap.reached = true;
          closestBranch = null;
          branch.dead = true;
          branch.ap = ap;
          break;
        } else if (d < minDistance) {
          closestBranch = branch;
          minDistance = d;
        }
      }

      // if found add direction
      if (closestBranch != null) {
        var newDir = Vector.sub(ap.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;
      }
    }

    // sprout new branches
    for (let i = this.branches.length - 1; i >= 0; i--) {
      const branch = this.branches[i];
      if (branch.count > 0) {
        const newBranch = branch.sprout();
        this.branches.push(newBranch);
      }
    }
    // console.log(this.attractionPoints.length, this.branches.length);
  }

  draw() {
    this.branches.forEach((b) => b.draw());
  }

  cleanup(viewport: Vector) {
    // remove attraction points that were reached
    let ap = 0;
    let b = 0;
    for (let i = this.attractionPoints.length - 1; i >= 0; i--) {
      if (this.attractionPoints[i].reached || this.attractionPoints[i].pos.y + viewport.y > height * 1.1) {
        this.attractionPoints.splice(i, 1);
        ap++;
      }
    }

    // for (let i = this.branches.length - 1; i >= 0; i--) {
    //   if (this.branches[i].pos.y + viewport.y > height * 1.1) {
    //     this.branches.splice(i, 1);
    //   }
    // }

    for (let i = this.branches.length - 1; i >= 0; i--) {
      if (this.branches[i].done) {
        this.branches.splice(i, 1);
        b++;
      }
    }
    // console.log(this.attractionPoints.length, this.branches.length);
    // console.log(this.branches[1]);
  }
}
