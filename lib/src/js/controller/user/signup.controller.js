export default function signupController() {
	angular.module('cmsApp')
	.controller('signupController', signupController);
	signupController.$inject = ['$scope','$timeout', '$q', '$log','$http'];
	function signupController($scope,$timeout, $q, $log, $http) {
		var vmSignup = this;

		$scope.sendOtp=function(user){
			console.log('shyam kumar',user.Mmobileno)
			let mobile = {mobile:user.Mmobileno};
			$http.post("/sendotp",mobile,function(req,res){
				if(res)
				{
					console.log('sendotp',res)
				}
			});
		};
        $scope.$watch('vmSignup.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
	}
}