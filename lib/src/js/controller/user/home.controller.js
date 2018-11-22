export default function homeController() {
	angular.module('cmsApp')
	.controller('homeController', homeController);
	homeController.$inject = ['$scope','$timeout', '$q', '$log','$cookies','$location', '$http', '$routeParams'];
	function homeController($scope,$timeout, $q, $log, $cookies, $location,$http,$routeParams) {
		var vmHome = this;
        console.log('asdfasdf')
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'))
        console.log($cookies.get('UaweSeaEaeRaaIaaD'))


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