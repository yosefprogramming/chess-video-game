const engines = require('./engine-pool');
const { Chess } = require('chess.js');

const pendingId = setInterval(function () {
  console.error(engines.pending);
}, 1000);


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

const normalizedScores = evaluations => evaluations.map((e, i) => {
  const score = e.info[e.info.length - 1].score;
  const value = score.value * (i % 2 ? 1 : -1);
  return { unit: score.unit, value: value };
});



const isSignificant = (a, b, threshold) => a.value - b.value > threshold;


const extractLevels = pgn => {
  const fens = pgnToFens(pgn);
  return evaluateFens(fens)
    .then(evaluations => {
      const scores = normalizedScores(evaluations.map(e => e.evaluation));
      const levels = [];
      for (var i = 0; i < scores.length - 1; i += 2) {
        if (isSignificant(scores[i], scores[i + 1], 175)) {

           levels.push(`${fens[i]} is a significant position: ${JSON.stringify(scores[i])} -> ${JSON.stringify(scores[i + 1])}`);

        }
      }
      return levels;
    });
};

const pgnPath = process.argv[2];

const fs = require('fs');
const pgn = fs.readFileSync(pgnPath, "utf-8");

console.log(pgn)

extractLevels(pgn).then(levels => {
  console.log(levels);
  clearInterval(pendingId);
});
