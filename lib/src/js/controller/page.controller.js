export default function pageController() {
  angular.module('cmsApp')
    .controller('pageController', pageController);

  pageController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', '$location', '$routeParams', '$http'];

  function pageController($scope, $timeout, $mdSidenav, $log, $location, $routeParams, $http) {
    var vmPage = this;
    vmPage.toggleLeft = buildDelayedToggler('left');    

    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    vmPage.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };

    // vmPage.hey = function(){
    //     console.log('hey')
    // } 

    // $scope.goHome = function(){ $location.path(`/`) }
    $scope.goProfile = function(){ 
        console.log($routeParams.subId,'$routeParams.subId')
        $location.path(`/profile/${$routeParams.subId}`) 
    }
  }
}