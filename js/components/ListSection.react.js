
var React = require('react');
var ReactPropTypes = React.PropTypes;
var DeployActions = require('../actions/DeployActions');
var DeployItem = require('./DeployItem.react');
var Events = require('../utils/Events');

var ListSection = React.createClass({

  propTypes: {
    allDeploys: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var allDeploys = this.props.allDeploys;
    var deploys = [];

    for (var key in allDeploys) {
      deploys.push(<DeployItem key={key} deploy={allDeploys[key]} />);
    }

    return (
      <section id="list">
        <ul id="deploy-list">{deploys}</ul>
      </section>
    );
  },

});

module.exports = ListSection;
