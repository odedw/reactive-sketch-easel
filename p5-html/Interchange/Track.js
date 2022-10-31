class Track {
  segments = [];
  firstSegmentIndex = 0;
  constructor(x, w, speed) {
    this.x = x;
    this.w = w;
    this.speed = speed;
    this.gap = w / 2;

    const goingDown = this.speed > 0;
    let y = goingDown ? -50 : height + 50;
    while (goingDown ? y < height + 100 : y > -100) {
      const h = random(w, height / 10);
      this.segments.push(new Segment(x, goingDown ? y : y - h, w, h));
      y = goingDown ? y + h + this.gap : y - h - this.gap;
    }
  }

  update() {
    for (const s of this.segments) {
      s.y += this.speed;
      if (this.speed > 0 && s.y > height) {
        const firstSegment = this.segments[this.firstSegmentIndex];
        s.y = firstSegment.y - s.h - this.gap;
        this.firstSegmentIndex = this.segments.indexOf(s);
      } else if (this.speed < 0 && s.y < -s.h) {
        const firstSegment = this.segments[this.firstSegmentIndex];
        s.y = firstSegment.y + firstSegment.h + this.gap;
        this.firstSegmentIndex = this.segments.indexOf(s);
      }
    }
  }

  draw() {
    for (let s of this.segments) {
      s.draw();
    }
  }
}

class Segment {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = w / 2;
  }

  draw() {
    fill(0);
    noStroke();
    circle(this.x + this.r, this.y + this.r, 2 * this.r);
    rect(this.x, this.y + this.r, this.w, this.h - 2 * this.r);
    circle(this.x + this.r, this.y + this.h - this.r, 2 * this.r);
  }
}
// class Track {
//   int  x, w, speed, GAP;
//   ArrayList<Segment> segments = new ArrayList<Segment>();
//   int upperIndex = 0;
//   Track(int x_, int w_, int speed_) {
//     x = x_;
//     w = w_;
//     speed = speed_;
//     GAP = w / 2;

//     int y = -100;
//     while(y < height + 100) {
//       int h = int(random(w, height / 10));
//       segments.add(new Segment(x, y, w, h));
//       y += h + GAP;
//     }
//   }

//   void update() {
//     for (int i = 0; i < segments.size(); ++i) {
//       Segment s = segments.get(i);
//       if (s.y > height) {
//         s.y = segments.get(upperIndex).y - GAP - s.h;
//         upperIndex--;
//         if (upperIndex == -1) upperIndex = segments.size() - 1;

//       }
//       s.y += speed;

//     }
//   }

//   void draw() {
//     for (Segment s : segments) {
//       s.draw();
//     }
//   }

// }
