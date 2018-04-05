
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
// put in preload() function
game.load.image(graphicAssets.ballName, graphicAssets.ballURL);

// put in create() function
this.ballSprite = game.add.sprite(game.world.centerX, game.world.centerY, graphicAssets.ballName);
```

Now we initialize the Arcade Physics API like this:
```javascript
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
this.game.physics.arcade.checkCollision.left = false; // the left boundary
this.game.physics.arcade.checkCollision.right = false; // the right boundary
```
Finally, we set the `body.bounce` property to 1 which means the 
bounce velocity after collision will be the same as the velocity
right before it hit the wall or paddle. In other words, collisions
don't cause the ball to slow down.

## Paddle collision
Handling the ball's collision with the paddles requires a bit
more logic. 

We will divide the paddle into 8 segments: 2 middle segments, 2 outer middle segments,
2 outer segments, and 2 edge segments. Each segment group will be a multiple of 15 degrees.
Starting from the middle, we will add 15 degrees to the bouncce angle that the ball
will take after hitting the paddle.

![alt text](https://i0.wp.com/zekechan.net/wp-content/uploads/2015/05/pong-02.png?zoom=2&resize=273%2C440 "Paddle Angle")

To customize the physics during collision we add another callback using `overlap` function
in Phaser's built-in `update()` function:
```javascript
// setup custom callback (collideWithPaddle) in the update() function
game.physics.arcade.overlap(this.ballSprite, this.paddleGroup, this.collideWithPaddle, null, this);
```

Inside the custom callback that we write to customize the physics of the ball collision,
 we define the bounce-back angle when the ball hits the left paddle like this:
```javascript
// left paddle collision 
   
returnAngle = segmentHit * gameProperties.paddleSegmentAngle;
game.physics.arcade.velocityFromAngle(returnAngle, gameProperties.ballVelocity, this.ballSprite.body.velocity);
```

The logic for the bounce-back angle when the ball hits the right paddle we
use the following code:
```javascript
// right paddle collision
returnAngle = 180 - (segmentHit * gameProperties.paddleSegmentAngle);
if (returnAngle > 180) {
    returnAngle -= 360;
}
game.physics.arcade.velocityFromAngle(returnAngle, gameProperties.ballVelocity, this.ballSprite.body.velocity);
```





