const _entity = {
  type: "entity",
  x: 0,
  y: 0,
  velocityX: 0,
  velocityY: 0,
  nextFrame: function() {
    for (let fn of this.watchers) fn.call(this);
    return this;
  },
  compose: function(callback) {
    this.watchers.push(callback);
    return this;
  },
  reset: function() {
    _.extend(this, ...this.setup());
  },
  clear: function() {
    console.error("Implement a clear method for ", this);
  },
  render: function() {
    console.error("Implement a render method for ", this);
  }
};

export default function createEntity(prototype, ...props) {
  let setup = () => props;
  let watchers = [];
  let entity = _.extend({}, _entity, prototype, {setup, watchers}, ...props);
  entity.reset();
  return entity;
}
