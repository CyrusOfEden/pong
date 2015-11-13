function setupBall() {
  return {
    radius: 6,
    x: 300,
    y: 200,
    velocityX: _.sample([-4, -3, 3, 4]),
    velocityY: _.sample([-2, -1, 0, 1, 2])
  }
}

export default {
  winningScore: 7,
  paddle: {
    height: 60,
    width: 10,
    moveSpeed: 6,
  },
  leftPaddle: {
    upKey: 87, // w
    downKey: 83 // s
  },
  rightPaddle: {
    upKey: 73, // i
    downKey: 75 // k
  },
  ball: {
    setup: setupBall
  },
  canvas: {
    id: "pong-game",
    width: 600,
    height: 400
  }
};
