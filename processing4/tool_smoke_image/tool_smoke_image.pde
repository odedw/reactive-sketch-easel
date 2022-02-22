IntConfig numFocalPoints = () -> int(random(5,20));
BoolConfig relocateFocalPoints = () -> true;
IntConfig numIterations = () -> int(random(1,3));
IntConfig numVariations = () -> 2;
File folder = new File("D:/Projects/reactive-sketch-easel/processing4/tool_smoke_image/input");
String[] filenames;

void setup() {
  size(100, 100);
  filenames = folder.list();
  for (String f : filenames) {
    runForImage(f);
  }
  println("Done");
}

void runForImage(String f) {
  println("==================================== " + f);
  String[] tokens = split(f, '.');
  for (int v = 0; v < numVariations.getIntValue(); ++v) {
    PImage img = loadImage(folder + "/" + f);
    int iterations = numIterations.getIntValue();
    int focalPoints = numFocalPoints.getIntValue();
    boolean relocate = relocateFocalPoints.getBoolValue();
    for (int i = 0; i < iterations; ++i) {
      img = smoke(img, focalPoints, relocate);
      println("Finished Iteration " + (i + 1));
    }
    
    img.save("output/" + tokens[0] + "-" + v + "." + tokens[1]);
    println("====================================");
  }
}

void draw() {
  background(#e6e6e6);
  
}


interface IntConfig{
  int getIntValue();
}

interface BoolConfig{
  boolean getBoolValue();
}
