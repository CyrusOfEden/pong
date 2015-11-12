function setupBall() {
  return {
    radius: 8,
    x: 300,
    y: 200,
    velocityX: _.sample([-4, -3, 3, 4]),
    velocityY: _.sample([-2, -1, 0, 1, 2])
  }
}

export default {
  paddle: {
    height: 60,
    width: 10,
    moveSpeed: 6
  },
  leftPaddle: {
    upKey: 87, // w
    downKey: 83 // s
  },
  rightPaddle: {
    upKey: 38, // up arrow
    downKey: 40 // down arrow
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
