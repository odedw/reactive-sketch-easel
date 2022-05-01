color[] colors = {#355590, #6ca0a7, #ffc789, #df5f50, #5a3034, #fff1dd};

class Spawner{
  int colorIndex = 0;
  int waitingFrames = 0;
  int spawnX, spawnY;
  boolean isWaiting = false;
  Spawner() {
    spawnX = int(random(width));
    
  }
  
  void step() {
    if (isWaiting && waiting < FRAMES_BETWEEN_COLORS) {
      waiting++;
      if (++waiting >= FRAMES_BETWEEN_COLORS) {
        isWaiting = false;
        waiting = 0;
      }
      return;
    } 
    
    generateGrains();
  }
  
  void generateGrains() {
    for (int i = 0; i < GRAINS_PER_FRAME; ++i) {
      Grain g = new Grain(spawnX, spawnY, colors[colorIndex]);
      grains.add(g);
      if (grains.size() % GRAINS_PER_COLOR == 0) break;
    }
    
    if (grains.size() % GRAINS_PER_COLOR == 0) {
      switchColor();
    }
  }
  
  void switchColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    isWaiting = true;
    int i = 0;
    do {
      spawnX = int(random(width));
      if (++i > 100000) break;
      
    } while(topStaticY[spawnX] < 0);
  }
}