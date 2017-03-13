  var levels = [
    '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1',
    '8/1p2r2p/p4k2/1b1K1p2/1P1Pp3/4P1PP/1P3B2/R7 b - - 0 1',
    '3r1r1k/ppb3pB/1qn4p/3p2N1/2pP4/P1P3Pb/1PQB1R1P/4R1K1 w - - 0 1',
    '3b4/6k1/6pp/Pp1pPp2/2pP1P2/2B3P1/5K1P/8 w - - 0 1',
    'r4k2/1p4nR/1n1p1p1N/p1p1pPp1/4P3/1P1P1N2/P1P2KP1/8 w - - 0 1',
    '4q1k1/1p1r1pp1/7p/Q2R4/P7/8/1Pr2PPP/3R2K1 w - - 0 1',
    '3r3r/pkp2ppp/3b1n2/7q/1PP5/P3BP1b/3NBP1P/R2QK2R w - - 0 1',
    '3R4/k7/2K5/2P5/8/6r1/8/8 b - - 0 1',
    '2b5/1p6/1p1kpN2/3pN3/3Pp2R/2p1P3/rr6/2K2R2 w - - 0 1',
    '8/pp5p/8/4k1p1/6P1/P3K2P/1P6/8 w - - 0  1',
    '2b5/1p2k3/1p2p2N/3pN3/2pPp2R/4P3/rr6/2K2R2 w - - 0 1',
    '8/5ppp/8/5PPP/8/8/1k6/3K4 w - - 0 1',
    'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    '2k5/8/2K3R1/8/8/8/8/8 w - - 0 1',
    '2K5/2P1k3/8/8/8/1r6/8/3R4 w - - 0 1'

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

          waitingForComputer = false;
        });
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
