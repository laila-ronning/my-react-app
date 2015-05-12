/*
 * DeployStore
 */

var DeployConstants = require('../constants/DeployConstants');
var Events = require('../utils/Events');
var Deploy = require('../deploy.js');

var DEPLOYS = [
  {id: 'registry', version: '3.2.1', complete: true, name: 'Oppslagstjenesten'},
  {id: 'mag-driftdashboard', version: '3.2.2', complete: true, name: 'Drift-console'},
  {id: 'node-manager-server', version: '0.2.0', complete: false, name: 'Deploy-server'},
  {id: 'node-manager-web', version: '0.0.1', complete: true, name: 'Deploy-console'},
  {id: 'skatteinfo-web', version: '4.3.2', complete: false, name: 'Skattefinn'},
  {id: 'boks', version: '3.4.2', complete: true, name: 'boks-cluster'},
  {id: 'iris', version: '3.4.2', complete: true, name: 'iris-cluster'}];

var _deploys = DEPLOYS;

Events.on(Events.ADD_DEPLOY, function(deployItem) {
    console.log('Deploystore, add deployItem with name ', deployItem[0] + " and version " + deployItem[1]);
    create(deployItem[0], deployItem[1]);

    Events.trigger(Events.RERENDER, _deploys);
});

Events.on(Events.REMOVE_DEPLOY, function(deployId) {
    console.log('Deploystore, remove deployItem with id ', deployId);
    destroy(deployId);

    Events.trigger(Events.RERENDER, _deploys);
});

Events.on(Events.DEPLOY_CREATE, function(deployId) {
    console.log('Deploystore, deploy deployItem with id ', deployId);
    Deploy.deploy(deployId);

    Events.trigger(Events.RERENDER, _deploys);
});

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
 * Delete a Deploy item.
 * @param  {string} id
 */
function destroy(id) {
  delete _deploys[id];
}

module.exports = {
    getAll: function () {
        return _deploys;
    }
};
