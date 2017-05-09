const promise = require('bluebird');

const pgp = require('pg-promise')({
  promiseLib: promise
});

console.log(process.env.DATABASE)

module.exports = pgp(process.env.DATABASE);
