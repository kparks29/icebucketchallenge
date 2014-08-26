var app = angular.module("ibcApp", ['ngRoute', 'ngSanitize', 'ngDisqus', 'firebase']);

app.config(function($disqusProvider, $locationProvider, $routeProvider) {
  $disqusProvider.setShortname('ibcblast'); // Configure the disqus shortname
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

app.controller("ibcCtrl", function($scope, $sce, $routeParams, $firebase){
  var ref = new Firebase("https://icebuckettube.firebaseio.com/");
  var sync = $firebase(ref);
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, "data");
  $scope.route = $routeParams;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.videos = [
    {
      url: "http://www.youtube.com/embed/XS6ysDFTbLU",
      ytId: "XS6ysDFTbLU",
      title: "Bill Gates ALS Ice Bucket Challenge",
      popularity: 1,
      comments: [
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        },
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        },
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        },
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        }
      ]
    },
    {
      url: "http://www.youtube.com/embed/-tnywhcDaAc",
      ytId: "-tnywhcDaAc",
      title: "Ryan Seacrest ALS Ice Bucket Challenge",
      popularity: 3,
      comments: [
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        },
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        },
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        },
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        }
      ]
    },
    {
      url: "http://www.youtube.com/embed/XS6ysDFTbLU",
      ytId: "XS6ysDFTbLU",
      title: "Bill Gates ALS Ice Bucket Challenge",
      popularity: 7,
      comments: [
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        }
      ]
    },
    {
      url: "http://www.youtube.com/embed/-tnywhcDaAc",
      ytId: "-tnywhcDaAc",
      title: "Ryan Seacrest ALS Ice Bucket Challenge",
      popularity: 2,
      comments: [
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        }
      ]
    },
    {
      url: "http://www.youtube.com/embed/XS6ysDFTbLU",
      ytId: "XS6ysDFTbLU",
      title: "Bill Gates ALS Ice Bucket Challenge",
      popularity: 1,
      comments: [
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        }
      ]
    },
    {
      url: "http://www.youtube.com/embed/-tnywhcDaAc",
      ytId: "-tnywhcDaAc",
      title: "Ryan Seacrest ALS Ice Bucket Challenge",
      popularity: 0,
      comments: [
        {
          name: "Someone",
          text: "wow what an amazing video! \nLet me click on your ad now"
        }
      ]
    }
  ]
});


