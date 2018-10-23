export default function verifyController() {
	angular.module('cmsApp')
	.controller('verifyController', verifyController);
	verifyController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$location'];
	function verifyController($scope,$timeout, $q, $log, $http, $cookies,$location) {
		var vmVerify = this;
			$scope.Motp = $cookies.get('signotp');
			$scope.verifyOtp=function(otp){
				let signupcookie = $cookies.get('signotp')
				if($scope.Motp === signupcookie){
                    let data = {phone: $cookies.get('mobileno')}
                    console.log(data,'userPhone')

                    $http({method:'POST', url:`/createUser`, data:data}).then(function successCallback(response) { if (response.data){
                        let user = response.data
                        $location.path(`/userdetails/${user._id}`);
                    }else{ console.log('punet') }   
                    }, function errorCallback(response) { });
				}
			}

	}
}