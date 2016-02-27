/* global Crafty */
window.onload = function() {
  Crafty.init();
  
  Crafty.c('Obstacle', {
    init: function() {
      this.requires('2D, Canvas, Color')
        .color('orange')
        .attr({w: 25, h: 25, speed: 80})
        .bind("EnterFrame", function(eventData) {
          // Move to the right by 10 pixels per second
          switch (this.direction) {
            case 'up':
              this.y -= this.speed * (eventData.dt / 100);
              break;
            case 'down':
              this.y += this.speed * (eventData.dt / 100);
              break;
            case 'left':
              this.x -= this.speed * (eventData.dt / 100);
              break;
            case 'right':
              this.x += this.speed * (eventData.dt / 100);
              break;
          }
        });
    }
  });
  
  Crafty.c('Player', {
    init: function() {
      this.requires('2D, Canvas, Color, Collision, Fourway, Draggable')
        .origin("center")
        .attr({x: Crafty.viewport._width / 2, y: Crafty.viewport._height / 2, w: 50, h: 50})
        .color('#82')
        .fourway(175)
        .onHit('Obstacle', function() {
          this.stopMovement();
        });
    }
  });

  function makeObstacles() {
    var directions = ['up', 'down', 'left', 'right'];
    switch (directions[Math.floor(Math.random() * directions.length)]) {
      case 'up':
        var offset = Math.floor(Math.random() * Crafty.viewport._width / 5);
        for (var i = 0; i < 5; i++) {
          Crafty.e('Obstacle').attr({x: offset + Math.max(Crafty.viewport._width / 5, 75) * i, y: Crafty.viewport._height, direction: 'up'});
        }
        break;
      case 'down':
        var offset = Math.floor(Math.random() * Crafty.viewport._width / 5);
        for (var i = 0; i < 5; i++) {
          Crafty.e('Obstacle').attr({x: offset + Math.max(Crafty.viewport._width / 5, 75) * i, y: 0, direction: 'down'});
        }
        break;
      case 'left':
        var offset = Math.floor(Math.random() * Crafty.viewport._height / 5);
        for (var i = 0; i < 5; i++) {
          Crafty.e('Obstacle').attr({x: Crafty.viewport._width, y: offset + Math.max(Crafty.viewport._height / 5, 75) * i, direction: 'left'});
        }
        break;
      case 'right':
        var offset = Math.floor(Math.random() * Crafty.viewport._height / 5);
        for (var i = 0; i < 5; i++) {
          Crafty.e('Obstacle').attr({x: 0, y: offset + Math.max(Crafty.viewport._height / 5, 75) * i, direction: 'right'});
        }
        break;
    }
  }
  
  setTimeout(function() {
    makeObstacles();
    setInterval(function() {
      makeObstacles();
    }, 2000);
  }, 2000);
  
  Crafty.e('Player');
};