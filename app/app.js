import {createCanvas, getContext} from "./modules/canvas";
import createPaddle from "./modules/paddle";
import createBall from "./modules/ball";
import createScore from "./modules/score";

import pressedKeys from "./modules/pressedKeys";

import behavior from "./modules/behavior";

import config from "./config";

let keys = pressedKeys();

let score = createScore(config);

let leftPaddle = createPaddle(config.paddle, { x: 0, y: 170 });
let rightPaddle = createPaddle(config.paddle, { x: 590, y: 170 });
let ball = createBall(config.ball);

let entities = [ball, leftPaddle, rightPaddle];

let canvas = createCanvas(config.canvas);
let context = getContext(canvas);

// Reset the context
context.fillStyle = "#ffffff";
context.fillRect(0, 0, config.canvas.width, config.canvas.height);

// Configure the behavior for the paddles.
{
  let controlsConfig = {
    keys: keys,
    paddleConfig: config.paddle
  };
  let leftConfig = _.extend({}, controlsConfig, config.leftPaddle);
  let rightConfig = _.extend({}, controlsConfig, config.rightPaddle);

  leftPaddle.compose(behavior.addControls(leftConfig));
  rightPaddle.compose(behavior.addControls(rightConfig));

  let restrictBounds = behavior.restrictBounds({
    canvasConfig: config.canvas
  });

  leftPaddle.compose(restrictBounds);
  rightPaddle.compose(restrictBounds);
}

// Configure the behavior for the ball.
{
  let wall = behavior.wallCollision({
    canvasConfig: config.canvas
  });
  let left = behavior.leftPaddleCollision({leftPaddle});
  let right = behavior.rightPaddleCollision({rightPaddle});
  let edge = behavior.edgeCollision({
    canvasConfig: config.canvas,
    score: score
  });

  ball.compose(wall);
  ball.compose(left);
  ball.compose(right);
  ball.compose(edge);
  ball.compose(behavior.limitVelocity);
  ball.compose(behavior.move);
}

// Export the configured environment
export {entities, canvas, context, score};
