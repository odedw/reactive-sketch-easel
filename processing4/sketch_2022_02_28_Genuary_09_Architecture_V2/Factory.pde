class Factory {
  CityObject createObject() {
    CityObject co = null;
    while(co == null) {
      float val = random(1);
      try{
        if (val < 0.1) {
          co = new PyramidTop(int(random(cols)), int(random(rows)));
        } else if (val < 0.3) {
          co = new StepsBuilding(int(random(cols)), int(random(rows)));
        } else if (val < 0.5) {
          co = new AntennaBuilding(int(random(cols)), int(random(rows)));
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