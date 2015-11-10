const _entity = {
  type: "entity",
  x: 0,
  y: 0,
  velocityX: 0,
  velocityY: 0,
  nextFrame: function() {
    _.forEach(this.watchers, (fn) => fn.call(this));
    return this;
  },
  compose: function(callback) {
    this.watchers.push(callback);
    return this;
  },
  reset: function() {
    _.assign(this, ...this.setup());
  },
  render: function(_) {
    console.error("Implement a render method for ", this);
  }
};

export default function createEntity(prototype, ...props) {
  let setup = function() { return props; };
  let watchers = [];
  let entity = _.assign({}, _entity, prototype, {setup}, ...props);
  return _.assign(entity, {watchers}, ...entity.setup());
}
