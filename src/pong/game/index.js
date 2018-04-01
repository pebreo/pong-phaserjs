
module.exports =
angular.module('app.game', ['ui.router'])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      template: '<div>\
        <div phaser-canvas></div>\
      </div>',

    })
}]);

require('./game_canvas.js')
