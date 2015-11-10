function addControls(params) {
  let {keys, upKey, downKey, paddleConfig} = params;
  return function() {
    let moveSpeed = 0;
    if (keys[upKey]) moveSpeed -= paddleConfig.moveSpeed;
    if (keys[downKey]) moveSpeed += paddleConfig.moveSpeed;
    this.velocityY = moveSpeed;
    this.y += moveSpeed;
  }
}

function restrictBounds(params) {
  let {canvasConfig} = params;
  return function() {
    let hitTop = this.y <= 0;
    let hitBottom = this.y + this.height >= canvasConfig.height;

    if (hitTop || hitBottom) this.velocityY = 0;
    if (hitTop) this.y = 0;
    if (hitBottom) this.y = canvasConfig.height - this.height;
  }
}

function wallCollision(params) {
  let {canvasConfig} = params;
  return function() {
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
    if (this.x - this.radius <= leftPaddle.x + leftPaddle.width &&
        this.y + this.radius >= leftPaddle.y &&
        this.y - this.radius <= leftPaddle.y + leftPaddle.height) {
      this.velocityX = -(this.velocityX - 0.1);
      this.velocityY += (leftPaddle.velocityY / 3);
    }
  }
}
function rightPaddleCollision(params) {
  let {rightPaddle} = params;
  return function() {
    if (this.x + this.radius >= rightPaddle.x &&
        this.y + this.radius >= rightPaddle.y &&
        this.y - this.radius <= rightPaddle.y + rightPaddle.height) {
      this.velocityX = -(this.velocityX + 0.1);
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
  if (this.velocityX > 5) {
    this.velocityX = 5;
  } else if (this.velocityX < -5) {
    this.velocityX = -5;
  }
  if (this.velocityY > 5) {
    this.velocityY = 5;
  } else if (this.velocityY < -5) {
    this.velocityY = -5;
  }
}
function move() {
  this.x += this.velocityX;
  this.y += this.velocityY;
}

export default {
  addControls,
  restrictBounds,
  wallCollision,
  leftPaddleCollision,
  rightPaddleCollision,
  edgeCollision,
  limitVelocity,
  move
};
