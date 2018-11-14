export default function homeController() {
	angular.module('cmsApp')
	.controller('homeController', homeController);
	homeController.$inject = ['$scope','$timeout', '$q', '$log','$cookies','$location', '$http', '$routeParams'];
	function homeController($scope,$timeout, $q, $log, $cookies, $location,$http,$routeParams) {
		var vmHome = this;
        console.log('asdfasdf')
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'))
        console.log($cookies.get('UaweSeaEaeRaaIaaD'))
	}
}