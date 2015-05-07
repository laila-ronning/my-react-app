
var React = require('react');

var DeployApp = require('./components/DeployApp.react');
var Events = require('./utils/Events');

React.render(
  <DeployApp />,
  document.getElementById('deployapp')
);


Events.on('nye_data', function(data) {
    console.log('oioi fikk nye data', data);
})

Events.on('nye_data', function(data) {
    console.log('fikk også nye data', data);
})

Events.trigger('nye_data', [1,2,3]);