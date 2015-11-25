import {entities, canvas, context, score} from "./app";
import animate from "./modules/animate";
import queryParams from "./modules/queryParams";

// _.throttle ensures that subsequent calls to the getColor function within a
// 100ms window return the original value.
let color = {
  COLORS: [
    "#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#2ECC40",
    "#01FF70", "#FFDC00", "#FF851B", "#FF4136", "#85144b", "#F012BE"
  ],
  index: 0,
  get: _.throttle(function() {
    return this.COLORS[this.index >= this.COLORS.length ?
                       (this.index = 0) && 0:
                       this.index++];
  }, 100)
};

function bootstrapSettings() {
  let settings = $("#settings");
  let params = queryParams();
  if (params.bot === "true") {
    settings.append(
      $("<a></a>")
        .text("Play against a human")
        .attr("href", "?bot=false")
    );
  } else {
    settings.append(
      $("<a></a>")
        .text("Play against a bot")
        .attr("href", "?bot=true")
    );
  }
}

function bootstrap() {
  let leftScore = $("#left-score");
  let rightScore = $("#right-score");

  bootstrapSettings();

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
        .render(context, color.get());
        // .render(context, "#ff3333");
    }
    // update scores
    leftScore.text(score.left);
    rightScore.text(score.right);
    // if anyone won, well then they won :)
    if (score.winner()) {
      alert(score.message());
      document.location.reload();
    }
    // register callback for the next frame
    animate(nextFrame);
  }

  $("#help").before(canvas);
  animate(nextFrame);

  $(window).on("keypress", (event) => {
    // Update the value of paused when the spacebar is pressed
    if (event.keyCode == 32) paused = !paused;
  });
}

$(document).ready(bootstrap);
