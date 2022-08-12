import processing.video.*;

Video loadVideo(String fileName) {
  return loadVideo(fileName, false);
}

Video loadVideo(String fileName, boolean loop) {
  Movie mov = new Movie(this, fileName);
  return new Video(mov, loop);
}
class Video {
  Movie mov;
  int frames;
  boolean loop;
  
  Video(Movie mov_, boolean loop_) {
    mov = mov_;
    mov.play();
    mov.jump(0);
    mov.pause();
    loop = loop_;
  }
  
  int getLength() {
    return int(mov.duration() * mov.frameRate);
  }
  
  Movie read() {
    mov.read();
    mov.loadPixels();
    return mov;
  }
  
  void setFrame(int n) {
    mov.play();
    
    //The duration of a single frame:
    float frameDuration = 1.0 / mov.frameRate;
    
    //We move to the middle of the frame by adding 0.5:
    float where = (n + 0.5) * frameDuration; 
    
    //Taking into account border effects:
    float diff = mov.duration() - where;
    if (diff < 0) {
      where += diff - 0.25 * frameDuration;
    }
    
    mov.jump(where);
    mov.pause();  
  } 
  
  boolean frameAvailable() {
    return mov.available();
  }
  
  boolean next() {
    if (frames > getLength()) {
      if (loop) frames = 0;
      else return false;
    }
    
    frames++;
    setFrame(frames);
    return true;
  }
}