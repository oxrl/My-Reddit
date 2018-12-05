(function() {
var app = angular.module('starter', ['ionic']);
      app.controller('RedditCtrl',function($scope){
        $scope.posts = [];
      });
      app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
          if (window.cordova && window.Keyboard) {
            window.Keyboard.hideKeyboardAccessoryBar(true);
          }

          if (window.StatusBar) {
            StatusBar.styleDefault();
          }
        });
      });
}());
