import {entities, canvas, context, score} from "./app";
import animate from "./modules/animate";

const COLORS = [
  "#001f3f",
  "#0074D9",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#FF4136",
  "#85144b",
  "#F012BE",
  "#B10DC9"
];
let index = 0;

const getColor = _.throttle(() => {
  index = index >= COLORS.length ? 0 : index;
  return COLORS[index++];
}, 100);

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
        .render(context, getColor());
        // .render(context, "#ff3333");
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
