var app = angular.module("ibcApp", ['ngRoute', 'ngSanitize', 'ngDisqus']);

  app.config(function($disqusProvider, $locationProvider, $routeProvider) {
    $disqusProvider.setShortname('angulardisqusdemo'); // Configure the disqus shortname
    $locationProvider.hashPrefix('!');                 // Disqus needs hashbang in urls. If you are using pushstate then no need for this.
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

app.controller("ibcCtrl", function($scope, $sce, $routeParams){
  $scope.test = $routeParams;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.videos = [
    {
      url: "http://www.youtube.com/embed/XS6ysDFTbLU",
      ytId: "XS6ysDFTbLU",
      title: "Bill Gates ALS Ice Bucket Challenge"
    },
    {
      url: "http://www.youtube.com/embed/-tnywhcDaAc",
      ytId: "-tnywhcDaAc",
      title: "Ryan Seacrest ALS Ice Bucket Challenge"
    }
  ]

});