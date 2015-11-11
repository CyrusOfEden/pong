import {createCanvas, getContext} from "./modules/canvas";
import createPaddle from "./modules/paddle";
import createBall from "./modules/ball";

import animate from "./modules/animate";
import pressedKeys from "./modules/pressedKeys";

import behavior from "./modules/behavior";

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

// Configure the behavior for the paddles.
{
  let controlsConfig = {
    keys: keys,
    paddleConfig: config.paddle
  };
  let restrictBounds = behavior.restrictBounds({
    canvasConfig: config.canvas
  });
  let leftControls = behavior.addControls(_.assign({
    upKey: 87, // w
    downKey: 83 // s
  }, controlsConfig));
  let rightControls = behavior.addControls(_.assign({
    upKey: 38, // up
    downKey: 40 // down
  }, controlsConfig));

  leftPaddle.compose(leftControls);
  leftPaddle.compose(restrictBounds);

  rightPaddle.compose(rightControls);
  rightPaddle.compose(restrictBounds);
}

{
  let wall = behavior.wallCollision({ canvasConfig: config.canvas });
  let left = behavior.leftPaddleCollision({leftPaddle});
  let right = behavior.rightPaddleCollision({rightPaddle});
  let edge = behavior.edgeCollision({ canvasConfig: config.canvas, score });

  ball.compose(wall);
  ball.compose(left);
  ball.compose(right);
  ball.compose(edge);
  ball.compose(behavior.limitVelocity);
  ball.compose(behavior.move);
}

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
