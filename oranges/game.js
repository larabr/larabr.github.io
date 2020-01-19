const game = {
  LABEL1: null,
  LABEL2: null,
  GAME_ROUNDS: 10,
  init: function() {
    const labels = Object.keys(DB);
    this.LABEL1 = { id:1, name: labels[0] };
    this.LABEL2 = { id:2, name: labels[1] };
    document.getElementById("label1").innerHTML = this.LABEL1.name;
    document.getElementById("label2").innerHTML = this.LABEL2.name;

    this.newGame();
  },

  newGame: function() {
    this.sampledImages = {}
    this.remainingRounds = this.GAME_ROUNDS;
    this.score = 0;
    this.runGameRound();
  },

  runGameRound: function() {
    let sample = this.getRandomImage();
    // mark image as sampled
    this.sampledImages[sample.id] = true;
    document.getElementById("picture").style.backgroundImage = `url('${sample.image}'`;

    document.getElementById("label1").onclick = () => this.processChoice(1, sample.label.id )
    document.getElementById("label2").onclick = () => this.processChoice(2, sample.label.id)
  },

  processChoice: function(picked, actual) {
    this.score += (picked == actual);
    if (--this.remainingRounds > 0) {
      this.runGameRound()
    } else {
      alert(`Score: ${this.score}/${this.GAME_ROUNDS}`);
      this.newGame()
    }
  },

  /**
   * Get a random image from either label
   * @return path to picked image
   */
  getRandomImage: function() {
    const label = getRandomElement([ this.LABEL1, this.LABEL2 ]);
    const imgIndex = getRandomInteger(DB[label.name].length);

    const id = `${imgIndex}@${label.id}`;
    return (
      // check if sampled img is to be excluded
      this.sampledImages[id] 
      ? this.getRandomImage() // sample again
      : { image: DB[label.name][imgIndex], label, id }
    );
  },
}

/**
 * Get randomInteger from 0 to upperBound
 * @param {Integer} upperBound (excluded)
 * @return {Integer}
 */
function getRandomInteger(upperBound=Number.MAX_SAFE_INTEGER) {
  return Math.floor(Math.random() * upperBound)
}

/**
 * Get random element from array
 * @param {Array} arr
 * @return {Any}  array element
 */
function getRandomElement(arr) {
  let idx = getRandomInteger(arr.length);
  return arr[idx];
}

