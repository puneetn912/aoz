export default function signupController() {
	angular.module('cmsApp')
	.controller('signupController', signupController);
	signupController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$location'];
	function signupController($scope,$timeout, $q, $log, $http, $cookies,$location) {
		var vmSignup = this;
		$scope.sendOtp=function(user){
			console.log('user.Mmobileno',user.Mmobileno)
			let mobile = user.Mmobileno;
			let url = window.location.href.split('/')
			let signotp = Math.floor(1000 + Math.random() * 9000);
			let phone = [];
			phone.push(mobile);
				let smsurl = 'https://smsapi.epadhai.in/api/v1/sendsms';
				let data = {"apikey":"cjixzzbh50003y9qul39hvghy",
							"number":phone,
							"message":'Your OTP is'+' '+signotp+'.Please do not share with anyone!',
							"senderId": "JORDAN"}
				$http.post(smsurl, JSON.stringify(data)).then(function (response) {
					if(response.data){
						$cookies.put('signotp', signotp);
						$cookies.put('mobileno', mobile);
                        
                        $location.path('/verify');

					}
				})
			};
	        $scope.$watch('vmSignup.myDate', function (myDate) {
	            $log.info(myDate);
	            if (myDate){
	                console.log('myDate',myDate)
	            }
	        });
	}
}