function ManualInputManager(LocalStorage) {
  this.events = {};
  this.grid = {};
    // 0 Up     
    // 1 Right
    // 2 Down
    // 3 Left
  this.moves = [0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3];
  this.moves.reverse();
  this.listen();
}

ManualInputManager.prototype.listen = function () {
  var self = this;
  var direction = self.moves.pop();
  var intervalId = 0;
  if(this.moves.length > 0){
    intervalId = window.setInterval(function(){self.emit("move", direction)},1000);
  }
  else{
    window.clearTimeout(intervalId);
  }
};

ManualInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

ManualInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

ManualInputManager.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};

ManualInputManager.prototype.getNextBestMove = function () {
  // on fait les calcule pour chaque mouvement et pour chaque posiion de 2 et de 4.


}

ManualInputManager.prototype.getUpMoveScore = function () {

}

ManualInputManager.prototype.getDownMoveScore = function () {

}  

ManualInputManager.prototype.getLeftMoveScore = function () {

}  

ManualInputManager.prototype.getRightMoveScore = function () {

} 

ManualInputManager.prototype.getMoveScore = function (grid) {
  // make the move and merge

  // enumerate possible random adds
  var availableCellCountBefore = grid.availableCells.length;
  var totalCellNumber = grid.size*grid.size;
  // make a copy of the grid for each possible position for a add

  // for each copy, compute score for each grid

    // compute possible merge and count total mergeScore

    // compute available cell count after this merge

  // Compute meaned score


}   

ManualInputManager.prototype.updateGrid = function (updatedGrid) {
  this.grid = updatedGrid;
}  

ManualInputManager.prototype.tileMatchesAvailable = function (grid) {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // These two tiles can be merged
          }
        }
      }
    }
  }

  return false;
};

ManualInputManager.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // up
    1: { x: 1,  y: 0 },  // right
    2: { x: 0,  y: 1 },  // down
    3: { x: -1, y: 0 }   // left
  };

  return map[direction];
};

ManualInputManager.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};

ManualInputManager.prototype.createGridCopies = function (gridToCopy) {
  var gridCopies = [];
  for(var i = 0; i< ){

  }
}  