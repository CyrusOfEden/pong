export default function createScore(config) {
  return {
    left: 0,
    right: 0,
    winner: function() {
      if (this.left === config.winningScore) return "left";
      if (this.right === config.winningScore) return "right";
      return false;
    },
    message: function() {
      let winner = this.winner();
      let loser = winner === "left" ? "right" : "left";
      return `The ${winner} player wins ${this[winner]} to ${this[loser]}!`;
    },
    reset: function() {
      this.left = 0;
      this.right = 0;
    }
  };
}
