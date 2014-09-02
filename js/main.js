var app = angular.module("ibcApp", ['ngRoute', 'ngSanitize', 'ngDisqus']);
var host = 'http://iceblastapi.herokuapp.com';

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

app.controller("ibcCtrl", function($scope, $sce, $routeParams, $http){
  $http.get(host + '/api/v1/videos.json?page=1&per_page=15').success(function(videos) {
    $scope.videos = videos['results'];
  });
  $scope.route = $routeParams;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
});