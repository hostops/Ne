# Ne
![GitHub](https://img.shields.io/github/license/etilk/ne.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2020.svg)  
A library that helps you simply create arcade game using few lines. Purpose of project Ne is to make children interested in coding.  

[![GitHub issues](https://img.shields.io/github/issues/etilk/ne.svg)](https://github.com/etilk/ne/issues)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/etilk/ne.svg)
[![GitHub forks](https://img.shields.io/github/forks/etilk/ne.svg)](https://github.com/etilk/ne/network)
[![GitHub stars](https://img.shields.io/github/stars/etilk/ne.svg)](https://github.com/etilk/ne/stargazers)  

You can try your code online: https://ne.etilk.com/
## Simple example
```javascript
var nextRoom = new Room();
nextRoom.addItem(Items.angryRobot());
nextRoom.addItem(Items.helper());
nextRoom.addItem(Items.bonus());
mainRoom.addRoom(nextRoom, Direction.LEFT);
```

## Room loop example
```javascript
var leftRoom = mainRoom.newLeftRoom(80);
var upRoom = mainRoom.newUpRoom(60);
var thirdRoom = leftRoom.newUpRoom(40);
thirdRoom.addRoom(upRoom, Direction.RIGHT);	
mainRoom.addItem(new Item(0.05, 0.05));
mainRoom.addItem(new Item(0.05, 0.05));
mainRoom.addItem(new Item(0.05, 0.05));
leftRoom.addItem(new Item(0.05, 0.05));
leftRoom.addItem(new Item(0.05, 0.05));
thirdRoom.addItem(new Item(0.05, 0.05));
```

And your game is running. 

## Modules
- Code editor
- UI
    * Interface
- Game
    * Items
    * GamePlay
