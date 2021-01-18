// eslint-disable-next-line
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// eslint-disable-next-line
Array.prototype.randomize = function () {
  return shuffle(this);
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
