// paddleA.watch(function() {
//   let moveSpeed = 0;
//   if (keys[87]) moveSpeed -= config.paddle.moveSpeed;
//   if (keys[83]) moveSpeed += config.paddle.moveSpeed;
//   this.y += moveSpeed;
//   this.velocityY = moveSpeed;
//   if (this.y < 0 || this.y + this.height > config.canvas.height) {
//     this.y -= moveSpeed;
//     this.velocityY = 0;
//   }
// });
// paddleB.watch(function() {
//   let moveSpeed = 0;
//   if (keys[38]) moveSpeed -= config.paddle.moveSpeed;
//   if (keys[40]) moveSpeed += config.paddle.moveSpeed;
//   this.y += moveSpeed;
//   this.velocityY = moveSpeed;
//   if (this.y < 0 || this.y + this.height > config.canvas.height) {
//     this.y -= moveSpeed;
//     this.velocityY = 0;
//   }
// });

// ball.watch(function() {
//   if (this.y - this.radius <= 0 || this.y + this.radius >= config.canvas.height) {
//     this.velocityY = -this.velocityY;
//   }
//   if (this.x + this.radius >= 300) {
//     if (this.x + this.radius >= paddleB.x && this.y + this.radius >= paddleB.y && this.y - this.radius <= paddleB.y + paddleB.height) {
//       this.velocityX += this.velocityX < 0 ? -0.5 : 0.5;
//       this.velocityX = -this.velocityX;
//       this.velocityY += (paddleB.velocityY / 2);
//     }
//   } else if (this.x - this.radius <= 300) {
//     if (this.x - this.radius <= paddleA.x + paddleA.width && this.y + this.radius >= paddleA.y && this.y - this.radius <= paddleA.y + paddleA.height) {
//       this.velocityX += this.velocityX < 0 ? -0.5 : 0.5;
//       this.velocityX = -this.velocityX;
//       this.velocityY += (paddleA.velocityY / 2);
//     }
//   }
// });
// ball.watch(function() {
//   if (this.x - this.radius <= 0) {
//     ball.reset();
//     rightScore.innerText = Number(rightScore.innerText) + 1;
//     return false;
//   } else if (this.x + this.radius >= config.canvas.width) {
//     ball.reset();
//     leftScore.innerText = Number(leftScore.innerText) + 1;
//     return false;
//   }
//   return true;
// });

const magnitude = (number, change) =>
  (Math.abs(number) + change) * (number < 0 ? -1 : 1);

function pongBall(env) {
  return function() {
    if (this.y - this.radius <= 0 ||
        this.y + this.radius >= env.config.canvas.height) {
      this.velocityY = -magnitude(this.velocityY, -0.25);
    }
  }
}

function paddle(env) {
  return function() {

  }
}

// function paddleController(env, paddleConfig) {
//   return function() {
//     if (this.y <= 0 || this.y + this.height >= env.config.canvas.height) {
//       this.velocityY = 0;
//     } else {
//       let moveSpeed = 0;
//       if (env.keys[paddleConfig.upKey]) moveSpeed -= paddleConfig.moveSpeed;
//       if (env.keys[paddleConfig.downKey]) moveSpeed += paddleConfig.moveSpeed;
//       this.velocityY += this.moveSpeed;
//       this.y += this.velocityY;
//     }
//   }
// }

function leftPaddle(env) {
  return function() {
  }
}

function rightPaddle(env) {
  return function() {
  }
}

export default {pongBall, paddle, paddleController, leftPaddle, rightPaddle};
