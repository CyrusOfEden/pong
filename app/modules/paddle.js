import createEntity from "./entity";

const _paddle = {
  type: "paddle",
  width: 0,
  height: 0,
  render: function(context) {
    context.fillStyle = "#333333";
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
};

export default (...props) => createEntity(_paddle, ...props);
