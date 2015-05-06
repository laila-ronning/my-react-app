/*
 * DeployStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DeployConstants = require('../constants/DeployConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var DEPLOYS = [
  {id: 'Sporting Goods 1', version: '$49.99', complete: true, name: 'Football'},
  {id: 'Sporting Goods 2', version: '$9.99', complete: true, name: 'Baseball'},
  {id: 'Sporting Goods 3', version: '$29.99', complete: false, name: 'Basketball'},
  {id: 'Electronics 1', version: '$99.99', complete: true, name: 'iPod Touch'},
  {id: 'Electronics 2', version: '$399.99', complete: false, name: 'iPhone 5'},
  {id: 'Electronics 3', version: '$199.99', complete: true, name: 'Nexus 7'}
];

var _deploys = DEPLOYS;

/**
 * Create a Deploy item.
 * @param  {string} name, version The content of the Deploy
 */
function create(name, version) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _deploys[id] = {
    id: id,
    complete: false,
    name: name,
    version: version,
    state: DeployConstants.DEPLOY_CREATE
  };
}

/**
 * Update a Deploy item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _deploys[id] = assign({}, _deploys[id], updates);
}

/**
 * Update all of the Deploy items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  for (var id in _deploys) {
    update(id, updates);
  }
}

/**
 * Delete a Deploy item.
 * @param  {string} id
 */
function destroy(id) {
  delete _deploys[id];
}

/**
 * Delete all the completed Deploy items.
 */
function destroyCompleted() {
  for (var id in _deploys) {
    if (_deploys[id].complete) {
      destroy(id);
    }
  }
}

var DeployStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining Deploy items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _deploys) {
      if (!_deploys[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _deploys;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var name;
  var version;

  switch(action.actionType) {
    case DeployConstants.DEPLOY_CREATE:
     if (name !== '' && version !== '') {
        create(name, version);
        DeployStore.emitChange();
      }
      break;

    case DeployConstants.DEPLOY_TOGGLE_COMPLETE_ALL:
      if (DeployStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      DeployStore.emitChange();
      break;

    case DeployConstants.DEPLOY_UNDO_COMPLETE:
      update(action.id, {complete: false});
      DeployStore.emitChange();
      break;

    case DeployConstants.DEPLOY_COMPLETE:
      update(action.id, {complete: true});
      DeployStore.emitChange();
      break;

    case DeployConstants.DEPLOY_UPDATE_TEXT:
      if (name !== '' && version !== '') {
        update(action.id, {name: name, version: version});
        DeployStore.emitChange();
      }
      break;

    case DeployConstants.DEPLOY_DESTROY:
      destroy(action.id);
      DeployStore.emitChange();
      break;

    case DeployConstants.DEPLOY_DESTROY_COMPLETED:
      destroyCompleted();
      DeployStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = DeployStore;
