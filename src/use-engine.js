const engines = require('./engine-pool');
const { Chess } = require('chess.js');

const pendingId = setInterval(function () {
  console.log(engines.pending);
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
      debugger;
      const levels = [];
      for (var i = 0; i < scores.length - 1; i += 2) {
        if (isSignificant(scores[i], scores[i + 1], 175)) {

           levels.push(`${fens[i]} is a significant position: ${JSON.stringify(scores[i])} -> ${JSON.stringify(scores[i + 1])}`);

        }
      }
      return levels;
    });
};

extractLevels(`[Event "Casual game"]
[Site "http://lichess.org/HI5OGtwB"]
[Date "2016.03.19"]
[White "Anonymous"]
[Black "lichess AI level 1"]
[Result "1-0"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "95"]
[Variant "Standard"]
[TimeControl "-"]
[ECO "B01"]
[Opening "Scandinavian Defense"]
[Termination "Normal"]
[Annotator "lichess.org"]
1. e4 d5 { B01 Scandinavian Defense } 2. d3 e5 3. Nf3 Qd6 4. Bd2 Nf6 5. Bc3 Nc6 6. Nbd2 d4 7. Nc4 Qc5 8. Bd2 h6 9. Qe2 a5 10. O-O-O Be6 11. b3 O-O-O 12. a3 b6 13. b4 axb4 14. axb4 Qxb4 15. Bxb4 Bxb4 16. Nfxe5 Kb7 17. Kb2 Ra8 18. Kb3 Bc3 19. Nf3 b5`).then(levels => {
  console.log(levels);
  clearInterval(pendingId);
  debugger;
})
