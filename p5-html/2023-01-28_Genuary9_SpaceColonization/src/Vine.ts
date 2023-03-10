import { Vector } from 'p5';
import { AttractionPoint } from './AttractionPoint';
import { Branch } from './Branch';
import { makeNoise2D } from 'open-simplex-noise';
import { Noise2D } from 'open-simplex-noise/lib/2d';

export class Vine {
  attractionPoints: AttractionPoint[] = [];
  branches: Branch[] = [];
  lowestY: number;
  spawnCenter: number;
  spawnWidth: number;
  flowerColor: string;
  branchColor: string;
  noise2D: Noise2D;

  constructor(numBranches: number, branchColor: string, flowerColor: string) {
    this.lowestY = height;
    this.spawnCenter = width / 2;
    this.spawnWidth = width;
    this.flowerColor = flowerColor;
    this.branchColor = branchColor;
    this.noise2D = makeNoise2D(Date.now() + random(0, 10000000));
    for (let i = 0; i < 1000; i++) {
      this.attractionPoints.push(new AttractionPoint(new Vector(random(width), random(height))));
    }

    for (let i = 0; i < numBranches; i++) {
      this.branches.push(
        // new Branch(null, new Vector((i + 1) * (width / (NUM_START_BRANCHES + 1)), height), new Vector(0, -1))
        new Branch(
          this.branchColor,
          this.flowerColor,
          null,
          new Vector(random(width), random(height / 2, height)),
          new Vector(0, -1)
        )
      );
    }
  }

  step(MAX_DISTANCE: number, MIN_DISTANCE: number) {
    this.spawnCenter = map(this.noise2D(frameCount / 100, 0), -1, 1, 0.1, width * 0.9);
    this.spawnWidth = map(this.noise2D(frameCount / 100, 1000), -1, 1, width * 0.2, width);

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
        if (newBranch.pos.y < this.lowestY) {
          this.lowestY = newBranch.pos.y;
          this.updateViewport();
        }
        this.branches.push(newBranch);
      }
    }
    // console.log(this.attractionPoints.length, this.branches.length);
  }
  updateViewport() {
    for (let j = 0; j < 4; j++) {
      this.attractionPoints.push(
        new AttractionPoint(
          new Vector(random(-this.spawnWidth / 2, this.spawnWidth / 2) + this.spawnCenter, this.lowestY - height * 0.25)
        )
      );
    }
  }

  draw() {
    this.branches.forEach((b) => b.draw());
  }

  cleanup(viewport: Vector) {
    // remove attraction points that were reached
    for (let i = this.attractionPoints.length - 1; i >= 0; i--) {
      if (this.attractionPoints[i].reached || this.attractionPoints[i].pos.y + viewport.y > height * 1.1) {
        this.attractionPoints.splice(i, 1);
      }
    }

    for (let i = this.branches.length - 1; i >= 0; i--) {
      if (this.branches[i].pos.y + viewport.y > height * 1.1) {
        this.branches.splice(i, 1);
      }
    }
  }
}
