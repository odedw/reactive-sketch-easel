class Quadtree{
  Rect boundary;
  boolean subdivided;
  Quadtree northeast;
  Quadtree northwest;
  Quadtree southeast;
  Quadtree southwest;
  Quadtree(Rect boundary) {
    this.boundary = boundary;
  }
  
  void subdivide() {
    this.subdivided = true;
    northeast = new Quadtree(new Rect(this.boundary.x + this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));
    northwest = new Quadtree(new Rect(this.boundary.x - this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));
    southeast = new Quadtree(new Rect(this.boundary.x + this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));
    southwest = new Quadtree(new Rect(this.boundary.x - this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));
  }
  
  void draw() {
    stroke(255);
    noFill();
    rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
    if (this.subdivided) {
      this.northeast.draw();
      this.northwest.draw();
      this.southeast.draw();
      this.southwest.draw();
    }
  }
}