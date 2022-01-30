public enum State {
  PRE_MOVING,
  MOVING,
  PRE_ZOOMING_OUT,
  ZOOMING_OUT,
  PRE_SUBDIVIDE,
  SUBDIVIDING,
  SUBDIVIDED;
  
  public State next() {
    // No bounds checking required here, because the last instance overrides
    return values()[ordinal() + 1];
  }
}

int easing;
class Quadtree{
  Rect boundary;
  State state;
  float scale;
  
  int  frameCount, moveDelay, subdivideDelay, level, zoomDelay, divideFrames, moveFrames,zoomFrames;
  float divideSpeed,horizontal, vertical;
  PVector dest, initialPos;
  
  Quadtree northeast;
  Quadtree northwest;
  Quadtree southeast;
  Quadtree southwest;
  ArrayList<Pixel> pixels;
  Quadtree(Rect boundary, State state, int level, int initialScale, ArrayList<Pixel> pixels) {
    this.boundary = boundary;
    this.state = state;
    this.moveDelay = 15;
    this.divideFrames = 60;
    this.moveFrames = 60 + int(random( -10, 10));;
    this.zoomFrames = 60;
    this.subdivideDelay = 15;
    this.zoomDelay = 15;
    this.divideSpeed = max(this.boundary.w / 20.0, 1);
    // this.dest = new PVector(random(boundary.w / 2, width - boundary.w / 2), random(boundary.h, height - boundary.h / 2));
    // println(pixels.size());
    this.pixels = pixels;
    int index = int(abs(randomGaussian() * 0.1 * pixels.size()));
    this.dest = pixels.get(index).pos;
    this.level = level;
    this.scale = initialScale;
    this.initialPos = new PVector(this.boundary.x, this.boundary.y);
    
    maxLevel = max(level, maxLevel);
    easing = CUBIC;
  }
  
  void spawnTrees() {
    northeast = new Quadtree(new Rect(this.boundary.x + this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1, this.pixels);
    northwest = new Quadtree(new Rect(this.boundary.x - this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1, this.pixels);
    southeast = new Quadtree(new Rect(this.boundary.x + this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1, this.pixels);
    southwest = new Quadtree(new Rect(this.boundary.x - this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), State.PRE_MOVING, this.level + 1, 1, this.pixels);
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
      // println("frameCount: " + this.frameCount);
      this.frameCount++;
      this.boundary.x = map2(this.frameCount, 0, this.moveFrames, this.initialPos.x, this.dest.x, easing, EASE_IN_OUT);
      this.boundary.y = map2(this.frameCount, 0, this.moveFrames, this.initialPos.y, this.dest.y, easing, EASE_IN_OUT);
      if (this.frameCount == this.moveFrames) {
        this.state = this.state.next();
        this.frameCount = 0;
      }
    } else if (this.state == State.PRE_ZOOMING_OUT) {
      this.frameCount++;
      if (this.frameCount >= this.zoomDelay || this.level > 1) {
        this.frameCount = 0;
        this.state = this.state.next();
      }
    } else if (this.state == State.ZOOMING_OUT) {      
      this.frameCount++;
      if (this.scale <= 1 || this.level > 1) {
        this.state = this.state.next();
        this.frameCount = 0;
      } else {
        this.scale = map2(this.frameCount, 0, this.zoomFrames, 2, 1, easing, EASE_IN_OUT);
      }
    } else if (this.state == State.PRE_SUBDIVIDE) {
      this.frameCount++;
      if (this.frameCount >= this.subdivideDelay) {
        this.frameCount = 0;
        this.state = this.state.next();
      }
    } else if (this.state == State.SUBDIVIDING) {
      this.frameCount++;
      if (this.horizontal < this.boundary.h) {
        this.horizontal = map2(this.frameCount, 0, this.divideFrames / 2.0, 0, this.boundary.w, easing, EASE_OUT);
      } else if (this.vertical < this.boundary.w) {
        this.vertical = map2(this.frameCount, this.divideFrames / 2.0, this.divideFrames, 0, this.boundary.h, easing, EASE_OUT);
      } else {
        this.frameCount = 0;
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