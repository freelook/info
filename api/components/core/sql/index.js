'use strict';

var config = require('components/core/config'),
    sequelize = require('sequelize'),
    sql = new sequelize(config.MYSQL.URI);


module.exports = sql;