export function createCanvas(...props) {
  return _.assign(document.createElement("canvas"), ...props);
}

export function getContext(canvas) {
  return canvas.getContext("2d");
}
