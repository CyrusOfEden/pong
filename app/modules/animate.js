const animateFrame = window.requestAnimationFrame ||
                     window.mozRequestAnimationFrame ||
                     window.webkitRequestAnimationFrame ||
                     function(callback) { setTimeout(callback, 1000/60) };


export default animateFrame.bind(window);