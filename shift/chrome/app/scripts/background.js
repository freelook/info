'use strict';


chrome.runtime.onMessageExternal.addListener(function (msg, from) {
    console.dir(arguments);
    // TODO Work with from.tab.id
});


// Client msg

//function e() {
//    var editorExtensionId = 'iglkihmilnabdfiplkamngaicaaabdgd';
//
//// Make a simple request:
//    chrome.runtime.sendMessage(editorExtensionId, {oauth: 'vk'});
//}
