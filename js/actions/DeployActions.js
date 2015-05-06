
var AppDispatcher = require('../dispatcher/AppDispatcher');
var DeployConstants = require('../constants/DeployConstants');

var DeployActions = {

  /**
   * @param  {string} name
   * @param  {string} version
   */
  create: function(name, version) {
    AppDispatcher.dispatch({
      actionType: DeployConstants.DEPLOY_CREATE,
      name: name,
      version: version
    });
  },

  /**
   * @param  {string} id The ID of the Deploy item
   * @param  {string} name
   * @param  {string} version
   */
  updateText: function(id, name, version) {
    AppDispatcher.dispatch({
      actionType: DeployConstants.DEPLOY_UPDATE_TEXT,
      id: id,
      name: name,
      version: version
    });
  },

  /**
   * Toggle whether a single Deploy is complete
   * @param  {object} deploys
   */
  toggleComplete: function(deploy) {
    var id = deploy.id;
    var actionType = deploy.complete ?
        DeployConstants.DEPLOY_UNDO_COMPLETE :
        DeployConstants.DEPLOY_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all Deploy as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: DeployConstants.DEPLOY_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: DeployConstants.DEPLOY_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed Deploys
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: DeployConstants.DEPLOY_DESTROY_COMPLETED
    });
  }

};

module.exports = DeployActions;
