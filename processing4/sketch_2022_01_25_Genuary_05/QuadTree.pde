public enum State {
  PRE_MOVING,
  MOVING,
  PRE_ZOOMING,
  ZOOMING,
  PRE_SUBDIVIDE,
  SUBDIVIDING,
  SUBDIVIDED;
  
  public State next() {
    // No bounds checking required here, because the last instance overrides
    return values()[ordinal() + 1];
  }
}

class Quadtree{
  Rect boundary;
  State state;
  float scale;
  
  int horizontal, vertical, frameCount, moveDelay, subdivideDelay, level, zoomDelay;
  float divideSpeed;
  PVector dest;
  
  Quadtree northeast;
  Quadtree northwest;
  Quadtree southeast;
  Quadtree southwest;
  Quadtree(Rect boundary, State state, int level, int initialScale) {
    this.boundary = boundary;
    this.state = state;
    this.moveDelay = 30 + int(random( -1, 1));
    this.subdivideDelay = 30;
    this.zoomDelay = 30;
    this.divideSpeed = max(this.boundary.w / 20.0, 1);
    this.dest = new PVector(random(boundary.w / 2, width - boundary.w / 2), random(boundary.h, height - boundary.h / 2));
    this.level = level;
    this.scale = initialScale;
    
    maxLevel = max(level, maxLevel);
    
  }
  
  void spawnTrees() {
    northeast = new Quadtree(new Rect(this.boundary.x + this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1);
    northwest = new Quadtree(new Rect(this.boundary.x - this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1);
    southeast = new Quadtree(new Rect(this.boundary.x + this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1);
    southwest = new Quadtree(new Rect(this.boundary.x - this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1);
  }
  
  void draw() {
    noFill();
    if (this.state != State.SUBDIVIDED) {
      pushMatrix();
      translate(this.boundary.x, this.boundary.y);
      scale(this.scale);
      rect(0,0, this.boundary.w, this.boundary.h);
      line(0, -this.boundary.h / 2,0, -this.boundary.h / 2 + min(vertical, this.boundary.h));
      line( -this.boundary.w / 2, 0, -this.boundary.w / 2 + min(horizontal,this.boundary.w), 0);
      popMatrix();
    } else {
      this.northeast.draw();
      this.northwest.draw();
      this.southeast.draw();
      this.southwest.draw();
    }
  }
  
  void update() {
    if (this.state == State.PRE_MOVING) {
      if (this.frameCount < this.moveDelay) {
        this.frameCount++;
      } else {
        this.frameCount = 0;
        this.state = this.state.next();
      }
    } else if (this.state == State.MOVING) {
      this.boundary.x = lerp(this.boundary.x, this.dest.x, 0.07);
      this.boundary.y = lerp(this.boundary.y, this.dest.y, 0.07);
      if (dist(this.boundary.x, this.boundary.y, this.dest.x, this.dest.y) < 1) {
        this.boundary.x = this.dest.x;
        this.boundary.y = this.dest.y;
        this.state = this.state.next();
      }
    } else if (this.state == State.PRE_ZOOMING) {
      if (this.scale == 1 || this.frameCount >= this.zoomDelay) {
        this.frameCount = 0;
        this.state = this.state.next();
      } else if (this.frameCount < this.zoomDelay) {
        this.frameCount++;
      } 
    } else if (this.state == State.ZOOMING) {
      this.scale = lerp(this.scale, 1, 0.07);
      if (this.scale <= 1.000001) {
        this.state = this.state.next();
      }
    } else if (this.state == State.PRE_SUBDIVIDE) {
      if (this.frameCount < this.subdivideDelay) {
        this.frameCount++;
      } else {
        this.frameCount = 0;
        this.state = this.state.next();
      }
    } else if (this.state == State.SUBDIVIDING) {
      if (this.horizontal < this.boundary.h) {
        this.horizontal += this.divideSpeed;
      } else if (this.vertical < this.boundary.w) {
        this.vertical += this.divideSpeed;
      } else {
        this.spawnTrees();
        this.state = this.state.next();
      }
    } else if (this.state == State.SUBDIVIDED) {
      this.northeast.update();
      this.northwest.update();
      this.southeast.update();
      this.southwest.update();
    }        
  }
}