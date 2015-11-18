Parse.Cloud.beforeSave('SHOW', function (request, response) {

    var User = new Parse.Query(Parse.User);
    User.first({objectId: request.user.objectId}).then(function (user) {
        var price = +request.object.get('price'),
            amount = +request.object.get('amount'),
            looks = +user.get('looks') || 0,
            total = price * amount;

        if (total > looks) {
            return response.error({
                err: 1,
                code: 'NOT_ENOUGH_LOOKS'
            });
        }

        Parse.Cloud.useMasterKey();
        user.set('looks', looks - total).save().then(function () {
            response.success();
        });
    });

});