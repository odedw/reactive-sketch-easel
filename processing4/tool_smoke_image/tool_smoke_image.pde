IntConfig numFocalPoints = () ->  int(random(1,20));
BoolConfig relocateFocalPoints = () -> true;
IntConfig numIterations = () -> int(random(2,6));
int numVariations = 3;
File folder = new File("D:/Projects/reactive-sketch-easel/processing4/tool_smoke_image/input");
String[] filenames;
int fileIndex = 0;
int variationIndex = 0;
PImage[] images;
int[] variationCount;

void setup() {
  size(1280, 720);
  filenames = folder.list();
  images = new PImage[filenames.length];
  textSize(32);
  fill(0);
  int i = 0;
  for (String f : filenames) {
    images[i++] = loadImage(folder + "/" + f);
  }
  variationCount = new int[filenames.length];
  
  int y = 100;
  int index = 0;
  for (String f : filenames) {
    text(f, 40, y);
    text(variationCount[index++] + "/" + numVariations, 800, y);
    y += 40;
  }
  // println("Done");
}

void runForImage(String f) {
  println("==================================== " + f);
  String[] tokens = split(f, '.');
  for (int v = 0; v < numVariations; ++v) {
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
  
  
  if (fileIndex == filenames.length) {
    println("Done");
    textSize(64);
    text("Done", width / 2 - 50, height / 2);
    noLoop();
    return;
  }
  
  String f = filenames[fileIndex];
  println("==================================== " + f);
  String[] tokens = split(f, '.');
  PImage img = images[fileIndex];
  int iterations = numIterations.getIntValue();
  int focalPoints = numFocalPoints.getIntValue();
  boolean relocate = relocateFocalPoints.getBoolValue();
  println(focalPoints + " focal points");
  println(iterations + " iterations");
  for (int i = 0; i < iterations; ++i) {
    img = smoke(img, focalPoints, relocate);
    println("Finished Iteration " + (i + 1));
  }
  
  img.save("output/" + tokens[0] + "-" + variationIndex + "." + tokens[1]);
  variationIndex++;
  variationCount[fileIndex]++;
  println("====================================");
  
  if (variationIndex == numVariations) {
    variationIndex = 0;
    fileIndex++; 
  }
  
  int y = 100;
  int index = 0;
  for (String fn : filenames) {
    text(fn, 40, y);
    text(variationCount[index++] + "/" + numVariations, 800, y);
    y += 40;
  }
}


interface IntConfig{
  int getIntValue();
}

interface BoolConfig{
  boolean getBoolValue();
}
