(function (root) {
  var TTT = root.TTT = (root.TTT || {});
  
  var Board = TTT.Board = function () {
    this.tiles = this.makeBoard();
    this.marks = ["orange", "blue"];
  }
  
  // Board.marks = ["orange", "blue"];
  
  Board.prototype.makeBoard = function () {
    return _.times(9, function (i) {
      return null;
    });
  };
  
  Board.prototype.diagonalWinner = function () {
    var board = this;

    var diagonalPositions1 = [0, 4, 8];
    var diagonalPositions2 = [2, 4, 6];

    var winner = null;
    _(this.marks).each(function (mark) {
			function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return board.tiles[pos] === mark;
      	});
    	}

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Board.prototype.verticalWinner = function () {
    var board = this;
		var verticalPositions1 = [0, 3, 6];
		var verticalPositions2 = [1, 4, 7];
		var verticalPositions3 = [2, 5, 8];

    var winner = null;
    _(this.marks).each(function (mark) {
      function didWinVertical (verticalPositions) {
        return _.every(verticalPositions, function (pos) {
          return board.tiles[pos] === mark;
				});
			}

      var won = _.any(
        [verticalPositions1, verticalPositions2, verticalPositions3],
        didWinVertical
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Board.prototype.horizontalWinner = function () {
    var board = this;
		var horizontalPositions1 = [0, 1, 2];
		var horizontalPositions2 = [3, 4, 5];
		var horizontalPositions3 = [6, 7, 8];

    var winner = null;
    _(this.marks).each(function (mark) {
      function didWinVertical (horizontalPositions) {
        return _.every(horizontalPositions, function (pos) {
          return board.tiles[pos] === mark;
				});
			}

      var won = _.any(
        [horizontalPositions1, horizontalPositions2, horizontalPositions3],
        didWinVertical
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };
  
  Board.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };
  
  Board.prototype.isBoardFull = function () {
    var boardIsFull = true;
    this.tiles.forEach(function (tile) {
      if (!tile) {
        boardIsFull = false;
      }
    });
    
    return boardIsFull;
  };
})(this);