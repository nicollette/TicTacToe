(function (root) {
	var TTT = root.TTT = (root.TTT || {});
  
  var HumanPlayer = TTT.HumanPlayer = function () {
    this.madeMove = false;
  };
  
  var ComputerPlayer = TTT.ComputerPlayer = function () {  
  };
  
  ComputerPlayer.prototype.move = function (game) {
    var foundEmptyTile = false;
    while(!foundEmptyTile) {
      var randomTile = Math.floor(Math.random()*9);
      if(game.board.tiles[randomTile] == null) {
        foundEmptyTile = true;
        var $tile = $("#" + randomTile);
        game.handleComputerMove($tile);
      }
    }
  };
})(this);