var app = angular.module("ibcApp", ['ngRoute', 'ngSanitize', 'ngDisqus', 'truncFilter', 'ngCookies']);
var host = 'http://iceblastapi.herokuapp.com';
// var host = 'http://localhost:3000';

app.config(function($disqusProvider, $locationProvider, $routeProvider) {
  $disqusProvider.setShortname('ibcblast'); 
  $locationProvider.hashPrefix('!');       

  $routeProvider.when('/v/:id', {
    templateUrl : 'partials/videoTpl.html',
    controller  : 'ibcCtrl'
  }).when('/featured', {
    templateUrl : 'partials/indexTpl.html',
    controller : 'ibcCtrl'
  }).otherwise({
    redirectTo : '/featured'
  });
});

app.controller("ibcCtrl", function($scope, $sce, $routeParams, $http, $cookieStore){
  $scope.searchBy = "";

  $http.get(host + '/api/v1/videos.json?page=1&per_page=30').success(function(videos) {
    $scope.topVids = videos['results'];
  });

  $scope.route = $routeParams;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  if ($scope.route.id) {
    $http.get(host + "/api/v1/videos/" + $scope.route.id + ".json?").success(function(video){
      $scope.singleVideo = video;
    });
  };
  
  $scope.initVideosLoad = function(){
    $http.get(host + '/api/v1/videos.json?page=1&per_page=15').success(function(videos) {
      $scope.videosMeta = videos['meta'];  
      $scope.videos = videos['results'];
      }
    );
  };

  $scope.addMoreVideos = function(){
    $http.get($scope.videosMeta['next_page']).success(function(videos) {        
      for (var i = 0; i < videos['results'].length; i++) {
          $scope.videos.push(videos['results'][i]);
      };
    });
  };
  
  $scope.querySearch = function(){
    $http.get(host + '/api/v1/videos.json?page=1&per_page=15&query=' + $scope.searchBy).success(function(videos) {  
      $scope.videosMeta = videos['meta'];     
      $scope.videos = videos['results'];
      }
    );
  };

  $scope.update = function(video) {
    if (!getCookie(video)) {
      $http.put(host + "/api/v1/videos/" + video.yt_id + ".json?vote=" + video.vote);
      if (video.vote == "up"){
        video.popularity++;}
      else if (video.vote == "down"){
        video.popularity--;}
      } else {
      alert("You have already voted on this video.")
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