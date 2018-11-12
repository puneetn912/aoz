export default function pageController() {
  angular.module('cmsApp')
    .controller('pageController', pageController);

  pageController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', '$location', '$routeParams', '$http','$route','$cookies','$mdToast'];

  function pageController($scope, $timeout, $mdSidenav, $log, $location, $routeParams, $http,$route,$cookies, $mdToast) {
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
    
    let status = false
    var paramValue = $route.current.$$route.type;
    console.log(paramValue,'paramValue');
    if(paramValue == 'static'){
        if($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')){
            $http.post(`/getSub/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`).then(function(response){if(response.data){
                console.log(response.data,'data')
                if(response.data.status == true){ status = true }
            }})
        
            $scope.goCal = function(){
                if(status ==true){
                    window.location.href = `/calendar/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`
                }else{
                    var toast = $mdToast.simple().textContent('Please make an order first').action('ORDER NOW').highlightAction(true).highlightClass('md-raised').hideDelay(2000);
                    $mdToast.show(toast).then(function(response) {
                      console.log(response,'response')
                      if ( response == 'ok' ) {
                        $location.path(`/subscribe/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`) 
                      }
                    });
                }
            }

            $scope.goProfile = function(){
                if(status == true){
                    $location.path(`/profile/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`) 
                }else{
                    var toast = $mdToast.simple().textContent('Please make an order first').action('ORDER NOW').highlightAction(true).highlightClass('md-raised').hideDelay(2000);
                    $mdToast.show(toast).then(function(response) {
                      console.log(response,'response')
                      if ( response == 'ok' ) {
                        $location.path(`/subscribe/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`) 
                      }
                    });
                }
            }
        }else{
            $scope.goCal = function(){
                var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                        $location.path(`/`) 
                    }
                });
            }
            $scope.goProfile = function(){
                var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                        $location.path(`/`) 
                    }
                });
            }

        }
    }

    // if(url == '/menu' || url==)

    // vmPage.hey = function(){
    //     console.log('hey')
    // } 

    // $scope.goHome = function(){ $location.path(`/`) }
    // $scope.goProfile = function(){ 
    //     console.log($routeParams.subId,'$routeParams.subId')
    //     $location.path(`/profile/${$routeParams.subId}`) 
    // }
  }
}