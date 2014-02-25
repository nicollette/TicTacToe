(function(root) {
	var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function (player1, player2) {
    this.board = new TTT.Board;
    this.players = { 
      "orange": player1,
      "blue": player2
    }
    this.turn = "orange";
  };

  Game.prototype.run = function () {
    this.bindClicks();
  };
  
	Game.prototype.placeMark = function(tile_id) {
		this.board.tiles[parseInt(tile_id)] = this.turn;
    this.switchPlayer();
	};

  Game.prototype.switchPlayer = function () {
    if (this.turn === this.board.marks[0]) {
      this.turn = this.board.marks[1];
      $("#curr-player").text("blue's turn");
    } else {
      this.turn = this.board.marks[0];
      $("#curr-player").text("orange's turn");
    }
  };

	Game.prototype.bindClicks = function() {
		$('.tile').on('click', this.handleTClick.bind(this));
	};

	Game.prototype.handleTClick = function(event) {
    event.preventDefault();
		this.changeTileColor(event.currentTarget);
		$(event.currentTarget).off("click");
		this.placeMark(event.currentTarget.id);
    
    if (this.board.isGameOver()) {
      this.handleGameOver();
    } else {
      this.playCompTurn();  
    }
	};
  
  Game.prototype.playCompTurn = function () {
    var computerMove = this.players[this.turn].move(this, this.turn);
    var $tile = $("#" + computerMove);
    this.handleComputerMove($tile); 
    
    if (this.board.isGameOver()) {
     this.handleGameOver(); 
    }
  };
  // Game.prototype.isGameOver = function () {
  //   if (this.board.isGameOver()) {
  //     return true;
  //   }
  // };
  
  Game.prototype.handleGameOver = function () {
    if (this.board.winner()) {
      alert(this.board.winner() + " won!");
      this.gameOverClicks();
    } else if (this.board.isBoardFull()) {
      alert("Game over, no more moves left.");
      this.gameOverClicks();
    }
  };
  
  Game.prototype.handleComputerMove = function ($tile) {
		if(this.turn === "blue") {
			$tile.addClass('xtile');
		}
		else {
			$tile.addClass('otile');
		}
    $tile.off("click");
    this.placeMark($tile[0].id);
  };
  
	Game.prototype.gameOverClicks = function() {
		$('.tile').off("click");
	}

	Game.prototype.changeTileColor = function(tile) {
		if(this.turn === "blue") {
			$(tile).addClass('xtile');
		}
		else {
			$(tile).addClass('otile');
		}
	};

})(this);

$(function () {
	var game = new TTT.Game(new TTT.HumanPlayer, new TTT.ComputerPlayer);
  game.run();
});