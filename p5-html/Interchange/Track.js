class Track {
  segments = [];
  firstSegmentIndex = 0;
  constructor(x, w, speed, color = 'black') {
    this.x = x;
    this.w = w;
    this.speed = speed;
    this.gap = w / 2;
    this.color = color;

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
    fill(this.color);
    noStroke();

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
    circle(this.x + this.r, this.y + this.r, 2 * this.r);
    rect(this.x, this.y + this.r, this.w, this.h - 2 * this.r);
    circle(this.x + this.r, this.y + this.h - this.r, 2 * this.r);
  }
}
