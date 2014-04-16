function ManualInputManager(LocalStorage) {
  this.events = {};
  this.grid = {};
  this.direction = {
    "UP": 0,
    "RIGHT": 1,
    "DOWN": 2,
    "LEFT": 3
  };
  this.turnCounter = 0;
  
}

ManualInputManager.prototype.updateGrid = function (updatedGrid, moved) {
  this.turnCounter++;
  console.log(this.turnCounter);
  this.getMoveScore(updatedGrid);
  this.emit("move", this.getNextBestMove(updatedGrid));
}  


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

ManualInputManager.prototype.getNextBestMove = function (grid) {
  // on fait les calcule pour chaque mouvement et pour chaque posiion de 2 et de 4.
  var verticalRatio = this.computeVerticalMergeRatio(grid),
      horizontalRatio = this.computeHorizontalMergeRatio(grid);

  if (horizontalRatio === 0 && verticalRatio === 0) {
    return this.computeMaxFreeBoundaryCellDirection(grid);
  }

  if (horizontalRatio > verticalRatio) {
    return Math.random() < 0.5 ? this.direction.LEFT : this.direction.RIGHT;
  }
  return Math.random() < 0.5 ? this.direction.UP : this.direction.DOWN;

}

ManualInputManager.prototype.computeVerticalMergeRatio = function (grid) {
  var mergeCount = 0,
      mergeValue = 0,
      mergeDone = false;

  for (var col = 0; col < grid.cells.length; col++) {
    var column = grid.cells[col];
    var previous = null;
    for (var cel = 0; cel < column.length; cel++) {
      var cell = column[cel];
      if (cell !== null) {
        if (previous !== null) {
          if (cell.value === previous.value && !mergeDone) {
            mergeCount++;
            mergeValue += 2 * cell.value;
            mergeDone = true;
          }
          else {
            mergeDone = false;
          }
        }
        previous = cell;
      }
    }
  }

  return (mergeCount === 0) ? 0 : mergeValue / mergeCount;
};

ManualInputManager.prototype.computeHorizontalMergeRatio = function (grid) {
  var mergeCount = 0,
      mergeValue = 0,
      mergeDone = false;

  for (var i = 0; i < 4; i++) {
    var previous = null;
    for (var col = 0; col < grid.cells.length; col++) {
      var cell = grid.cells[col][i];
      if (cell !== null) {
        if (previous !== null) {
          if (cell.value === previous.value && !mergeDone) {
            mergeCount++;
            mergeValue += 2 * cell.value;
            mergeDone = true;
          }
          else {
            mergeDone = false;
          }
        }
        previous = cell;
      }
    }
  }

  return (mergeCount === 0) ? 0 : mergeValue / mergeCount;
};

ManualInputManager.prototype.getUpMoveScore = function (grid) {
  
}

ManualInputManager.prototype.getDownMoveScore = function (grid) {

}  

ManualInputManager.prototype.getLeftMoveScore = function (grid) {

}  

ManualInputManager.prototype.getRightMoveScore = function (grid) {

} 

ManualInputManager.prototype.getMoveScore = function (grid) {
  // make the move and merge

  // enumerate possible random adds
  var availableCellCountBefore = grid.availableCells().length;
  var totalCellNumber = grid.size*grid.size;
  var gridCopies = this.createGridCopies(grid);
  this.insertTwos(gridCopies);
  // make a copy of the grid for each possible position for a add

  // for each copy, compute score for each grid

    // compute possible merge and count total mergeScore

    // compute available cell count after this merge

  // Compute meaned score
  for(var gridIndex = 0 ; gridIndex < gridCopies.length ; gridIndex++){
    console.log("before gridCopies["+gridIndex+"].prettyPrint = "+ gridCopies[gridIndex].prettyPrint());
    gridCopies[gridIndex] = this.move(gridCopies[gridIndex],this.direction.UP);
    console.log("after gridCopies["+gridIndex+"].prettyPrint = "+ gridCopies[gridIndex].prettyPrint());
  } 
  

} 


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

ManualInputManager.prototype.createGridCopies = function (gridToCopy) {
  var gridCopies = [];
  var availableCellsCount = gridToCopy.availableCells().length;
  for(var gridIndex = 0 ; gridIndex < availableCellsCount ; gridIndex++){
    gridCopies[gridIndex] = new Grid(4);
  }
  for(var i = 0 ; i < gridToCopy.size ; i++){
    for(var j = 0 ; j < gridToCopy.size ; j++){
      var tile = gridToCopy.cellContent({ x: i, y: j});
      if(tile){
        for(var gridIndex = 0 ; gridIndex < availableCellsCount ; gridIndex++){
          gridCopies[gridIndex].insertTile(new Tile({x:tile.x,y:tile.y},tile.value));
        }
      }
    }
  }
  return gridCopies;
}  

ManualInputManager.prototype.insertTwos = function (gridCopies) {
  var availableCellsArray = gridCopies[0].availableCells();
  for(var gridIndex = 0 ; gridIndex < gridCopies.length ; gridIndex++){
    gridCopies[gridIndex].insertTile(new Tile(availableCellsArray[gridIndex],2));
  }
}

ManualInputManager.prototype.computeMaxFreeBoundaryCellDirection = function (grid) {
  var up = 0, down = 0, left = 0, right = 0;
  grid.eachCell(function (x, y, tile) {
    if (tile === null) {
      if (x === 0) left++;
      if (x === 3) right++;
      if (y === 0) up++;
      if (y === 3) down++;
    }
  });
  var max = Math.max(left, right, up, down);
  if (left === max) {
    return this.direction.LEFT;
  }
  if (right === max) {
    return this.direction.RIGHT;
  }
  if (up === max) {
    return this.direction.UP;
  }
  return this.direction.DOWN;
};

ManualInputManager.prototype.move = function (grid, direction) {
  // 0: up, 1: right, 2:down, 3: left
  var self = this;
  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(grid.size,vector);
  var moved      = false;

  // Save the current tile positions and remove merger information
  grid = this.prepareTiles(grid);

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(grid, cell, vector);
        var next      = grid.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);
          merged.mergedFrom = [tile, next];

          grid.insertTile(merged);
          grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);
        } 
        else {
          grid = self.moveTile(grid, tile, positions.farthest);
        }
      }
    });
  });
  return grid;
};

// Move a tile and its representation
ManualInputManager.prototype.moveTile = function (grid, tile, cell) {
  grid.cells[tile.x][tile.y] = null;
  grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
  return grid;
};

// Build a list of positions to traverse in the right order
ManualInputManager.prototype.buildTraversals = function (size, vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

// Save all tile positions and remove merger info
ManualInputManager.prototype.prepareTiles = function (grid) {
  grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
  return grid;
};

ManualInputManager.prototype.findFarthestPosition = function (grid, cell, vector) {
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (grid.withinBounds(cell) &&
           grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

ManualInputManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};

ManualInputManager.prototype.insertTwos = function (gridCopies) {

  return gridCopies;
}  