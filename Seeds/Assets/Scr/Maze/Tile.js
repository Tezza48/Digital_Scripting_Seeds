#pragma strict
public class Tile extends Game{
      private var tile : GameObject;
      private var orientation : int;
      private var numExits : int;
      private var north : boolean;
      private var east : boolean;
      private var south : boolean;
      private var west : boolean;


      public function Tile(tile : GameObject, orientation : int) {
            this.tile = tile;
            this.orientation = orientation;
      }

      public function IsHallway () : boolean {
            if (numExits == 2 && ((north && south) || (east && west))) {
                  return true;
            } else {
                  return false;
            }
      }

      public function GetTile () : GameObject {
            return tile;
      }

}
