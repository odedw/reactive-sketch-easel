class Building{
  int x,h, w, hSpeed, targetH, y;
  int frameTop;
  boolean reachedTop = false;
  color f;
  Building(color f, int x, int y, int w) {
    this.f = f;
    this.x = x;
    this.h = 0;
    this.w = w;
    this.y = y;
    this.hSpeed = 3;
    this.targetH = int(random(height / 3, height / 2));
  }
  
  void step() {
    if (this.h < targetH && !reachedTop) {
      this.h += this.hSpeed;
      return;
    } 
    if (this.h >= targetH && !reachedTop) {
      this.hSpeed = this.hSpeed * - 1;
      reachedTop = true;
      frameTop = frameCount;
      return;
    } 
    if (this.h > 0 && frameCount - frameTop > 60 && reachedTop) {
      this.h += this.hSpeed;
      return;
    } 
    if (reachedTop && this.h < 0) {
      this.h = 0;
    }
    
  }
  
  void draw() {
    pushMatrix();
    
    noStroke();
    fill(this.f);
    translate(this.x + this.w / 2, this.y - this.h / 2);
    rect(0,0,this.w,this.h);
    popMatrix();
  }
}