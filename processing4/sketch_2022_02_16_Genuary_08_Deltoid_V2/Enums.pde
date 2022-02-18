public enum Stage {
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
  TOP_LEFT,
  TOP_RIGHT;
  
  public Stage next() {
    // No bounds checking required here, because the last instance overrides
    return values()[(ordinal() + 1) % 4];
  }
}
