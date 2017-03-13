
var levels = [
  
  '8/6k1/p1pp2p1/P2n3p/1P6/1B4PP/6K1/8 w - - 0 1', 
  '1R3b2/5k1p/1P6/4Bpp1/1r2p3/4P3/5P1P/7K w - - 0 1',
  '8/1p2r2p/p4k2/1b1K1p2/1P1Pp3/4P1PP/1P3B2/R7 b - - 0 1',
  '3r1r1k/ppb3pB/1qn4p/3p2N1/2pP4/P1P3Pb/1PQB1R1P/4R1K1 w - - 0 1',
  '1r6/8/1P4R1/3k4/1K6/8/8/8 w - - 1 11',
  'R7/K4k2/P7/8/8/8/8/1r6 w - - 0 1',
  'r4k2/1p4nR/1n1p1p1N/p1p1pPp1/4P3/1P1P1N2/P1P2KP1/8 w - - 0 1',
  '1r6/8/8/8/1P1k4/K7/8/7R w - - 0 1',
  '1n6/p3q2p/2pNk3/1pP1p3/1P2P2Q/2P3P1/6K1/8 w - - 0 1',
  '4q1k1/1p1r1pp1/7p/Q2R4/P7/8/1Pr2PPP/3R2K1 w - - 0 1',
  '3r3r/pkp2ppp/3b1n2/7q/1PP5/P3BP1b/3NBP1P/R2QK2R w - - 0 1',
  // '3R4/k7/2K5/2P5/8/6r1/8/8 b - - 0 1',
  '8/3kr3/p1q1p2p/1p2R2P/2p3Q1/2P5/PP1p1PP1/6K1 b - - 0 1',
  'r1b1k1q1/1p4b1/p3p1Pn/2pp2r1/P5B1/1PN3Q1/1BPP4/2K2R1R w - - 0 26',
  '5k1r/p4pp1/2r3np/3b2b1/3BN3/3B3P/PP4P1/2R2R1K w - - 0 27',
  'q2rrk2/1b4pQ/p7/3pP3/1b3P2/3B3R/6PP/2R3K1 w - - 0 1',
  'r1bq1k1r/ppp2Bpp/2np4/4n1N1/3bPB2/2NP4/PPPK2PP/R2Q1R2 w - - 0 12',
  '6k1/p1rb4/1p1p4/1P1Pp3/4Pp1b/1Q1N1Pq1/P5BR/6K1 b - - 0 1',
  '4rrk1/p5pp/1p1ppn2/7q/2PP4/PQ4P1/3NPPK1/4RR2 b - - 0 19',
  '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1',
  '2b5/1p6/1p1kpN2/3pN3/3Pp2R/2p1P3/rr6/2K2R2 w - - 0 1',
  '8/pp5p/8/4k1p1/6P1/P3K2P/1P6/8 w - - 0  1',
  '2b5/1p2k3/1p2p2N/3pN3/2pPp2R/4P3/rr6/2K2R2 w - - 0 1',
  '8/5ppp/8/5PPP/8/8/1k6/3K4 w - - 0 1',
  'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
  '2k5/8/2K3R1/8/8/8/8/8 w - - 0 1',
  '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1',
  'r1b1k1q1/1p4b1/p3p1Pn/2pp2r1/P5B1/1PN3Q1/1BPP4/2K2R1R w - - 0 26',
  '5k1r/p4pp1/2r3np/3b2b1/3BN3/3B3P/PP4P1/2R2R1K w - - 0 27',
  'r1bq1k1r/ppp2Bpp/2np4/4n1N1/3bPB2/2NP4/PPPK2PP/R2Q1R2 w - - 0 12',
  '4rrk1/p5pp/1p1ppn2/7q/2PP4/PQ4P1/3NPPK1/4RR2 b - - 0 19',
  '2r2r1k/7p/3b4/n2N1p1P/Q2p2p1/P2Pq1P1/1PR1PRB1/5K2 b - - 0 1',
  '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1',

];

var levelIndex = -1;

playNext()

function playNext() {

  levelIndex++

  $('#level').text("LEVEL "+(levelIndex+1))
  play(levels[levelIndex]);
}

function play(level) {

  var game = new Chess(level);

  var waitingForComputer = false;

  var board = ChessBoard('board', {
    pieceTheme: '/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
    position: level,
    orientation: game.turn() === 'w' ? 'white':'black',
    draggable: true,
    onDragStart: onDragStart,
    onSnapEnd: onSnapEnd,
    onDrop: onDrop,
  });

  // do not pick up pieces if the game is over
  // only pick up pieces for the side to move
  function onDragStart(source, piece, position, orientation) {
    if (game.game_over() === true ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
        waitingForComputer) {
      return false;

    }
  }

  function onDrop(source, target) {

    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';
  }

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  function onSnapEnd() {

    board.position(game.fen());

    waitingForComputer = true;

    fetch(bestMovePath(game.fen()))
      .then(function (response) {
         return response.json();
      })
      .then(function (json) {

        if (json.bestmove === "(none)") {
          playNext();
          return;
        }

        var move = uciToGameMove(json.bestmove);
        game.move(move);
        board.position(game.fen());

        onEngineEnd();

        waitingForComputer = false;
      });
  }

  function onEngineEnd() {

    if (game.game_over()){ 
      $('#level').text("Game Over") 
    }
  }
}

function bestMovePath(fen) {
  return '/bestmove/' + encodeURIComponent(fen);
}

function uciToGameMove(move) {

  var parts = /([a-h][1-8])([a-h][1-8])([nbrq])?/.exec(move);

  return {
    from: parts[1],
    to: parts[2],
    promotion: parts[3]
  };
}

