export function createCanvas(...props) {
  return Object.assign(document.createElement("canvas"), ...props);
}

export function getContext(canvas) {
  return canvas.getContext("2d");
}
