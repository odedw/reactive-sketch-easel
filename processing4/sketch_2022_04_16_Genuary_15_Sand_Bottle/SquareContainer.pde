class SquareContainer {
  float x,y, size;
  Vec2 topLeft, topRight, bottomLeft, bottomRight;
  ArrayList<Vec2> surface = new ArrayList<Vec2>();
  int sw = 4;
  SquareContainer(float x_, float y_, float size_) {
    x = x_;
    y = y_;
    size = size_;
    topLeft = new Vec2(x - size / 2, y - size / 2);
    topRight = new Vec2(x + size / 2, y - size / 2);
    bottomLeft = new Vec2(x - size / 2, y + size / 2);
    bottomRight = new Vec2(x + size / 2, y + size / 2);
    
    surface.add(topLeft);
    surface.add(bottomLeft);
    surface.add(bottomRight);
    surface.add(topRight);
    
    ChainShape chain = new ChainShape();
    
    Vec2[] vertices = new Vec2[surface.size()];
    for (int i = 0; i < vertices.length; i++) {
      Vec2 edge = box2d.coordPixelsToWorld(surface.get(i));
      vertices[i] = edge;
    }
    
    chain.createChain(vertices,vertices.length);
    
    BodyDef bd = new BodyDef();
    bd.position.set(0.0f,0.0f);
    Body body = box2d.createBody(bd);
    body.createFixture(chain,1);
    
    // Define the polygon
    PolygonShape sd = new PolygonShape();
    // Figure out the box2d coordinates
    float box2dW = box2d.scalarPixelsToWorld(size / 2);
    float box2dH = box2d.scalarPixelsToWorld(2);
    // We're just a box
    sd.setAsBox(box2dW, box2dH);
    
    
    // Create the body
    bd = new BodyDef();
    bd.type = BodyType.STATIC;
    bd.position.set(box2d.coordPixelsToWorld(x,y + size / 2 + sw));
    Body b = box2d.createBody(bd);
    
    // Attached the shape to the body using a Fixture
    b.createFixture(sd,1);
  }
  
  void draw() {
    strokeWeight(sw);
    stroke(0);
    noFill();
    
    beginShape();
    vertex(topLeft.x - sw / 2, topLeft.y);
    vertex(bottomLeft.x - sw / 2, bottomLeft.y + sw / 2);
    vertex(bottomRight.x + sw / 2, bottomLeft.y + sw / 2);
    vertex(topRight.x + sw / 2, topRight.y);
    
    endShape();
  }
  
}