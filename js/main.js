var app = angular.module("ibcApp", ['ngRoute', 'ngSanitize', 'ngDisqus', 'truncFilter', 'ngCookies']);
var host = 'http://iceblastapi.herokuapp.com';
// var host = 'http://localhost:3000';

app.config(function($disqusProvider, $locationProvider, $routeProvider) {
  $disqusProvider.setShortname('ibcblast'); // Configure the disqus shortname
  $locationProvider.hashPrefix('!');        // Disqus needs hashbang in urls. If you are using pushstate then no need for this.
  // Configure your amazing routes
  $routeProvider.when('/v/:id', {
    templateUrl : 'partials/searchTpl.html',
    controller  : 'ibcCtrl'
  }).when('/featured', {
    templateUrl : 'partials/indexTpl.html',
    controller : 'ibcCtrl'
  }).otherwise({
    redirectTo : '/featured'
  });

});

app.controller("ibcCtrl", function($scope, $sce, $routeParams, $http, $cookieStore){
  
  $http.get(host + '/api/v1/videos.json?page=1&per_page=30').success(function(videos) {
    $scope.topVids = videos['results'];
  });

  $scope.route = $routeParams;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.querySearch = function(){
    $http.get(host + '/api/v1/videos.json?page=1&per_page=15&query=' + $scope.searchBy).success(function(videos) {
      $scope.videos = videos['results'];
    });
  };

  $scope.update = function(video) {
    if (!getCookie(video)) {
      $http.put(host + "/api/v1/videos/" + video.yt_id + ".json?vote=" + video.vote);
      if (video.vote == "up"){
        video.popularity++;}
      else if (video.vote == "down"){
        video.popularity--;}
      }
    else {
      console.log("You already voted on this")
    }
  };
  
  function makeCookie(video) {
    $cookieStore.put(video.yt_id, video.vote);
  }

  function getCookie(video) {
    if ($cookieStore.get(video.yt_id)){
      return true
    }
    else {
      makeCookie(video);
      return false;
    }
  }

  function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 25; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  
  
});

angular.module('truncFilter', []).
  filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;
            if (end === undefined)
                end = "...";
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }
        };
    });