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


evaluateFens(pgnToFens(`[Event "Casual game"]
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
1. e4 d5 { B01 Scandinavian Defense } 2. d3 e5 3. Nf3 Qd6 4. Bd2 Nf6 5. Bc3 Nc6 6. Nbd2 d4 7. Nc4 Qc5 8. Bd2 h6 9. Qe2 a5 10. O-O-O Be6 11. b3 O-O-O 12. a3 b6 13. b4 axb4 14. axb4 Qxb4 15. Bxb4 Bxb4 16. Nfxe5 Kb7 17. Kb2 Ra8 18. Kb3 Bc3 19. Nf3 b5 20. Nxd4 Nxd4+ 21. Kxc3 c5 22. Rb1 Nd5+ 23. exd5 Nxe2+ 24. Bxe2 Bd7 25. Nd6+ Kb6 26. Nc4+ Kb7 27. d4 cxd4+ 28. Kxd4 Ra6 29. h3 Rha8 30. Nd2 Ra5 31. Rb3 Re8 32. Bg4 f5 33. Bh5 Re7 34. Rhb1 Ra6 35. Bf3 g5 36. d6+ Kc8 37. dxe7 Rd6+ 38. Kc3 g4 39. Be2 Re6 40. Bxb5 gxh3 41. gxh3 Rxe7 42. Bxd7+ Kxd7 43. Rb7+ Ke8 44. Rxe7+ Kd8 45. Rbb7 Kc8 46. Nc4 Kd8 47. Nd6 f4 48. Re8# { Black is checkmated } 1-0`)).then(evaluations => {
  console.log(evaluations);
  clearInterval(pendingId);
  debugger;
})
