class Factory {
  CityObject createObject() {
    CityObject co = null;
    while(co == null) {
      try{
        co = new RectBuilding(int(random(cols)), int(random(rows)));
      } catch(Exception e) {
        // println("Failed: " + e);
        co = null;
      }
    }
    return co;
  }
}