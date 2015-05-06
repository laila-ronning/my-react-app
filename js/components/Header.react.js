
var React = require('react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Nodemanager deploy</h1>
        <input
          id="name"
          placeholder="<application name>"

        />
        <input
          id="version"
          placeholder="<version>"

        />
     <button onClick={this._onSave}>Add to deploylist</button>
    </header>
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
    console.log("Name of component to deploy:" + this.props.name);
    console.log("Version of component to deploy:" + this.props.version);

//    if (name){
      DeployActions.create(this.props.name, this.props.version);
//    }

  }

});

module.exports = Header;
