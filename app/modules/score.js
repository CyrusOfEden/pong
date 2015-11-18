// returns a score object that is built with the config
export default function createScore(config) {
  return {
    left: 0,
    right: 0,
    // returns the winner if there is a winner, otherwise false
    winner: function() {
      if (this.left === config.winningScore) return "left";
      if (this.right === config.winningScore) return "right";
      return false;
    },
    // returns the message to display
    message: function() {
      let winner = this.winner();
      let loser = winner === "left" ? "right" : "left";
      return `The ${winner} player wins ${this[winner]} to ${this[loser]}!`;
    },
    // resets the scores
    reset: function() {
      this.left = 0;
      this.right = 0;
    }
  };
}
