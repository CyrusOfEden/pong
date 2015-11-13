import createEntity from "./entity";

const _ball = {
  type: "ball",
  radius: 0,
  clear: function(context, color) {
    return this._draw(this.x, this.y, this.radius + 1, context, color);
  },
  render: function(context, color) {
    return this._draw(this.x, this.y, this.radius, context, color);
  },
  _draw: function(x, y, radius, context, color) {
    context.beginPath();
    context.arc(x, y, radius, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    return this;
  }
};

export default (...props) => createEntity(_ball, ...props);
