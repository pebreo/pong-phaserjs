
Demo
---
http://pebreo.github.io/pong-phaserjs/

How it works
---------
Pong is a very simple physics game where the players have to hit a bouncing ball past each other.
Implementing the physics in PhaserJS is relatively simple. There are three basic steps
to configuring sprite physics:

* Enable Phaser's built-in Arcade Physics API 
* Add the Sprite object via the API
* Configure the `body` property for collision, initial velocities, gravity, etc. 

## Wall Collisions
Creating a bouncing ball requires 3 things: adding the sprite,
enabling and configuring physics on the sprite, checking if it goes
outside the viewable screen.

We first add the sprite like this:
```javascript
// preload function
game.load.image(graphicAssets.ballName, graphicAssets.ballURL);

// create function
this.ballSprite = game.add.sprite(game.world.centerX, game.world.centerY, graphicAssets.ballName);
```

Now we initialize the Arcade Physics API like this:
```javascript
// create function
game.physics.startSystem(Phaser.Physics.ARCADE);
game.physics.enable(this.ballSprite, Phaser.Physics.ARCADE);

this.ballSprite.checkWorldBounds = true;
this.ballSprite.body.collideWorldBounds = true;
this.ballSprite.body.bounce.set(1);
```
The `checkWorldBounds` properties is now available and when we set it to
true, then we then have a Phaser event available called `onOutofBounds`
which accepts a callback. We set that callback like this:
```
this.ballSprite.events.onOutOfBounds.add(this.ballOutOfBounds, this);
```
The second parameter in the event setup is the `this` scope.

After enabling the ability to check the world boundaries, we 
can now enable `collideWorldBounds` which let's our ball sprite
hit against the top and bottom walls. We can disable the left and right walls
so that a player can score. To disable a boundary, we can set the
`checkCollision.left` or `checkCollision.right` properties to true or false.

```javascript
// 
this.game.physics.arcade.checkCollision.left = false; // the left boundary
this.game.physics.arcade.checkCollision.right = false; // the right boundary
```
Finally, we set the `body.bounce` property to 1 which means the 
bounce velocity after collision will be the same as the velocity
right before it hit the wall or paddle. In other words, collisions
don't cause the ball to slow down.


