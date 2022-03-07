class Factory {
  CityObject createObject() {
    CityObject co = null;
    while(co == null) {
      float val = random(1);
      try{
        if (val < 0.2) {
          co = new PyramidTop(int(random(cols)), int(random(rows)));
        } else if (val < 0.4) {
          co = new StepsBuilding(int(random(cols)), int(random(rows)));
        } else {
          co = new RectBuilding(int(random(cols)), int(random(rows)));
        }
      } catch(Exception e) {
        // println("Failed: " + e);
        co = null;
      }
    }
    return co;
  }
}