const engines = require('./engine-pool');
const { Chess } = require('chess.js');

function pgnToFens(pgn) {

   // brand new game
   const game = new Chess();

   // play through the pgn in this game instance
   game.load_pgn(pgn);

   // ask it what the history of moves was
   const history = game.history();

   // reset the game (we're going to start over)
   game.reset();

   const fens = [];

   fens.push(game.fen());

   for (var i = 0; i < history.length; i++) {
     game.move(history[i]);
     fens.push(game.fen());
   }

   return fens;
}

const evaluateFen = fen => engines
  .acquire()
  .then(engine => engine
    .position(fen)
    .go({ depth: 20 })
    .then(result => {
      engines.release(engine);
      return { fen: fen, evaluation: result };
    }));

const evaluateFens = fens => Promise.all(fens.map(evaluateFen));

const normalize = positions => positions.map((position, i) => {

  const fen = position.fen;
  const info = position.evaluation.info;
  const deepest = info[info.length - 1].score;
  const unit = deepest.unit;
  const value = deepest.value * (i % 2 ? 1 : -1); // normalize sign

  return { fen, unit, value };

});

const isSignificant = (a, b, cpThreshold) => {
  // comparing cp
  if (a.unit === 'cp' && b.unit === 'cp') {
    return Math.abs(b.value - a.value) >= cpThreshold;
  }
  // being close to 0 in mating is the "highest score"
  // so a change from 1 -> -1 is the biggest jump you can make (unlike cp where that is the smallest)
  // in mating, the extremes are close (-20 -> 20) even though, that's kind of a hard comparison to make
  return null; // null means "I don't know"
};

const includeSignificance = positions => {

  for (let i = 0; i < positions.length - 1; i++) {
    positions[i].isSignificant = isSignificant(
      positions[i],
      positions[i + 1],
      100);
  }

  return positions;

};

const extractLevels = pgn =>
  evaluateFens(pgnToFens(pgn))
    .then(normalize)
    .then(includeSignificance);

const main = () => {

  // read the pgn file specified on the command line
  const pgnPath = process.argv[2];
  const fs = require('fs');
  const pgn = fs.readFileSync(pgnPath, "utf-8");
  console.log(pgn)

  // print the number of pending engine clients until 0
  const pendingId = setInterval(function () {
    const p = engines.pending;
    console.error(p);
    if (p === 0) {
      clearInterval(pendingId);
    }
  }, 500);

  // extract levels from the specified pgn
  extractLevels(pgn).then(levels => {
    console.log(levels);
  });

};

main();
