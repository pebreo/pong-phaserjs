
angular.module('app',[
    'ui.router',
    require('./game').name
])
.config(['$urlRouterProvider',function($urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/game');
}]);
