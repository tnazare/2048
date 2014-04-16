test("should_move_grid_corretly_according_to_given_direction", function() {
    var inputManager = new ManualInputManager;
    // 2 2 • •
    // 2 2 • •
    // • • • •
    // • • • •
    var grid = new Grid(4);
    grid.insertTile(new Tile({x:0,y:0},2));
    grid.insertTile(new Tile({x:0,y:1},2));
    grid.insertTile(new Tile({x:1,y:0},2));
    grid.insertTile(new Tile({x:1,y:1},2));
    var grid1 = inputManager.move(grid, 0);

    // 4 4 • •
    // • • • •
    // • • • •
    // • • • •
    var grid2 = new Grid(4);
    grid2.insertTile(new Tile({x:0,y:0},4));
    grid2.insertTile(new Tile({x:1,y:0},4));
    for(var i = 0; i < grid1.size; i++){
        for(var j = 0; j < grid1.size; j++){
            var tile = grid1.cells[i][j];
            var tile2 = grid2.cells[i][j];
            if(tile && tile2){
                equal(tile.value, tile2.value);
            }
        }
    }
});

test("should_create_as_much_grid_deep_copies_as_there_is_available_cells", function(){
    var inputManager = new ManualInputManager;
    // 2 2 • •
    // 2 2 • •
    // • • • •
    // • • • •
    var grid = new Grid(4);
    grid.insertTile(new Tile({x:0,y:0},2));
    grid.insertTile(new Tile({x:0,y:1},2));
    grid.insertTile(new Tile({x:1,y:0},2));
    grid.insertTile(new Tile({x:1,y:1},2));

    // checking copies number
    var gridCopies = inputManager.createGridCopies(grid);
    equal(gridCopies.length,grid.availableCells().length);    
    

    // checking deep copy quality
    grid.removeTile(new Tile({x:0,y:0},2));    
    grid.insertTile(new Tile({x:0,y:0},8));    
    var movedgrids = [];
    for(var n = 0 ; n < gridCopies.length ; n++){
        notEqual(grid.cells[0][0].value,gridCopies[n].cells[0][0]);
    }
});

test("should_a_two_tile_in_each_grid_copies_at_different_place", function(){
    var inputManager = new ManualInputManager;
    // 2 2 • •
    // 2 2 • •
    // • • • •
    // • • • •
    var grid = new Grid(4);
    grid.insertTile(new Tile({x:0,y:0},2));
    grid.insertTile(new Tile({x:0,y:1},2));
    grid.insertTile(new Tile({x:1,y:0},2));
    grid.insertTile(new Tile({x:1,y:1},2));
    var gridCopies = inputManager.createGridCopies(grid);
    var availableCells = grid.availableCells();
    var gridCopiesWithTwos = inputManager.insertTwos(gridCopies);

    for(var k = 0 ; k < availableCells.length ; k++){    
        for(var l = 0 ; l < gridCopies.length ; l++){
            notEqual(grid.cells[availableCells[k].x][availableCells[k].y], gridCopies[l].cells[availableCells[k].x][availableCells[k].y]);
        }
    }
});












