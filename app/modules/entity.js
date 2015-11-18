// The default entity.
const _entity = {
  type: "entity",
  // Store the current x and y coordinates
  x: 0,
  y: 0,
  // Store the current velocityX and velocityY
  velocityX: 0,
  velocityY: 0,
  // Call every attached function as a method to update the current state
  nextFrame: function() {
    for (let fn of this.watchers) fn.call(this);
    return this;
  },
  // Add a callback to the list of methods to be called by nextFrame
  compose: function(callback) {
    this.watchers.push(callback);
    return this;
  },
  // Reset the x, y, velocityX, and velocityY
  reset: function(watchers = false) {
    if (watchers) this.watchers = [];
    _.extend(this, ...this.setup());
  },
  // Subclasses must override the clear and render methods.
  clear: function() {
    console.error("Implement a clear method for ", this);
  },
  render: function() {
    console.error("Implement a render method for ", this);
  }
};

// Creates an entity based on a prototype and properties
export default function createEntity(prototype, ...props) {
  // Have a method that returns the starting props
  let setup = () => props;
  // Set the watchers to an empty list
  let watchers = [];
  // Bootstrap an plain object with the entity, the provided prototype,
  // the setup method, the watchers attribute, and then provided properties
  let entity = _.extend({}, _entity, prototype, {setup, watchers}, ...props);
  // Call the reset method on the entity. Can be overriden.
  entity.reset();
  // Return the entity
  return entity;
}
