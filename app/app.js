import {createCanvas, getContext} from "./modules/canvas";
import createPaddle from "./modules/paddle";
import createBall from "./modules/ball";

import animate from "./modules/animate";
import pressedKeys from "./modules/pressedKeys";

import config from "./config";

let keys = pressedKeys();

let leftPaddle = createPaddle(config.paddle, { x: 0, y: 170 });
let rightPaddle = createPaddle(config.paddle, { x: 590, y: 170 });
let ball = createBall(config.ball);
let score = {
  left: 0,
  right: 0
};

let entities = [leftPaddle, rightPaddle, ball];

let canvas = createCanvas(config.canvas);
let context = getContext(canvas);

let paddleBehavior = {
  addControls: function(upKey, downKey) {
    return function() {
      let moveSpeed = 0;
      if (keys[upKey]) moveSpeed -= config.paddle.moveSpeed;
      if (keys[downKey]) moveSpeed += config.paddle.moveSpeed;
      this.velocityY = moveSpeed;
      this.y += moveSpeed;
    }
  },
  restrictBounds: function() {
    let hitTop = this.y <= 0;
    let hitBottom = this.y + this.height >= config.canvas.height;

    if (hitTop || hitBottom) this.velocityY = 0;
    if (hitTop) this.y = 0;
    if (hitBottom) this.y = config.canvas.height - this.height;
  }
};

// Configure the behavior for the left paddle
leftPaddle.watch(paddleBehavior.addControls(87, 83)) // w, s
leftPaddle.watch(paddleBehavior.restrictBounds);

// Configure the behavior for the right paddle
rightPaddle.watch(paddleBehavior.addControls(38, 40)) // up, down
rightPaddle.watch(paddleBehavior.restrictBounds)

let ballBehavior = {
  wallCollision: function() {
    if (this.y - this.radius <= 0) {
      this.velocityY = -(this.velocityY - 0.2);
    } else if (this.y + this.radius >= config.canvas.height) {
      this.velocityY = -(this.velocityY + 0.2);
    }
  },
  leftPaddleCollision: function() {
    if (this.x - this.radius <= leftPaddle.x + leftPaddle.width &&
        this.y + this.radius >= leftPaddle.y &&
        this.y - this.radius <= leftPaddle.y + leftPaddle.height) {
      this.velocityX = -(this.velocityX - 0.1);
      this.velocityY += (leftPaddle.velocityY / 3);
    }
  },
  rightPaddleCollision: function() {
    if (this.x + this.radius >= rightPaddle.x &&
        this.y + this.radius >= rightPaddle.y &&
        this.y - this.radius <= rightPaddle.y + rightPaddle.height) {
      this.velocityX = -(this.velocityX + 0.1);
      this.velocityY += (rightPaddle.velocityY / 3);
    }
  },
  edgeCollision: function() {
    if (this.x - this.radius <= 0) {
      score.right += 1;
      this.reset();
      return false;
    }
    if (this.x + this.radius >= config.canvas.width) {
      score.left += 1;
      this.reset();
      return false;
    }
  },
  move: function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
};

// Configure the behavior for the ball
ball.watch(ballBehavior.edgeCollision);
ball.watch(ballBehavior.leftPaddleCollision);
ball.watch(ballBehavior.rightPaddleCollision);
ball.watch(ballBehavior.wallCollision);
ball.watch(ballBehavior.move);

function bootstrap() {
  let leftScore = document.getElementById("left-score");
  let rightScore = document.getElementById("right-score");

  function nextFrame() {
    // update entities
    _.invoke(entities, "nextFrame");
    // reset canvas
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, config.canvas.width, config.canvas.height);
    // render entities
    _.invoke(entities, "render", context);
    // update scores
    leftScore.innerText = score.left;
    rightScore.innerText = score.right;
    // register callback for the next frame
    animate(nextFrame);
  }

  document.getElementById("container").appendChild(canvas);
  animate(nextFrame);
}

window.addEventListener("DOMContentLoaded", bootstrap);
