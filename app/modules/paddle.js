import createEntity from "./entity";

const _paddle = {
  type: "paddle",
  width: 0,
  height: 0,
  // The clear method paints the object, plus a bit more around it to completely
  // clear the object's previous position
  clear: function(context, color) {
    return this._draw(this.x - 1, this.y - 1, this.width + 2, this.height + 2, context, color);
  },
  // The render method paints the object onto a context with a specific color
  render: function(context, color) {
    return this._draw(this.x, this.y, this.width, this.height, context, color);
  },
  // Internal, "private" method for rendering this specific kind of entity
  _draw: function(x, y, width, height, context, color) {
    context.fillStyle = color;
    context.fillRect((0.5 + x) | 0, (0.5 + y) | 0, width, height);
    return this;
  }
};

export default (...props) => createEntity(_paddle, ...props);
