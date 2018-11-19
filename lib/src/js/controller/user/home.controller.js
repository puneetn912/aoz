export default function homeController() {
	angular.module('cmsApp')
	.controller('homeController', homeController);
	homeController.$inject = ['$scope','$timeout', '$q', '$log','$cookies','$location', '$http', '$routeParams'];
	function homeController($scope,$timeout, $q, $log, $cookies, $location,$http,$routeParams) {
		var vmHome = this;
        console.log('asdfasdf')
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'))
        console.log($cookies.get('UaweSeaEaeRaaIaaD'))





function slideShowController($scope, $timeout) {
 var slidesInSlideshow = 4;
 var slidesTimeIntervalInMs = 3000; 
  
  $scope.slideshow = 1;
  var slideTimer =
    $timeout(function interval() {
      $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
      slideTimer = $timeout(interval, slidesTimeIntervalInMs);
    }, slidesTimeIntervalInMs);
}








	}
}