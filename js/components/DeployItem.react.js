
var React = require('react');
var ReactPropTypes = React.PropTypes;
var Events = require('../utils/Events');

var cx = require('react/lib/cx');

var DeployItem = React.createClass({

  propTypes: {
   deploy: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var deploy = this.props.deploy;

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={cx({
          'completed': deploy.complete,
          'editing': this.state.isEditing
        })}
        key={deploy.id}>
        <div className="view">
            <label onDoubleClick={this._onDoubleClick}>
                {deploy.name+"-"+deploy.version}
            </label>
          <button className="deploy" onClick={this._onChange}>deploy</button>
          <button className="destroy" onClick={this._onDestroyClick}>remove</button>
        </div>
      </li>
    );
  },

  _onDestroyClick: function() {
    Events.trigger(Events.REMOVE_DEPLOY, this.props.deploy.id);
    console.log("Triggered REMOVE_DEPLOY event", this.props.deploy.id);
  },

  _onChange: function() {
      Events.trigger(Events.DEPLOY_CREATE, this.props.deploy.id);
      console.log("Triggered DEPLOY_CREATE event", this.props.deploy.id);
  }

});

module.exports = DeployItem;
