export default function verifyController() {
	angular.module('cmsApp')
	.controller('verifyController', verifyController);
	verifyController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies'];
	function verifyController($scope,$timeout, $q, $log, $http, $cookies) {
		var vmVerify = this;
			$scope.Motp = $cookies.get('signotp');
			$scope.verifyOtp=function(otp){
				let signupcookie = $cookies.get('signotp')
				if($scope.Motp === signupcookie)
				{
					console.log('shyam kumar',$cookies.get('mobileno'))
				}
			}

	}
}