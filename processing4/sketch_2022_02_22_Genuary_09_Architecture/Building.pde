public enum State {
  TEARED_DOWN,
  BUILDING,
  BUILT,
  TEARING_DOWN
};

class Building{
  int x,y,h,w, delay;
  PImage img;
  PGraphics pg;
  FlowField flowField;
  int currentY;
  State state = State.TEARED_DOWN;  
  
  Building(int x, PImage img, FlowField flowField, int delay) {
    this.x = x;

    this.w = int(random(100, 300));
    this.h = int(random(200, 800));
    this.y = height - this.h;
    this.img = img;
    this.pg = createGraphics(w, h, P2D);
    this.pg.beginDraw();
    this.pg.blendMode(REPLACE);
    this.pg.noStroke();
    this.pg.fill(0,0,0,0);
    this.pg.background(0,0,0,0);
    this.pg.endDraw();
    this.flowField = flowField;
    this.currentY = int(this.h * 1.25);
    this.delay = delay;
  } 
  
  void draw() {
    if (this.state == State.TEARED_DOWN) {
      return;
    }
    
    if (this.state == State.BUILDING || this.state == State.BUILT) {
      this.pg.beginDraw();
      for (int i = 0; i < 10; ++i) {
        int x = int(random(this.w * 1.5) - this.w * 0.25);
        int y = 0;
        if (this.state == State.BUILDING) {
          y = (frameCount % 2 == 0) ? 
            this.currentY : 
            int(random(this.currentY, this.h * 1.25));
        } else {
          y = int(random(this.currentY, this.h * 1.25));
        } 
        PImage tileImage = null;
        tileImage = createImage(int(random(40, 100)), int(random(40, 60)), ARGB);
        tileImage.copy(this.img, int(random(this.img.width - tileImage.width)), 
          int(random(this.img.height - tileImage.height)), tileImage.width,tileImage.height, 0, 0, tileImage.width, tileImage.height);        
        this.pg.pushMatrix();
        this.pg.translate(x, y);
        this.pg.rotate(flowField.get(x + this.x,this.y + y, 0, TWO_PI));
        this.pg.image(tileImage, tileImage.width / 2, -tileImage.height / 2, tileImage.width, tileImage.height);
        this.pg.popMatrix();
      } 
      this.pg.endDraw();
      image(this.pg, this.x, this.y);
    } else if (this.state == State.TEARING_DOWN) {
      this.pg.beginDraw();
      
      for (int i = 0; i < 10; ++i) {
        int x = int(random(this.w * 1.5) - this.w * 0.25);
        int y = int(random(currentY, this.h));
        PImage tileImage = null;
        tileImage = createImage(int(random(40, 100)), int(random(40, 60)), ARGB);
        tileImage.copy(this.img, int(random(this.img.width - tileImage.width)), 
          int(random(this.img.height - tileImage.height)), tileImage.width,tileImage.height, 0, 0, tileImage.width, tileImage.height);        
        this.pg.pushMatrix();
        this.pg.translate(x, y);
        this.pg.rotate(flowField.get(x + this.x,this.y + y, 0, TWO_PI));
        this.pg.image(tileImage, tileImage.width / 2, -tileImage.height / 2, tileImage.width, tileImage.height);
        this.pg.popMatrix();
      }
      this.pg.endDraw();
      image(this.pg, this.x, this.y);
    }  
  }
  
  void step() {
    if (this.state == State.BUILDING) {
      this.currentY -= 3;
      if (this.currentY <= this.h * - 0.25) {
        this.state = State.BUILT;
      }
    } else if (this.state == State.TEARING_DOWN) {
      this.currentY += 3;
      if (this.currentY >=  this.h * 1.25) {
        this.state = State.TEARED_DOWN;
      }
    }
  }
  void build() {
    this.state = State.BUILDING;
  }
  
  void tearDown() {
    this.state = State.TEARING_DOWN;    
  }
}
