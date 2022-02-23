class Tile{
  PImage img;
  int x,y,w,h;
  Tile(String folderName, int x, int y, int w, int h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    File folder = new File(folderName);
    String[] filenames = folder.list();
    
    PImage orgImage = null;
    while(orgImage == null) {
      String file = filenames[int(random(filenames.length))];
      orgImage = loadImage(folder + "/" + file);    
      if (orgImage.width < w || orgImage.height < h) {
        orgImage = null;
      }
    } 
    this.img = createImage(w, h, ARGB);
    
    this.img.copy(orgImage, int(random(orgImage.width - w)), int(random(orgImage.height - h)), w, h, 0, 0, w, h);
  }
  
  void draw() {
    stroke(0);
    strokeWeight(2);
    // rect(this.x, this.y, this.w, this.h);
    image(this.img, this.x, this.y, this.w, this.h);
  }
}