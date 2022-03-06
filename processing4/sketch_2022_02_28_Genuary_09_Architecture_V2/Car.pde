class Car{
  int speed = 5;
  int lastChange = 0;
  int i,j;
  boolean horizontal;
  Car(int i, int j, boolean horizontal) {
    this.i = i;
    this.j = j;
    this.horizontal = horizontal;
    this.setHeight();
  }
  void setHeight() {
    if (this.horizontal) {
      if (this.i >= 0 && this.i < cols) {
        pixels[this.i][this.j].setHeight(size, true);
        pixels[this.i][this.j + 1].setHeight(size, true);
      }
      if (this.i - 1 >= 0 && this.i - 1 < cols) {
        pixels[this.i - 1][this.j].setHeight(int(size * 1.5), true);
        pixels[this.i - 1][this.j + 1].setHeight(int(size * 1.5), true);
      }
      if (this.i - 2 >= 0 && this.i - 2 < cols) {
        pixels[this.i - 2][this.j].setHeight(int(size * 1.5), true);
        pixels[this.i - 2][this.j + 1].setHeight(int(size * 1.5), true);
      }
      if (this.i - 3 >= 0 && this.i - 3 < cols) {
        pixels[this.i - 3][this.j].setHeight(size, true);
        pixels[this.i - 3][this.j + 1].setHeight(size, true);
      }
      if (this.i - 4 >= 0 && this.i - 4 < cols) {
        pixels[this.i - 4][this.j].setHeight(size / 2, true);
        pixels[this.i - 4][this.j + 1].setHeight(size / 2, true);
      }
      
    } else {
      if (this.j >= 0 && this.j < rows) {
        pixels[this.i][this.j].setHeight(size, true);
        pixels[this.i + 1][this.j].setHeight(size, true);
      }
      if (this.j - 1 >= 0 && this.j - 1 < rows) {
        pixels[this.i][this.j - 1].setHeight(int(size * 1.5), true);
        pixels[this.i + 1][this.j - 1].setHeight(int(size * 1.5), true);
      }
      if (this.j - 2 >= 0 && this.j - 2 < rows) {
        pixels[this.i][this.j - 2].setHeight(int(size * 1.5), true);
        pixels[this.i + 1][this.j - 2].setHeight(int(size * 1.5), true);
      }
      if (this.j - 3 >= 0 && this.j - 3 < rows) {
        pixels[this.i][this.j - 3].setHeight(size, true);
        pixels[this.i + 1][this.j - 3].setHeight(size, true);
      }
      if (this.j - 4 >= 0 && this.j - 4 < rows) {
        pixels[this.i][this.j - 4].setHeight(size / 2, true);
        pixels[this.i + 1][this.j - 4].setHeight(size / 2, true);
      }
    }
    
  }
  void step() {
    if (this.speed > frameCount - this.lastChange) {
      return;
    }
    this.lastChange = frameCount;
    if (this.horizontal) {
      this.i++;
    } else {
      this.j++;
    }
    this.setHeight(); 
  }
}