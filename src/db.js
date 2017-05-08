const promise = require('bluebird');

const pgp = require('pg-promise')({
  promiseLib: promise
});

module.exports = pgp(process.env.DATABASE);
