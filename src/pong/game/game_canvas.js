
angular.module('app.game')
.directive('phaserCanvas', ['$window','$injector', function($window, $injector) {

  var linkFn = function(scope, ele, attrs ){
      require('./game_logic')(scope, ele, attrs);
  };
  return {
    scope: {
      ngModel: '=',
      mapId: '='
    },
    template: '<div id="game-canvas"></div>',
    compile: function(iEle, iAttrs) {
      return linkFn;
    }
  }
}


]);
