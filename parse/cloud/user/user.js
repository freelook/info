Parse.Cloud.beforeSave(Parse.User, function (request, response) {
    if (request.object.isNew()) {
        request.object.set('looks', 100);
    } else {
        if (!request.master && request.object.dirty('looks')) {
            return response.error({
                err: 2,
                code: 'LOOKS_READ_ONLY'
            });
        }
    }

    return response.success();
});

