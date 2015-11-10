function setupBall() {
  return {
    radius: 5,
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
    moveSpeed: 8
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
