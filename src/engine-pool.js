const Promise = require('bluebird');

const { Engine } = require('node-uci');
const enginePath = require('path').join(__dirname, "../lib/Stockfish/src/stockfish");
const engineOptions = require('./engine-options.json');

const factory = {

  create: () => new Promise((resolve, reject) => {

    const engine = new Engine(enginePath);

    engine
      // start the engine process
      .init()
      // set uci options
      .then(() => Promise.each(Object.keys(engineOptions), name => engine.setoption(name, engineOptions[name])))
      // make sure it's ready
      .then(() => engine.isready())
      // expose the chain interface as the resource
      .then(() => { resolve(engine.chain()); })
      // failed to start the engine, quit and reject the creation
      .catch(err => { Promise.resolve(engine.quit()).finally(() => { reject(err); }) });
  }),

  destroy: engine => Promise.resolve(engine.quit())

};

const opts = {
    min: 2,
    max: 4,
    Promise: Promise
};

module.exports = require('generic-pool').createPool(factory, opts);
