class Pixel{
  int i,j,h, targetH;
  boolean isMoving = false;
  
  Pixel(int i, int j, int h) {
    this.i = i;
    this.j = j;
    this.h = this.targetH = h;
  }
  
  void setHeight(int h) {
    this.setHeight(h, false);
  }
  
  void setHeight(int h, boolean immediate) {
    if (immediate) {
      this.targetH = this.h = h;
      this.isMoving = false; 
    } else {
      this.targetH = h;
      this.isMoving = true;
    }
  }
  
  void step() {
    if (this.targetH != this.h) {
      this.h += this.targetH > this.h ? 1 : - 1;
    } else {
      this.isMoving = false;
    }
  }
  
  void draw() {
    fill(255);
    stroke(50,50,50,100);
    pushMatrix();
    translate( -fullWidth / 2 + this.i * size + this.i * gap, this.h / 2 , -fullWidth / 2 + this.j * size + this.j * gap);
    box(size, this.h,size);
    popMatrix();
  }
}