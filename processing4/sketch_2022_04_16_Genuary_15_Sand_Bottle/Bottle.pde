// The Nature of Code
// <http://www.shiffman.net/teaching/nature>
// Spring 2010
// Box2DProcessing example

// An uneven surface boundary

class Bottle {
  // We'll keep track of all of the surface points
  // ArrayList<Vec2> surface;
  // int openingWidth = 60;
  // int yOffset = 200;
  // int bezierResolution = 500;
  // int bottleHeight = 300;
  // Vec2 p1,p2,p3,p4,c1,c2,c3,c4;
  PVector p1,p2,c1,c2,p3,p4,c3,c4;
  PImage img;
  float x,y,w,h;
  ArrayList<Boundary> boundaries = new ArrayList<Boundary>();
  
  Bottle(float x_, float y_, float w_, float h_) {
    w = w_;
    h = h_;
    x = x_;
    y = y_;
    
    boundaries.add(new Boundary(x + 1, y - h * 0.75 / 2, 2, h * 0.75));
    boundaries.add(new Boundary(x + w * 0.5, y - 1, w, 2));
    boundaries.add(new Boundary(x + w - 1, y - h * 0.75 / 2, 2, h * 0.75));
    img = loadImage("bottle1.png");
    
    p1 = new PVector(x, y - h * 0.75);
    p2 = new PVector(x + w * 0.25, y - h);
    c1 = new PVector(x, y - h * 0.87);
    c2 = new PVector(x + w * 0.25, y - h * 0.75);
    
    //surface = new ArrayList<Vec2>();
    
    //p1 = new Vec2(width / 2 - openingWidth / 2, height / 2 - yOffset);
    //c1 = new Vec2(p1.x, p1.y + openingWidth);
    //c2 = new Vec2(p1.x - openingWidth * 0.5, p1.y + openingWidth * 0.25);
    //p2 = new Vec2(p1.x - openingWidth * 0.5, p1.y + openingWidth);
    
    //p3 = new Vec2(width / 2 + openingWidth / 2, height / 2 - yOffset);
    //c3 = new Vec2(p3.x, p3.y + openingWidth);
    //c4 = new Vec2(p3.x + openingWidth * 0.5, p3.y + openingWidth * 0.25);
    //p4 = new Vec2(p3.x + openingWidth * 0.5, p3.y + openingWidth);
    
    
    
    //surface.add(p2);
    //surface.add(new Vec2(p2.x, p2.y + bottleHeight));
    //surface.add(new Vec2(p4.x, p4.y + bottleHeight));
    //surface.add(p4);
    
    ////This is what box2d uses to put the surface in its world
    //ChainShape chain = new ChainShape();
    
    //Vec2[] vertices = new Vec2[surface.size()];
    //for (int i = 0; i < vertices.length; i++) {
    //Vec2 edge = box2d.coordPixelsToWorld(surface.get(i));
    //vertices[i] = edge;
    // }
    
    //// Create the chain!
    //chain.createChain(vertices,vertices.length);
    
    //// The edge chain is now attached to a body via a fixture
    //BodyDef bd = new BodyDef();
    //bd.position.set(0.0f,0.0f);
    //Body body = box2d.createBody(bd);
    //// Shortcut, we could define a fixture if we
    //// want to specify frictions, restitution, etc.
    //body.createFixture(chain,1);
  }
  
  //A simple function to just draw the edge chain as a series of vertex points
  void draw() {
    strokeWeight(2);
    stroke(0);
    noFill();
    
    // beginShape();
    // for (Vec2 v : surface) {
    //   vertex(v.x,v.y);
    // }
    // endShape();
    
    // bezier(p1.x, p1.y, c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
    // bezier(p3.x, p3.y, c3.x, c3.y, c4.x, c4.y, p4.x, p4.y);
    // line(p1.x, p1.y, p3.x, p3.y);
    image(img, x, y - h, w, h);
    // for (Boundary b : boundaries) {
    //   b.draw();
    // }
  }
  
}