
var React = require('react');
var DeployActions = require('../actions/DeployActions');
var Events = require('../utils/Events');

var InputSection = React.createClass({

  getInitialState: function() {
     return {name: '', version: ''};
  },

  setName: function(e) {
    this.setState({name: e.target.value});
  },
  setVersion: function(e) {
    this.setState({version: e.target.value});
  },
  render: function() {
    return (
    <div>
        <input
          id="name"
          placeholder="<application name>"
          value={this.state.name}
          onChange={this.setName}
        />
        <input
          id="version"
          placeholder="<version>"
          value={this.state.version}
          onChange={this.setVersion}

        />
        <button
            onClick={this._onSave}
            >Add to deploylist
        </button>
    </div>
    );
  },

  /**
   * Event handler called within DeployTextInput.
   * Defining this here allows DeployTextInput to be used in multiple places
   * in different ways.
   * @param {string} name
   * @param {string} version
   */
  _onSave: function() {
    console.log("Name of component to deploy:" + this.state.name);
    console.log("Version of component to deploy:" + this.state.version);
    DeployActions.create(this.props.name, this.props.version);

  }

});

module.exports = InputSection;
