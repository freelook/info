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
                    looks = +_user.get('looks') || 0,
                    total = price * amount;

                if (total > looks) {
                    return response.error({
                        err: 'NOT_ENOUGH_LOOKS'
                    });
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