(function (root) {
	var TTT = root.TTT = (root.TTT || {});
  
  var Node = TTT.Node = function (board, mark, prevMovePos) {
    this.board = board;
    this.mark = mark;
    this.prevMovePos = prevMovePos;
  };
  
  Node.prototype.children = function () {
    var children = [];
    var node = this;

    _.times(9, function (pos) {
      if(node.board.tiles[pos] == null) {
        var newBoard = new TTT.Board(node.board.tiles);
        newBoard.tiles[pos] = node.mark;
        
        var nextMark = node.mark == "orange" ? "blue" : "orange";
        children.push(new TTT.Node(newBoard, nextMark, pos));
      }
    });
    return children;
  };
  
  Node.prototype.isLosingNode = function () {
    
  };
})(this);