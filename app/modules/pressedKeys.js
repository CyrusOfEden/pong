export default function pressedKeys() {
  let keys = {};

  $(window)
    .on("keydown", (event) => {
      keys[event.keyCode] = true;
    })
    .on("keyup", (event) => {
      delete keys[event.keyCode];
    });

  return keys;
}
