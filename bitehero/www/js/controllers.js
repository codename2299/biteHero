angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
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

  //Links
  $scope.dashboard = function(){
    $state.go("app.dashboard");
  }

  $scope.brush = function(){
    $state.go("app.brush");
  }
  $scope.brushstop = function(){
    $state.go("app.brushdone");
  }
  $scope.brushstart = function(){
    $state.go("app.brushstarted");
  }
  $scope.floss = function(){
    $state.go("app.floss");
  }
  $scope.rinse = function(){
    $state.go("app.rinse");
  }

  $scope.diary = function(){
    $state.go("app.diary");
  }

  $scope.gallery = function(){
    $state.go("app.gallery");
  }

  $scope.findmain = function(){
    $state.go("app.consultmain");
  }

  $scope.finddentist = function(){
    $state.go("app.consultfind");
  }

  $scope.adddentist = function(){
    $state.go("app.consultfindadded");
  }

  $scope.shopgem = function(){
    $state.go("app.shopgem");
  }

  $scope.conquests = function(){
    $state.go("app.conquests");
  }
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
