"use strict";
exports.__esModule = true;
var handler_1 = require("./handler");
addEventListener('fetch', function (event) {
    try {
        var request = event.request;
        if (request.method !== 'POST') {
            throw { status: 405, message: 'method not allowed' };
        }
        event.respondWith(handler_1.handleRequest(event.request));
    }
    catch (e) {
        var res = new Response(JSON.stringify({ status: e.status, message: e.message }), { status: e.status });
        event.respondWith(res);
    }
});
