import createEntity from "./entity";

const _ball = {
  type: "ball",
  radius: 0,
  // The clear method paints the object, plus a bit more around it to completely
  // clear the object's previous position
  clear: function(context, color) {
    return this._draw(this.x, this.y, this.radius + 1, context, color);
  },
  // The render method paints the object onto a context with a specific color
  render: function(context, color) {
    return this._draw(this.x, this.y, this.radius, context, color);
  },
  // Internal, "private" method for rendering this specific kind of entity
  _draw: function(x, y, radius, context, color) {
    context.beginPath();
    // (0.5 + x) | 0 is a performant rounding method
    context.arc((0.5 + x) | 0, (0.5 + y) | 0, radius, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    return this;
  }
};

export default (...props) => createEntity(_ball, ...props);
