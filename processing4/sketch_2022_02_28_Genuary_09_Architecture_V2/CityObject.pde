abstract class CityObject{
  int col,row;
  int w,h;
  int height;
  CityObject(int col, int row) {
    this.col = col;
    this.row = row;
  }
  
  boolean contains(int i, int j) {
    return i > this.col && i < this.col + this.w && j>this.row && j < this.row + this.h;
  }
  
  void check() throws Exception{
    if (this.col + this.w >= cols || this.row + this.h >= rows) {
      throw new Exception("out of bounds");
    } 
    for (int i = this.col; i < this.col + this.w; i++) {
      for (int j = this.row; j < this.row + this.h; j++) {
        if (pixelMap[pixelMapIndex(i,j)]) {
          throw new Exception("pixel occupied");
        }
      }
    }
  }
  
  void mark() {
    for (int i = this.col; i < this.col + this.w; i++) {
      for (int j = this.row; j < this.row + this.h; j++) {
        pixelMap[pixelMapIndex(i,j)] = true;
      }
    }
  }
}