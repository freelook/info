'use strict';

var sql = require('components/core/sql'),
    feeds = require('components/feeds/feeds.server.model'),
    users = require('components/users/users.server.model'),
    users_feeds = sql.define('users_feeds', {type: sql.constructor.STRING});

users.belongsToMany(feeds, {through: users_feeds});
feeds.belongsToMany(users, {through: users_feeds});

users_feeds.belongsTo(feeds);
users_feeds.belongsTo(users);

feeds.hasMany(users_feeds);
users.hasMany(users_feeds);

users_feeds.sync();

module.exports = users_feeds;