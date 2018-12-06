(function() {
var app = angular.module('starter', ['ionic']);
      app.controller('RedditCtrl',function($scope,$http){
        $scope.posts = [];
        $http.get('https://www.reddit.com/.json')
          .success(function(posts){
            angular.forEach(posts.data.children,function(post,key){
              $scope.posts.push(post.data);
              console.log(post);
            });
          });
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
