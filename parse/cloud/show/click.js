Parse.Cloud.define('show_click', function (request, response) {

    if (!request.master) {
        return response.error({
            err: 'NOT_VALID_CLICK'
        });
    }

    var SHOW = Parse.Object.extend('SHOW'),
        Show = new Parse.Query(SHOW);

    Show
        .equalTo('objectId', request.params.id)
        .first()
        .then(function (_show) {
            if (_show) {
                Parse.User.become(request.params.token).then(function (_user) {
                    if (_user) {
                        var looks = +_user.get('looks'),
                            price = +_show.get('price'),
                            amount = +_show.get('amount');

                        Parse.Cloud.useMasterKey();
                        if (amount > 0) {
                            _show.add('users', _user)
                                .set('amount', amount - 1)
                                .save()
                                .then(function () {
                                    _user.set('looks', looks + price).save().then(function () {
                                        response.success({url: _show.get('url')});
                                    });
                                });
                        }
                    }
                });
            }
        });

});
