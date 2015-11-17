Parse.Cloud.beforeSave(Parse.User, function (request, response) {
    if (request.object.isNew()) {
        request.object.set('looks', 100);
    } else {
        if (!request.master && request.object.dirty('looks')) {
            return response.error('looks is a read only field');
        }
    }

    return response.success();
});

