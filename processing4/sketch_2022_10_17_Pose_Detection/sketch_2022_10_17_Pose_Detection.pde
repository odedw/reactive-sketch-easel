import processing.video.*;
import ml.*;
Capture cam;
FaceDetector detector;

void setup() {
  size(1280, 720);
  detector = new FaceDetector(this);
  String[] cameras = Capture.list();
  
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    for (int i = 0; i < cameras.length; i++) {
      println(cameras[i]);
    }
    
    // The camera can be initialized directly using an 
    // element from the array returned by list():
    cam = new Capture(this, width, height, cameras[0]);
    cam.start();     
  }      
}

void draw() {
  if (cam.available() == true) {
    cam.read();
  }
  image(cam, 0, 0);
  
  // detect faces
  MLFace[] faces = detector.predict(cam);
  // draw bounding boxes of detected faces
  for (int i = 0; i < faces.length; i++) {
    // get each face
    MLFace face = faces[i];
    // draw bounding box
    // noFill();
    // stroke(240, 121, 81);
    // rect(face.getX(), face.getY(), face.getWidth(), face.getHeight());
    // draw draw each facial landmark
    noStroke();
    fill(0);
    
    ellipse(face.getLeftEye().getX(), face.getLeftEye().getY(), 60, 40);
    ellipse(face.getRightEye().getX(), face.getRightEye().getY(),  60, 40);
    stroke(0);
    strokeWeight(10);
    line(face.getLeftEye().getX(), face.getLeftEye().getY(), face.getRightEye().getX(), face.getRightEye().getY());
    //for (int j = 0; j < face.getKeyPoints().size(); j++) {
    //MLKeyPoint keyPoint = face.getKeyPoints().get(j);
    //println(keyPoint.toString());
    //circle(keyPoint.getX(), keyPoint.getY(), 5);
    // }
  }
  //The following does the same, and is faster when just drawing the image
  //without any additional resizing, transformations, or tint.
  //set(0, 0, cam);
}
