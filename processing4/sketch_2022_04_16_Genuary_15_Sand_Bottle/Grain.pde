class Grain{
  Body body;
  float w,h;
  int stepsImmobile;
  Vec2 prevPos;
  int frameStart;
  color c;
  Grain(float x, float y, color c_) {
    w = 1.5;
    h = 1.5;
    float colorRatio = random(0.8, 1);
    c = color(red(c_) * colorRatio, green(c_) * colorRatio, blue(c_) * colorRatio);
    frameStart = frameCount;
    // Build Body
    BodyDef bd = new BodyDef();			
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(x,y));
    body = box2d.createBody(bd);
    
    // Define a polygon (this is what we use for a rectangle)
    PolygonShape sd = new PolygonShape();
    float box2dW = box2d.scalarPixelsToWorld(w / 2);
    float box2dH = box2d.scalarPixelsToWorld(h / 2);	// Box2D considers the width and height of a
    sd.setAsBox(box2dW, box2dH);		        // rectangle to be the distance from the
    					// center to the edge (so half of what we
    					// normally think of as width or height.) 
    // Define a fixture
    FixtureDef fd = new FixtureDef();
    fd.shape = sd;
    // Parameters that affect physics
    fd.density = 1;
    fd.friction = 0.3;
    fd.restitution = 0;
    
    // Attach Fixture to Body						   
    body.createFixture(fd);
  }
  
  void draw() {
    // We need the Body’s location and angle
    Vec2 pos = box2d.getBodyPixelCoord(body);		
    
    pushMatrix();
    translate(pos.x,pos.y);		// Using the Vec2 position and float angle to
    fill(c);
    noStroke();
    rectMode(CENTER);
    rect(0,0,w * 2,h * 2);
    popMatrix();
  }
  
  void step() {
    if (body.getType() == BodyType.STATIC) return;
    Vec2 pos = box2d.getBodyPixelCoord(body);		
    if (prevPos != null && dist(pos.x, pos.y, prevPos.x, prevPos.y) <= 1) {
      stepsImmobile++;
    } else {
      stepsImmobile = 0;
      prevPos = pos;
      if (debug) {
        println(dist(pos.x, pos.y, prevPos.x, prevPos.y));
      }
    }
    
    if (stepsImmobile >= 50) {
      body.setType(BodyType.STATIC);
    }
  }
}