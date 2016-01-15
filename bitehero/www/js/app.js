// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html'
      }
    }
  })

  .state('app.brush', {
    url: '/brush',
    views: {
      'menuContent': {
        templateUrl: 'templates/brush.html'
      }
    }
  })

  .state('app.brushstarted', {
    url: '/brushstarted',
    views: {
      'menuContent': {
        templateUrl: 'templates/brushstarted.html'
      }
    }
  })


.state('app.brushdone', {
    url: '/brushdone',
    views: {
      'menuContent': {
        templateUrl: 'templates/brushdone.html'
      }
    }
  })


  .state('app.floss', {
    url: '/floss',
    views: {
      'menuContent': {
        templateUrl: 'templates/floss.html'
      }
    }
  })

  .state('app.rinse', {
    url: '/rinse',
    views: {
      'menuContent': {
        templateUrl: 'templates/rinse.html'
      }
    }
  })

  .state('app.diary', {
    url: '/diary',
    views: {
      'menuContent': {
        templateUrl: 'templates/diary.html'
      }
    }
  })

  .state('app.consultmain', {
    url: '/consultmain',
    views: {
      'menuContent': {
        templateUrl: 'templates/consultmain.html'
      }
    }
  })

  .state('app.consultfind', {
    url: '/consultfind',
    views: {
      'menuContent': {
        templateUrl: 'templates/consultfind.html'
      }
    }
  })
  .state('app.consultfindadded', {
    url: '/consultfindadded',
    views: {
      'menuContent': {
        templateUrl: 'templates/consultfindadded.html'
      }
    }
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/account.html'
      }
    }
  })

  .state('app.activity', {
      url: '/activity',
      views: {
        'menuContent': {
          templateUrl: 'templates/activity.html'
        }
      }
    })

  .state('app.achievements', {
    url: '/achievements',
    views: {
      'menuContent': {
        templateUrl: 'templates/achievements.html',
      }
    }
  })

  .state('app.shopgem', {
    url: '/shopgem',
    views: {
      'menuContent': {
        templateUrl: 'templates/shopgem.html',
      }
    }
  })

  .state('app.signout', {
    url: '/signout',
    views: {
      'menuContent': {
        templateUrl: 'templates/signout.html',
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});

