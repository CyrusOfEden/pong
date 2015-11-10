import createEntity from "./entity";

const _ball = {
  type: "ball",
  radius: 0,
  render: function(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#333333";
    context.fill();
    return this;
  },
};

export default (...props) => createEntity(_ball, ...props);
