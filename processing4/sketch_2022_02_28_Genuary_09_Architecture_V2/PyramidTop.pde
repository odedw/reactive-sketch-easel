class PyramidTop extends CityObject{
  int gap = 1;
  PyramidTop(int row, int col) throws Exception{
    super(row,col);
    int min = 4;
    int max = 11;
    this.w = this.h = int(random(min, max));
    
    this.height = int(random(8,20) * size + size);
    this.check();
    this.mark();
    
    int levels = this.w / 2;
    for (int l1 = 1; l1 <= levels; ++l1) {
      for (int l2 = l1; l2 <= this.w - l1;l2++) {
        pixels[this.col + l2][this.row + l1].setHeight(this.height + l1 * size);
        pixels[this.col + l2][this.row + this.h - l1].setHeight(this.height + l1 * size);
        pixels[this.col + l1][this.row + l2].setHeight(this.height + l1 * size);
        pixels[this.col + this.w - l1][this.row + l2].setHeight(this.height + l1 * size);
      }
    }
    
    // if (this.w % 2 == 0) {
    //   Pixel middlePixel = pixels[this.col + this.w / 2][this.row + this.h / 2];
    //   pixels[this.col + this.w / 2][this.row + this.h / 2].setHeight(middlePixel.targetH + int(random(5)) * size);
    // }
  }
}