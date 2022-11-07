class Track {
  segments = [];
  firstSegmentIndex = 0;
  constructor(position, size, speed, vertical = false, color = 'black') {
    this.size = size;
    this.speed = speed;
    this.gap = size / 2;
    // this.color = color;
    this.vertical = vertical;
    const mainAxisSize = vertical ? height : width;
    const goingPositive = this.speed > 0;
    let mainAxisValue = goingPositive ? -50 : mainAxisSize + 50;
    while (goingPositive ? mainAxisValue < mainAxisSize + 100 : mainAxisValue > -100) {
      const s = random(1) < 0.2 ? size : random(MIN_SEGMENT_SIZE, MAX_SEGMENT_SIZE);
      const v = goingPositive ? mainAxisValue : mainAxisValue - s;
      this.segments.push(
        new Segment(
          vertical ? position : v,
          vertical ? v : position,
          vertical ? size : s,
          vertical ? s : size,
          vertical
        )
      );
      mainAxisValue = goingPositive ? mainAxisValue + s + this.gap : mainAxisValue - s - this.gap;
    }
  }

  update() {
    for (const s of this.segments) {
      if (this.vertical) {
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
      } else {
        s.x += this.speed;
        if (this.speed > 0 && s.x > width) {
          const firstSegment = this.segments[this.firstSegmentIndex];
          s.x = firstSegment.x - s.w - this.gap;
          this.firstSegmentIndex = this.segments.indexOf(s);
        } else if (this.speed < 0 && s.x < -s.w) {
          const firstSegment = this.segments[this.firstSegmentIndex];
          s.x = firstSegment.x + firstSegment.w + this.gap;
          this.firstSegmentIndex = this.segments.indexOf(s);
        }
      }
    }
  }

  draw() {
    fill(randomColorForSeed(this));
    // fill(this.color);
    // stroke(0);
    // strokeWeight(1);
    noStroke();
    for (let s of this.segments) {
      s.draw();
    }
  }
}

class Segment {
  constructor(x, y, w, h, vertical) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = vertical ? w / 2 : h / 2;
    this.vertical = vertical;
  }

  draw() {
    if (this.vertical) {
      circle(this.x + this.r, this.y + this.r, 2 * this.r);
      rect(this.x, this.y + this.r, this.w, this.h - 2 * this.r);
      circle(this.x + this.r, this.y + this.h - this.r, 2 * this.r);
    } else {
      circle(this.x + this.r, this.y + this.r, this.r * 2);
      rect(this.x + this.r, this.y, this.w - this.r * 2, this.h);
      circle(this.x + this.w - this.r, this.y + this.r, this.r * 2);
    }
  }
}
