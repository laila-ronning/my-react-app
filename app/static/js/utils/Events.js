/**
 * Subscribes to an event
 * @param {string} event
 * @param {function} callback
 * @param {object} [context]
 */
function on(event, callback, context) {
    var callbacks = this._callbacks || (this._callbacks = {});
    var events = callbacks[event] || (callbacks[event] = []);
    events.push({ callback: callback, context: context });
}

/**
 * Unsubscribes from event. If no callback is given all listeners are removed
 * @param {string} event
 * @param {function} [callback]
 * @param {object} [context]
 */
function off(event, callback, context) {
    // If neither callback nor context is specified we remove all callbacks for an event.
    if (!callback && !context) {
        delete this._callbacks[event];
    }

    // If there are callbacks specified for an event, we loop through them and remove
    var events = this._callbacks[event] || [];
    for (var i = 0; i < events.length; i++) {
        if (!(callback && events[i].callback !== callback || context && events[i].context !== context)) {
            events.splice(i, 1);
        }
    }
}

/**
 * Trigger event. Additional arguments are passed to the callbacks
 * @param {string} event
 */
function trigger(event) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.log([], event, args[0]);
    var callbacks = this._callbacks || {};
    var events = callbacks[event] || [];
    for (var i = 0; i < events.length; i++) {
        events[i].callback.apply(events[i].context || this, args);
    }
}

function createTrigger(event, data) {
    return trigger.bind(this, event, data);
}

module.exports = {
    ADD_DEPLOY: 'ADD_DEPLOY',
    REMOVE_DEPLOY: 'REMOVE_DEPLOY',
    DEPLOY_CREATE: 'DEPLOY_CREATE',
    DEPLOYED: 'DEPLOYED',
    RERENDER: 'RERENDER',


    on: on,
    off: off,
    trigger: trigger,
    createTrigger: createTrigger
};
