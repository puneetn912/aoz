export default function headController() {
	angular.module('cmsApp')
	.controller('headController', headController);
	headController.$inject = ['$scope','$timeout', '$q', '$log'];
	function headController($scope,$timeout, $q, $log) {
		var vmHead = this;
	}
}