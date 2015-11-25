function addBot(params) {
  let {ball, paddleConfig, otherPaddle} = params;

  let out = _.range(1, 6);
  let moveSpeed;

  return function() {
    // Don't do anything if the ball is near the other player
    if (ball.x < 100) return;
    // Russian roulette. The 4th barrel has a bullet.
    if (_.sample(out) === 4) return;

    moveSpeed = 0;
    if (ball.y + ball.velocityY < this.y + this.height / 6) {
      // If the ball is above a 6th into the paddle, move up
      moveSpeed -= paddleConfig.moveSpeed;
    }  else if (ball.y + ball.velocityY > this.y + this.height * 5 / 6) {
      // If the ball below the 5/6th of the paddle
      moveSpeed += paddleConfig.moveSpeed;
    }

    // Same logic as controls. Plays with the acceleration.
    this.y += this.velocityY + (moveSpeed / 3);
    this.velocityY = moveSpeed;
  }
}

function addControls(params) {
  let {keys, upKey, downKey, paddleConfig} = params;
  let moveSpeed;
  return function() {
    moveSpeed = 0;
    if (keys[upKey])   moveSpeed -= paddleConfig.moveSpeed;
    if (keys[downKey]) moveSpeed += paddleConfig.moveSpeed;
    // This plays with the acceleration
    this.y += this.velocityY + (moveSpeed / 3);
    this.velocityY = moveSpeed;
  }
}

function restrictBounds(params) {
  let {canvasConfig} = params;
  return function() {
    if (this.y <= 0) {
      this.velocityY = 0;
      this.y = 0;
    } else if (this.y + this.height >= canvasConfig.height) {
      this.velocityY = 0;
      this.y = canvasConfig.height - this.height;
    }
  }
}

function wallCollision(params) {
  let {canvasConfig} = params;
  return function() {
    // Check if the ball has hit a wall and if so,
    // reduce its velocityY by 0.2
    if (this.y - this.radius <= 0) {
      this.velocityY = -(this.velocityY - 0.2);
    } else if (this.y + this.radius >= canvasConfig.height) {
      this.velocityY = -(this.velocityY + 0.2);
    }
  }
}

function leftPaddleCollision(params) {
  let {leftPaddle} = params;
  return function() {
    // Check if the ball has collided with the paddle
    // AND that it is moving towards it (negative velocityX)
    if (this.x - this.radius <= leftPaddle.x + leftPaddle.width &&
        this.y + this.radius >= leftPaddle.y &&
        this.y - this.radius <= leftPaddle.y + leftPaddle.height &&
        this.velocityX <= 0) {
      this.velocityX = -(this.velocityX - 0.2);
      this.velocityY += (leftPaddle.velocityY / 3);
    }
  }
}

function rightPaddleCollision(params) {
  let {rightPaddle} = params;
  return function() {
    // Check if the ball has collided with the paddle
    // AND that it is moving towards it (positive velocityX)
    if (this.x + this.radius >= rightPaddle.x &&
        this.y + this.radius >= rightPaddle.y &&
        this.y - this.radius <= rightPaddle.y + rightPaddle.height &&
        this.velocityX >= 0) {
      this.velocityX = -(this.velocityX + 0.2);
      this.velocityY += (rightPaddle.velocityY / 3);
    }
  }
}

function edgeCollision(params) {
  let {canvasConfig, score} = params;
  return function() {
    if (this.x - this.radius <= 0) {
      score.right += 1;
      this.reset();
      return false;
    }
    if (this.x + this.radius >= canvasConfig.width) {
      score.left += 1;
      this.reset();
      return false;
    }
  }
}

function limitVelocity() {
  if (this.velocityX > 7) {
    this.velocityX = 7;
  } else if (this.velocityX < -7) {
    this.velocityX = -7;
  }
  if (this.velocityY > 7) {
    this.velocityY = 7;
  } else if (this.velocityY < -7) {
    this.velocityY = -7;
  }
}

function move() {
  this.x += this.velocityX;
  this.y += this.velocityY;
}

export default {
  addBot,
  addControls,
  restrictBounds,
  wallCollision,
  leftPaddleCollision,
  rightPaddleCollision,
  edgeCollision,
  limitVelocity,
  move
};
