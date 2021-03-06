(function() {
var app = angular.module('starter', ['ionic','angularMoment']);
      app.controller('RedditCtrl',function($scope,$http){
        $scope.posts = [];
        $http.get('https://www.reddit.com/r/gaming/new/.json')
          .success(function(posts){
            angular.forEach(posts.data.children,function(post,key){
              $scope.posts.push(post.data);
              console.log(post);
            });
          });
        $scope.loadOlderPosts = function (){
          var params2 = {};
          if($scope.posts.length > 0){
            params2['after'] = $scope.posts[$scope.posts.length - 1].name;

          }
          $http.get('https://www.reddit.com/r/gaming/new/.json',{params: params2})
            .success(function(posts){
              angular.forEach(posts.data.children,function(post,key){
                $scope.posts.push(post.data);
                console.log(post);
              });
              $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        }
        $scope.loadNewerPosts = function (){
          var params2 = { 'before' : $scope.posts[0].name};
          $http.get('https://www.reddit.com/r/gaming/new/.json',{params: params2})
            .success(function(posts){
              var newPost = [];
              angular.forEach(posts.data.children,function(post){
                newPost.push(post.data);
              });
              $scope.posts = newPost.concat($scope.posts);
              $scope.$broadcast('scroll.refreshComplete');
            });

        }
        $scope.openLink = function(url) {
          window.open(url, '_blank');
        };
      });
      app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
          if (window.cordova && window.Keyboard) {
            window.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if (window.cordova && window.cordova.InAppBrowser) {
            window.open = window.cordova.InAppBrowser.open;
          }
          if (window.StatusBar) {
            StatusBar.styleDefault();
          }
        });
      });
}());
