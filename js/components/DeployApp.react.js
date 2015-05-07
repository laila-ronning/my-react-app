/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the DeployStore and passes the new data to its children.
 */

var React = require('react');
var InputSection = require('./InputSection.react');
var ListSection = require('./ListSection.react');
var DeployStore = require('../stores/DeployStore');
var Events = require('../utils/Events');

/**
 * Retrieve the current Deploy data from the DeployStore
 */
function getDeployState() {
  return {
    allDeploys: DeployStore.getAll(),
  };
}

var DeployApp = React.createClass({

  getInitialState: function() {
    return getDeployState();
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <header id="header">
          <h1>Nodemanager deploy</h1>
          </header>
          <body>
            <InputSection />
            <ListSection
                allDeploys={this.state.allDeploys}
            />
          </body>
     </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the DeployStore
   */
  _onChange: function() {
    this.setState(getDeployState());
  }

});

module.exports = DeployApp;
