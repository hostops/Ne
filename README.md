# Ne
A library that helps you simply create arcade game using few lines. Purpose of project Ne is to make children interested in coding.

## Example
```javascript
var nextRoom = new Room();
nextRoom.addItem(Items.angryRobot());
nextRoom.addItem(Items.helper());
nextRoom.addItem(Items.bonus());
mainRoom.addRoom(nextRoom, Direction.LEFT);
```

And your game is running. 

## Modules
- Code editor
- UI
    * Interface
- Game
    * Items
    * GamePlay