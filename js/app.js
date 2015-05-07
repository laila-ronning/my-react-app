
var React = require('react');

var DeployApp = require('./components/DeployApp.react');

React.render(
  <DeployApp />,
  document.getElementById('deployapp')
);




function on(event, callback, context) {
  var callbacks = this._callbacks || (this._callbacks = {});
  var events = callbacks[event] || (callbacks[event] = []);
  events.push({ callback: callback, context: context });
}

function off(event, callback, context) {
  if (!callback && !context) {
    delete this._callbacks[event];
  }

  var events = this._callbacks[event] || [];
  for (var i = 0; i < events.length; i++) {
    if (!(callback && events[i].callback !== callback || context && events[i].context !== context)) {
      events.splice(i, 1);
    }
  }
}


 function trigger(event) {
  var args = Array.prototype.slice.call(arguments, 1);
  var callbacks = this._callbacks || {};
  var events = callbacks[event] || [];
  for (var i = 0; i < events.length; i++) {
    events[i].callback.apply(events[i].context || this, args);
  }
}

on('nye_data', function(data) {
    console.log('oioi fikk nye data', data);
})

on('nye_data', function(data) {
    console.log('fikk også nye data', data);
})

trigger('nye_data', [1,2,3]);