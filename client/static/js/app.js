
var React = require('react');

var DeployApp = require('./components/DeployApp.react');
var Events = require('./utils/Events');

React.render(
  <DeployApp />,
  document.getElementById('deployapp')
);
