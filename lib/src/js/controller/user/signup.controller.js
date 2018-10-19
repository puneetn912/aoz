export default function signupController() {
	angular.module('cmsApp')
	.controller('signupController', signupController);
	signupController.$inject = ['$scope','$timeout', '$q', '$log','$http'];
	function signupController($scope,$timeout, $q, $log, $http) {
		var vmSignup = this;
		$scope.sendOtp=function(user){
			console.log('shyam kumar',user.Mmobileno)
			let mobile = user.Mmobileno;
			let signotp = Math.floor(1000 + Math.random() * 9000);
			let phone = [];
			phone.push(mobile);
			// $http.post("/sendotp",mobile,function(req,res){
			// 	if(res)
			// 	{
			// 		console.log('sendotp',res)
			// 	}
			// });
			console.log(mobile,signotp,phone,'/////////////////')
			$http.post('https://smsapi.epadhai.in/api/v1/sendsms',{
			"apikey":"cjixzzbh50003y9qul39hvghy",
			"number":phone,
			"message":'Your OTP is'+' '+signotp+'.Please do not share with anyone!',
			"senderId": "JORDAN"
			},function(data){
				if(data){
					window.localStorage.set('signOtp',signotp);
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