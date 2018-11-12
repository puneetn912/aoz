export default function homeController() {
	angular.module('cmsApp')
	.controller('homeController', homeController);
	homeController.$inject = ['$scope','$timeout', '$q', '$log'];
	function homeController($scope,$timeout, $q, $log) {
		var vmHome = this;
        console.log('asdfasdf')
	}
}