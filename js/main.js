var app = angular.module("ibcApp", ['ngSanitize']);

app.controller("ibcCtrl", function($scope, $sce){

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.videos = [
    {
      url: "http://www.youtube.com/embed/XS6ysDFTbLU",
      title: "Bill Gates ALS Ice Bucket Challenge"
    },
    {
      url: "http://www.youtube.com/embed/-tnywhcDaAc",
      title: "Ryan Seacrest ALS Ice Bucket Challenge"
    }
  ]

});
