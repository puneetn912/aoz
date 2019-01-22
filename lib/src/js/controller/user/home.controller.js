export default function homeController() {
	angular.module('cmsApp')
	.controller('homeController', homeController);
	homeController.$inject = ['$scope','$timeout', '$q', '$mdToast',  '$log','$cookies','$location', '$http', '$routeParams'];
	function homeController($scope,$timeout, $q,$mdToast, $log, $cookies, $location,$http,$routeParams) {
		var vmHome = this;
        console.log('asdfasdf')
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'))
        console.log($cookies.get('UaweSeaEaeRaaIaaD'))


        let allCookies = $cookies.getAll()
        console.log(allCookies.device, 'device')


        if(allCookies.device == 'android'){
            var toast = $mdToast.simple().textContent('Try our Android app, You will love it').action('Get it').highlightClass('md-warn').highlightAction(true).hideDelay(30000);
            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    window.location.href='https://play.google.com/store/apps/details?id=com.ritsworld.djfresh&hl=en'
                }
            });
        }

        $scope.init = function(){
          // console.log('sjahdkjahsjk')
            if(500 > screen.width){
              document.getElementById('abc').style.display = 'block';
            }
            else{
             document.getElementById('abc').style.display = 'none'; 
            }
        }


        var slidesInSlideshow = 6;
        var slidesTimeIntervalInMs = 3000; 
  
        $scope.slideshow = 1;
            var slideTimer =0; 
            $timeout(function interval() {
            $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
            slideTimer = $timeout(interval, slidesTimeIntervalInMs);
            }, slidesTimeIntervalInMs);
        }


    }