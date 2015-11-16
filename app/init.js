import {entities, canvas, context, score} from "./app";
import animate from "./modules/animate";

function bootstrap() {
  let leftScore = $("#left-score");
  let rightScore = $("#right-score");

  let entity;
  let paused = true;

  function nextFrame() {
    if (paused) {
      animate(nextFrame);
      return;
    }
    // render entities
    for (entity of entities) {
      entity
        .clear(context, "#ffffff")
        .nextFrame()
        .render(context, "#ff3333");
    }
    // update scores
    leftScore.text(score.left);
    rightScore.text(score.right);
    // if anyone won, well then they won :)
    if (score.winner()) {
      alert(score.message());
      score.reset();
    }
    // register callback for the next frame
    animate(nextFrame);
  }

  $("#help").before(canvas);
  animate(nextFrame);

  $(window).on("keypress", (event) => {
    if (event.keyCode == 32) paused = !paused;
  });
}

$(document).ready(bootstrap);
