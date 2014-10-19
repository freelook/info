'use strict';

var app = {

    initialize: function () {
        app.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    onDeviceReady: function () {
        var ref = window.open('http://test.freelook.info', '_blank', 'location=no,hidden=no');
        ref.addEventListener('loadstop', function (event) {
            alert('stop: ' + event.url);
        });
    }
};

app.initialize();
