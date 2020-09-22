// eslint-disable-next-line
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// eslint-disable-next-line
Array.prototype.randomize = function () {
  return this.sort(() => Math.random() - 0.5);
};
