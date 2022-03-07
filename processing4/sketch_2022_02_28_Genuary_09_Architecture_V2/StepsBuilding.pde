class StepsBuilding extends CityObject{
  int gap = 1;
  StepsBuilding(int row, int col) throws Exception{
    super(row,col);
    int min = 4;
    int max = 8;
    this.w = this.h = int(random(min, max));
    
    this.height = int(random(6,9) * size + size);
    this.check();
    this.mark();
    
    int levels = this.w / 2;
    boolean horizontal = random(1) < 0.5;
    boolean direction = random(1) < 0.5;
    if (horizontal) {
      for (int i = gap; i < this.w - gap; ++i) {
        int x = direction ? this.col + i : this.col + this.w - i;
        for (int j = gap; j < this.h - gap; ++j) {
          pixels[x][j + this.row].setHeight(this.height + i * size);
        }
      }
    } else {
      for (int i = gap; i < this.h - gap; ++i) {
        int y = direction ? this.row + i : this.row + this.h - i;
        for (int x = gap; x < this.w - gap; ++x) {
          pixels[x + this.col][y].setHeight(this.height + i * size);
        }
      }
    }
    //if (this.w % 2 == 0) {
    //Pixel middlePixel = pixels[this.col + this.w / 2][this.row + this.h / 2];
    //pixels[this.col + this.w / 2][this.row + this.h / 2].setHeight(middlePixel.targetH + int(random(5)) * size);
    // }
  }
}