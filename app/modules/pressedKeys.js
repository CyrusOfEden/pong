export default function pressedKeys() {
  let keys = {};
  window.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
  });

  window.addEventListener("keyup", function(event) {
    delete keys[event.keyCode];
  });
  return keys;
}
