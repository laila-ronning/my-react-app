/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the DeployStore and passes the new data to its children.
 */

var Header = require('./Header.react');
var React = require('react');
var DeployStore = require('../stores/DeployStore');

/**
 * Retrieve the current Deploy data from the DeployStore
 */
function getDeployState() {
  return {
    allDeploys: DeployStore.getAll(),
    areAllComplete: DeployStore.areAllComplete()
  };
}

var DeployApp = React.createClass({

  getInitialState: function() {
    return getDeployState();
  },

  componentDidMount: function() {
    DeployStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DeployStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <Header />
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
