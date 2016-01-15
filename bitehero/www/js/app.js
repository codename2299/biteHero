// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'templates'])

    .run(['$ionicPlatform', function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
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
    }])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'menu.html',
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'sample.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'browse.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    }]);

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}])

.controller('PlaylistsCtrl', ['$scope', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
}])

.controller('PlaylistCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
}]);

angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\r\n  <ion-content>\r\n    <h1>Browse</h1>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\r\n  <ion-side-menu-content>\r\n    <ion-nav-bar class=\"bar-balanced\">\r\n      <ion-nav-back-button>\r\n      </ion-nav-back-button>\r\n\r\n      <ion-nav-buttons side=\"left\">\r\n        <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\">\r\n        </button>\r\n      </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\r\n  </ion-side-menu-content>\r\n\r\n  <ion-side-menu side=\"left\">\r\n    <ion-header-bar class=\"bar-balanced\">\r\n      <h1 class=\"title\">Left</h1>\r\n    </ion-header-bar>\r\n    <ion-content>\r\n      <ion-list>\r\n        <ion-item menu-close ng-click=\"login()\">\r\n          Login - Hello\r\n        </ion-item>\r\n        <ion-item menu-close href=\"#/app/search\">\r\n          Search\r\n        </ion-item>\r\n        <ion-item menu-close href=\"#/app/browse\">\r\n          Browse\r\n        </ion-item>\r\n        <ion-item menu-close href=\"#/app/playlists\">\r\n          Playlists\r\n        </ion-item>\r\n      </ion-list>\r\n    </ion-content>\r\n  </ion-side-menu>\r\n</ion-side-menus>\r\n");
$templateCache.put("playlist.html","<ion-view view-title=\"Playlist\">\r\n  <ion-content>\r\n    <h1>Playlist</h1>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("playlists.html","<ion-view view-title=\"Playlists\">\r\n  <ion-content>\r\n    <ion-list>\r\n      <ion-item ng-repeat=\"playlist in playlists\" href=\"#/app/playlists/{{playlist.id}}\">\r\n        {{playlist.title}}\r\n      </ion-item>\r\n    </ion-list>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("sample.html","<ion-view view-title=\"Search\">\r\n    <ion-content>\r\n        <h1>I am a sample</h1>\r\n\r\n\r\n        <div>\r\nrdfedf\r\n        </div>\r\n    </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\r\n  <ion-content>\r\n    <h1>Search</h1>\r\n  </ion-content>\r\n</ion-view>\r\n");}]);