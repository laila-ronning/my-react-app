var Promise = require('es6-promise').Promise;
var $ = require('jquery');
var _ = require('lodash');

function failFn(url, res) {
    console.error(res.status + " (" + res.statusText + ") - " + url, res.responseText);
}

function post(url, data) {
    return Promise.resolve($.post(url, data).fail(_.partial(failFn, url)));
}

function postJson(url, data) {
    return Promise.resolve($.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).fail(_.partial(failFn, url)));
}

function get(url) {
    return Promise.resolve($.get(url).fail(_.partial(failFn, url)));
}

function ajax(request) {
    return Promise.resolve($.ajax(request).fail(_.partial(failFn, request.url)));
}

module.exports = {
    ajax: ajax,
    get: get,
    post: post,
    postJson: postJson
};
