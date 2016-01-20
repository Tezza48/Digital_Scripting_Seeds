#pragma strict
/*    *     *     *     *     *     *     *     *     *     *     *     *     *     *
            Instatiate Maze tiles on the grid and add seed fragments
 *    *     *     *     *     *     *     *     *     *     *     *     *     *     */
public class MazeParser extends MonoBehaviour {

      public var tiles : GameObject[];
      public var numbers : GameObject[] = new GameObject[10];
      public var playerController : GameObject;
      public var terminalPrefab : GameObject;
      public var maze : GameObject;

      private var numExits : int;
      private var firstExit : int;
      private var position : Vector3;
      private var rotation : Vector3;
      private var tile : GameObject;
      public function Parse (cells : Cell[,], width : int, height : int, tileSize : int) {
            // Create a parent object to contain all of the maze tiles
            maze = new GameObject("Maze");
            for (var x = 0; x < width; x++) {
                  for (var y = 0; y < height; y++) {

                        // get the number of exits the cell has
                        var numExits = cells[x,y].GetNumExits();

                        // find the orientation of the cell
                        firstExit = cells[x,y].GetFirstExit();

                        // where to instantiate the tile
                        position = new Vector3(x * tileSize, 0, -y * tileSize);

                        // what rotation to instantiate it at
                        rotation = new Vector3(0, 90 * firstExit, 0);

                        // if 2 exits use check if it's a hallway or a corner
                        if (numExits == 2) {
                              var isHallway = cells[x,y].IsHallway();
                              if (isHallway) {
                                    tile = Instantiate(tiles[4], position, Quaternion.Euler(rotation));
                                    tile.name += "(" + x + ", " + y + ")";
                              } else {
                                    tile = Instantiate(tiles[numExits - 1], position, Quaternion.Euler(rotation));
                                    tile.name += "(" + x + ", " + y + ")";
                              }
                        } else {
                              // spawn a tile from the tile array depending on how many exits it has
                              tile = Instantiate(tiles[numExits - 1], position, Quaternion.Euler(rotation));
                              tile.name += "(" + x + ", " + y + ")";
                        }

                        if (cells[x, y].GetIsStart()) {
                        	var player = Instantiate (playerController, position + Vector3.up, Quaternion.identity);
                        	player.name = playerController.name;
                        	player.transform.parent = maze.transform;
                        }

                        if (cells[x, y].GetIsTerminal()) {
                        	var terminal : GameObject = Instantiate (terminalPrefab, position + Vector3.up, Quaternion.identity);
                        	terminal.name = terminalPrefab.name;
                        	terminal.transform.parent = maze.transform;
                        }

                        // to be used when placing numbers
                        var cellNumber : int = cells[x,y].GetNumber();
                        if (cellNumber > 0) {
                              // if the cell is meant to spawn a number/seed fragment, spawn it
                              var numberObject = Instantiate (numbers[cellNumber], position + Vector3.up, Quaternion.identity);
                              numberObject.name = "Number " + cellNumber.ToString();
                              numberObject.AddComponent(NumberItem);
                              numberObject.GetComponent.<NumberItem>().number = cellNumber;
                              numberObject.transform.parent = maze.transform;
                        }
                        tile.transform.parent = maze.transform;
                  }
            }
      }
}