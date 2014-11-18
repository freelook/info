'use strict';

var freelook;

window.chrome.runtime.onMessageExternal.addListener(function (data, from, response) {
    if (data.msg === 'init') {
        freelook = from.tab;
        response({
            success: true
        });
    }
});
