var app = angular.module("ibcApp", ['ngSanitize', 'firebase']);

app.controller("ibcCtrl", function($scope, $sce, $firebase){
  var ref = new Firebase("https://icebuckettube.firebaseio.com/");
  var sync = $firebase(ref);
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, "data");

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.videos = [
    {
      url: "http://www.youtube.com/embed/XS6ysDFTbLU",
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


