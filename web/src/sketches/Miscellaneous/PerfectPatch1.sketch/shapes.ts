import p5 from "p5";

export interface Shape {
  draw(p: p5, size: number);
}

class Square implements Shape {
  draw(p: p5, size: number) {
    p.square(0, 0, size);
  }
}

class Circle implements Shape {
  draw(p: p5, size: number) {
    p.ellipse(0, 0, size);
  }
}

class Triangle implements Shape {
  draw(p: p5, size: number) {
    const altitude = (size * Math.sqrt(3)) / 2;
    p.triangle(0, -(altitude * 2) / 3, -size / 2, +altitude / 3, +size / 2, +altitude / 3);
  }
}

class UpsideDownTriangle implements Shape {
  draw(p: p5, size: number) {
    const altitude = (size * Math.sqrt(3)) / 2;
    p.triangle(0, (altitude * 2) / 3, -size / 2, -altitude / 3, +size / 2, -altitude / 3);
  }
}

class Diamond implements Shape {
  draw(p: p5, size: number) {
    p.quad((-size * 2) / 3, 0, 0, -size / 2, (size * 2) / 3, 0, 0, size / 2);
  }
}

const shapes = [new UpsideDownTriangle(), new Triangle(), new Square(), new Circle(), new Diamond()];

export default shapes;
