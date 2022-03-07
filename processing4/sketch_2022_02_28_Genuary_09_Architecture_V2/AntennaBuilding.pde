
class AntennaBuilding extends CityObject{
  int gap = 1;
  AntennaBuilding(int row, int col) throws Exception{
    super(row,col);
    int min = 6;
    int max = 11;
    if (random(1) < 0.5) {
      this.w = this.h = int(random(min, max));
    } else {
      this.w = int(random(min, max));
      this.h = int(random(min, max));
    }
    this.height = int(random(1,10) * size + size);
    this.check();
    this.mark();
    
    for (int i = this.col + gap; i < this.col + this.w - gap; i++) {
      for (int j = this.row + gap; j < this.row + this.h - gap; j++) {
        pixels[i][j].setHeight(this.height);
      }
    }
    
    int x = int(random(this.col + this.gap, this.col + this.w - this.gap));
    int y = int(random(this.row + this.gap, this.row + this.h - this.gap));
    pixels[x][y].setHeight(pixels[x][y].targetH + int(random(2, 8)) * size);
    
    // println("Block Building ==== size: " + this.h + ", height: " + this.height);
  }
}