require('cloud/show/click.js');

Parse.Cloud.beforeSave('SHOW', function (request, response) {

    if (request.master) {
        return response.success();
    }

    var User = new Parse.Query(Parse.User);
    User
        .equalTo('id', request.user.objectId)
        .first()
        .then(function (_user) {
            if (_user) {
                var price = +request.object.get('price'),
                    amount = +request.object.get('amount'),
                    title = request.object.get('title') || '',
                    content = request.object.get('content') || '',
                    looks = +_user.get('looks') || 0,
                    total = price * amount;

                if (total > looks) {
                    return response.error({
                        err: 'NOT_ENOUGH_LOOKS'
                    });
                }

                if (title.length > 100) {
                    request.object.set(title, title.substring(0, 97) + '...');
                }

                if (content.length > 300) {
                    request.object.set(content, content.substring(0, 297) + '...');
                }

                Parse.Cloud.useMasterKey();
                _user.set('looks', looks - total).save().then(function () {
                    response.success();
                });
            }
        });

});

Parse.Cloud.afterSave('SHOW', function (request) {
    if (+request.object.get('amount') < 1) {
        return request.object.destroy();
    }
});