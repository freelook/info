/**
 * Created by Dima Kostrub on 24.12.15.
 */

(function () {
    'use strict';

    var event, eventName = 'backbutton';

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    }

    event.eventName = eventName;

    if (document.createEvent) {
        document.dispatchEvent(event);
    } else {
        document.fireEvent('on' + event.eventType, event);
    }

    return eventName;

}());
