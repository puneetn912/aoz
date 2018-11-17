export default function pageController() {
  angular.module('cmsApp')
    .controller('pageController', pageController);

  pageController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', '$location', '$routeParams', '$http','$route','$cookies','$mdToast'];

  function pageController($scope, $timeout, $mdSidenav, $log, $location, $routeParams, $http,$route,$cookies, $mdToast) {
    var vmPage = this;
    
    var paramValue = $route.current.$$route.type;
    console.log(paramValue,'paramValue');
    
    vmPage.toggleLeft = buildDelayedToggler('left')

    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope, args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildDelayedToggler(navID) {
        return debounce(function() {
            console.log('here1')
            if(paramValue != 'thankyou'){
                $mdSidenav(navID).toggle().then(function () {
                    $log.debug("done");
                });
            }else{
                console.log(document.getElementById('updateBtn'))
                if(document.getElementById('updateBtn')){
                    if(document.getElementById('updateBtn').innerHTML == 'Manage'){
                        $mdSidenav(navID).toggle().then(function () {
                            $log.debug("done");
                        });    
                    }else{
                        $mdToast.show( $mdToast.simple().textContent('Please fill all the details').hideDelay(1500) );
                    }
                }   
            }
        }, 200);
    }

    vmPage.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };

    
// faq 
    $scope.faq1 = function(){
        
        if(document.getElementById('ans1').style.display === 'none'){
            document.getElementById('ans1').style.display = 'block'
            document.getElementById('up').style.display = 'block'
            document.getElementById('down').style.display = 'none'
            
        }
        else{
            document.getElementById('ans1').style.display = 'none'
            document.getElementById('down').style.display = 'block'
            document.getElementById('up').style.display = 'none'

        }

    }

    $scope.faq2 = function(){
        
        if(document.getElementById('ans2').style.display === 'none'){
            document.getElementById('ans2').style.display = 'block'
        }
        else{
            document.getElementById('ans2').style.display = 'none'
        }

    }

    $scope.faq3 = function(){
        
        if(document.getElementById('ans3').style.display === 'none'){
            document.getElementById('ans3').style.display = 'block'
        }
        else{
            document.getElementById('ans3').style.display = 'none'
        }

    }

    $scope.faq4 = function(){
        
        if(document.getElementById('ans4').style.display === 'none'){
            document.getElementById('ans4').style.display = 'block'
        }
        else{
            document.getElementById('ans4').style.display = 'none'
        }

    }

    $scope.faq5 = function(){
        
        if(document.getElementById('ans5').style.display === 'none'){
            document.getElementById('ans5').style.display = 'block'
        }
        else{
            document.getElementById('ans5').style.display = 'none'
        }

    }

    $scope.faq6 = function(){
        
        if(document.getElementById('ans6').style.display === 'none'){
            document.getElementById('ans6').style.display = 'block'
        }
        else{
            document.getElementById('ans6').style.display = 'none'
        }

    }

    $scope.faq7 = function(){
        
        if(document.getElementById('ans7').style.display === 'none'){
            document.getElementById('ans7').style.display = 'block'
        }
        else{
            document.getElementById('ans7').style.display = 'none'
        }

    }

    $scope.faq8 = function(){
        
        if(document.getElementById('ans8').style.display === 'none'){
            document.getElementById('ans8').style.display = 'block'
        }
        else{
            document.getElementById('ans8').style.display = 'none'
        }

    }

    $scope.faq9 = function(){
        
        if(document.getElementById('ans9').style.display === 'none'){
            document.getElementById('ans9').style.display = 'block'
        }
        else{
            document.getElementById('ans9').style.display = 'none'
        }

    }

    $scope.faq10 = function(){
        
        if(document.getElementById('ans10').style.display === 'none'){
            document.getElementById('ans10').style.display = 'block'
        }
        else{
            document.getElementById('ans10').style.display = 'none'
        }

    }

    $scope.faq11 = function(){
        
        if(document.getElementById('ans11').style.display === 'none'){
            document.getElementById('ans11').style.display = 'block'
        }
        else{
            document.getElementById('ans11').style.display = 'none'
        }

    }

    $scope.faq12 = function(){
        
        if(document.getElementById('ans12').style.display === 'none'){
            document.getElementById('ans12').style.display = 'block'
        }
        else{
            document.getElementById('ans12').style.display = 'none'
        }

    }

    $scope.faq13 = function(){
        
        if(document.getElementById('ans13').style.display === 'none'){
            document.getElementById('ans13').style.display = 'block'
        }
        else{
            document.getElementById('ans13').style.display = 'none'
        }

    }

    $scope.faq14 = function(){
        
        if(document.getElementById('ans14').style.display === 'none'){
            document.getElementById('ans14').style.display = 'block'
        }
        else{
            document.getElementById('ans14').style.display = 'none'
        }

    }

    $scope.faq15 = function(){
        
        if(document.getElementById('ans15').style.display === 'none'){
            document.getElementById('ans15').style.display = 'block'
        }
        else{
            document.getElementById('ans15').style.display = 'none'
        }

    }

    $scope.faq16 = function(){
        
        if(document.getElementById('ans16').style.display === 'none'){
            document.getElementById('ans16').style.display = 'block'
        }
        else{
            document.getElementById('ans16').style.display = 'none'
        }

    }

    $scope.faq17 = function(){
        
        if(document.getElementById('ans17').style.display === 'none'){
            document.getElementById('ans17').style.display = 'block'
        }
        else{
            document.getElementById('ans17').style.display = 'none'
        }

    }

    $scope.faq18 = function(){
        
        if(document.getElementById('ans18').style.display === 'none'){
            document.getElementById('ans18').style.display = 'block'
        }
        else{
            document.getElementById('ans18').style.display = 'none'
        }

    }

    $scope.faq19 = function(){
        
        if(document.getElementById('ans19').style.display === 'none'){
            document.getElementById('ans19').style.display = 'block'
        }
        else{
            document.getElementById('ans19').style.display = 'none'
        }

    }
// faq


    let status = false
    if(paramValue == 'static'){
        if($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')){
            console.log('cookie found')
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
            console.log('cookie not found')
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
    // }else{
    //     console.log('diff page from static')
    //     $scope.goCal = function(){
    //         console.log('asdf')
    //         var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
    //         $mdToast.show(toast).then(function(response) {
    //             if ( response == 'ok' ) {
    //                 $location.path(`/`) 
    //             }
    //         });
    //     }
    //     $scope.goProfile = function(){
    //         var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
    //         $mdToast.show(toast).then(function(response) {
    //             if ( response == 'ok' ) {
    //                 $location.path(`/`) 
    //             }
    //         });
    //     }
    // }

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