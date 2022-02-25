int resolution = 20;
class Tile{
  PImage img;
  PImage orgImage = null;
  PImage[] orgImages = null;
  int x,y,w,h;
  boolean tiled;
  Tile(String folderName, int x, int y, int w, int h, boolean tiled) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tiled = tiled;
    File folder = new File(folderName);
    String[] filenames = folder.list();
    this.orgImages = new PImage[filenames.length];
    // while(orgImage == null) {
    //   String file = filenames[int(random(filenames.length))];
    //   orgImage = loadImage(folder + "/" + file);    
    //   if (orgImage.width < w || orgImage.height < h) {
    //     orgImage = null;
    //   }
    // } 
    for (int i = 0; i < filenames.length; ++i) {
      this.orgImages[i] = loadImage(folder + "/" + filenames[i]);    
    }
    this.img = createImage(w, h, ARGB);
    
    // this.img.copy(orgImage, int(random(orgImage.width - w)), int(random(orgImage.height - h)), w, h, 0, 0, w, h);
  }
  
  void draw() {
    // stroke(0);
    // strokeWeight(2);
    // rect(this.x, this.y, this.w, this.h);
    if (!this.tiled) {
      PImage randImage = this.orgImages[int(random(this.orgImages.length))];
      PGraphics pg = createGraphics(this.w, this.h);
      pg.fill(0);
      pg.rect(0,0,this.w,this.h);
      pg.tint(255,150);
      pg.image(randImage, 0,0, this.w, this.h);
      pg.blendMode(REPLACE);
      pg.tint(255,0);
      pg.rect(this.w / 2, this.h / 2, 20, 20);
      image(pg, this.x, this.y, this.w, this.h);
      
    } else {
      for (int i = 0; i < this.w / resolution; ++i) {
        for (int j = 0; j < this.h / resolution; ++j) {
          PImage img = createImage(resolution * 4, resolution * 2, ARGB);
          PImage randImage = this.orgImages[int(random(this.orgImages.length))];
          img.copy(randImage, int(random(randImage.width - resolution * 2)), int(random(randImage.height - resolution * 2)), img.width, img.height, 0, 0, img.width, img.height);
          pushMatrix();
          translate(this.x + i * resolution, this.y + j * resolution);
          rotate(random( -HALF_PI, HALF_PI));
          image(img, 0,0, img.width, img.height);
          popMatrix();
        }
      }
    }
  }
}