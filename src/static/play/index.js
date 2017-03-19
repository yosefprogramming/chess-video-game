var levels = [
  '8/8/2K2Bp1/1p5p/p4k2/2P5/P7/8 w - - 0 1',
  'rn6/kp3p1p/pq6/N1Q5/P7/7P/5PP1/3R2K1 w - - 0 1',
  '7k/pp2rRbp/1np1q1p1/3pN3/3P4/2P3QP/PP4PB/6K1 w - - 0 1',
  //'3r1rk1/2q2pp1/p5nR/1pn1PR1Q/2p5/2P1P2P/P1B2K2/2B5 w - - 0 1',
//5 
 '6k1/r6p/pp1p2p1/2pP2q1/P1Pb4/4B3/1P1Q2PP/5RK1 w - - 0 1',
 '8/8/2pk2p1/8/8/7P/P5P1/6K1 w - - 0 1',
 'r1b2k1r/pp3ppp/1q1n4/8/8/2N1R3/PPPQ2PP/4R1K1 w - - 0 1',
  '8/8/4p3/8/3P4/1k1K4/p7/4R3 w - - 0 1',
  '1qn5/k5p1/p7/Pp6/2P1Q3/4R1PP/6BK/3r4 w - - 0 1',
//10
  '2bq1nkb/2p4p/2pp3Q/r4NpN/p2PP3/2P5/PP4PP/5RK1 w - - 0 1',
  '8/6k1/p1pp2p1/P2n3p/1P6/1B4PP/6K1/8 w - - 0 1', 
  '1R3b2/5k1p/1P6/4Bpp1/1r2p3/4P3/5P1P/7K w - - 0 1',
  '8/1p2r2p/p4k2/1b1K1p2/1P1Pp3/4P1PP/1P3B2/R7 b - - 0 1',
  '3r1r1k/ppb3pB/1qn4p/3p2N1/2pP4/P1P3Pb/1PQB1R1P/4R1K1 w - - 0 1',
  '1r6/8/1P4R1/3k4/1K6/8/8/8 w - - 1 11',
  'R7/K4k2/P7/8/8/8/8/1r6 w - - 0 1',
  '1n6/p3q2p/2pNk3/1pP1p3/1P2P2Q/2P3P1/6K1/8 w - - 0 1',
  '2b4k/2p1q1pp/1pP5/p7/5r2/P1Q2B1P/5PP1/3R2K1 w - - 0 1',
//19   '8/8/4p3/8/3P4/8/pk1K4/7R w - - 0 1',
  '6k1/4bp1p/p2p1p2/q4R2/8/2r5/P1PQ2PP/1R5K b - - 0 1',
  // 21 '4q1k1/1p1r1pp1/7p/Q2R4/P7/8/1Pr2PPP/3R2K1 w - - 0 1',
  // 22 '3r3r/pkp2ppp/3b1n2/7q/1PP5/P3BP1b/3NBP1P/R2QK2R w - - 0 1',
  'r1bq1k1r/pp2n2p/1bpp3p/3Pp2B/4P3/1QP2N2/P2N1PPP/R4RK1 w KQkq - 0 1',
  // '3R4/k7/2K5/2P5/8/6r1/8/8 b - - 0 1',
  //24 '8/3kr3/p1q1p2p/1p2R2P/2p3Q1/2P5/PP1p1PP1/6K1 b - - 0 1',
  'r1b1k1q1/1p4b1/p3p1Pn/2pp2r1/P5B1/1PN3Q1/1BPP4/2K2R1R w - - 0 26',
  '5k1r/p4pp1/2r3np/3b2b1/3BN3/3B3P/PP4P1/2R2R1K w - - 0 27',
  //27 'q2rrk2/1b4pQ/p7/3pP3/1b3P2/3B3R/6PP/2R3K1 w - - 0 1',
  'r1bq1k1r/ppp2Bpp/2np4/4n1N1/3bPB2/2NP4/PPPK2PP/R2Q1R2 w - - 0 12',
  //29 '6k1/p1rb4/1p1p4/1P1Pp3/4Pp1b/1Q1N1Pq1/P5BR/6K1 b - - 0 1',
  '4rrk1/p5pp/1p1ppn2/7q/2PP4/PQ4P1/3NPPK1/4RR2 b - - 0 19',
  //31 '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1',
  '2b4k/2p1q1pp/1pP5/p7/5r2/P1Q2B1P/5PP1/3R2K1 w - - 0 1',
  //'6k1/4bp1p/p2p1p2/q4R2/8/2r5/P1PQ2PP/1R5K b - - 0 1',
  '2b5/1p6/1p1kpN2/3pN3/3Pp2R/2p1P3/rr6/2K2R2 w - - 0 1',
  'r4k2/1p4nR/1n1p1p1N/p1p1pPp1/4P3/1P1P1N2/P1P2KP1/8 w - - 0 1',
  '1r6/8/8/8/1P1k4/K7/8/7R w - - 0 1',
  '8/pp5p/8/4k1p1/6P1/P3K2P/1P6/8 w - - 0  1',
  // move to champion '2b5/1p2k3/1p2p2N/3pN3/2pPp2R/4P3/rr6/2K2R2 w - - 0 1',
  '8/6p1/3N2k1/3NK3/8/8/b5PP/8 w - - 0 1', 
  '6K1/6P1/5k2/8/8/6r1/7R/8 w - - 0 1',
  // move to easy '8/5ppp/8/5PPP/8/8/1k6/3K4 w - - 0 1',
  // move to easy 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
  //42
  '2k5/8/2K3R1/8/8/8/8/8 w - - 0 1',
  '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1',
  // move to  championship '8/1K6/5k2/3P4/8/r7/8/3R4 w - - 0 1',
  // remove 'r1b1k1q1/1p4b1/p3p1Pn/2pp2r1/P5B1/1PN3Q1/1BPP4/2K2R1R w - - 0 26',
  // repeat '5k1r/p4pp1/2r3np/3b2b1/3BN3/3B3P/PP4P1/2R2R1K w - - 0 27',
  // repeat 'r1bq1k1r/ppp2Bpp/2np4/4n1N1/3bPB2/2NP4/PPPK2PP/R2Q1R2 w - - 0 12',
  '4rrk1/p5pp/1p1ppn2/7q/2PP4/PQ4P1/3NPPK1/4RR2 b - - 0 19',
  '2r2r1k/7p/3b4/n2N1p1P/Q2p2p1/P2Pq1P1/1PR1PRB1/5K2 b - - 0 1',
  '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1',
  
'2r3k1/p1p3bp/1p2q1p1/5p2/8/P1P4P/1P2BPP1/3QR1K1 w - - 0 1',
'3n4/6k1/8/8/8/3K1n2/P7/3R4 w - - 0 1',
'r2q2k1/pp2bpp1/2p4p/8/2P5/1P5P/P2BQPP1/3R2K1 w - - 0 1',
'1r1q2k1/pp2bpp1/2p4p/8/2P5/1P3Q1P/P2B1PP1/3R2K1 w - - 0 1',
'5n2/ppp2pk1/5Npp/8/2P5/1P4P1/P2q1PKP/B7 w - - 0 1',
'4r1k1/ppp2pp1/2nq3p/8/8/P1QB3P/1PP2PP1/3R2K1 w - - 0 1',
'r1r3k1/1p3pp1/p6p/3q1n2/4R3/4BQ1P/1P3PP1/R5K1 b - - 0 1',
'3r1k2/6p1/8/p1b5/P4B2/7P/5RP1/6K1 w - - 0 1',
'3rqkn1/6pp/8/p1b5/P1n2N2/3b3P/4rRP1/6K1 w - - 0 1',
'r3k3/5ppp/5n2/1N6/8/8/5PPP/5RK1 w q - 0 1',
'r3k3/5ppp/r3qn2/1N2p3/4P3/4Q3/5PPP/1R3RK1 w q - 0 1',
'4k3/1B3ppr/2p1p3/R7/4n3/5NP1/5PKP/1r6 w - - 0 1',
'8/n2k3p/5rp1/5p2/7P/5NP1/5PK1/1R6 w - - 0 1',
'2r1k1r1/8/1b2p1p1/5p2/7P/6P1/n4PK1/4Q3 w - - 0 1',
'1k6/1p6/8/8/2r5/5RP1/n1K2P2/8 w - - 0 1',
'3q4/5ppk/2b4p/1p2p3/1P6/P3B2P/4QPP1/6K1 w - - 0 1',
'r2qk2r/pp2bppp/2n5/1N1p4/8/4P3/PP3PPP/R1BQ1RK1 w kq - 0 1',


];

var levelIndex = -1;

playNext()

function playNext() {

  levelIndex++

  $('#level').text("LEVEL "+(levelIndex+1))
  play(levels[levelIndex]);
}

function play(level) {

  function PlaySound() {
          var sound = document.getElementById("audio");
          sound.play()
}


  window.playOtherSide = function playOtherSide() {
    board.flip();
    onSnapEnd();
  };

  var sourceSquare;

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

  $('.square-55d63').on('click', onSquareClick);

  // do not pick up pieces if the game is over
  // only pick up pieces for the side to move
  function onDragStart(source, piece, position, orientation) {

    if (game.game_over() === true ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
        waitingForComputer) {
      return false;
    }

    sourceSquare = source;
  }

  function onSquareClick(event) {

    var targetSquare = $(this).attr('data-square');
    
    
    if (tryMove(sourceSquare, targetSquare)) {
      onSnapEnd();
    }

  }

  function onDrop(source, target) {
    if (!tryMove(source, target)) {
      // illegal move
      return 'snapback';
    }
  }

  function tryMove(source, target) {

    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    return move !== null;
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
      $('#level').text("Game Over");
      PlaySound() 
      // inserted to play sound at end of lose screen
      // has not been committed to git  
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


