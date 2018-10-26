export default function signupController() {
	angular.module('cmsApp')
	.controller('signupController', signupController);
	signupController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$location'];
	function signupController($scope,$timeout, $q, $log, $http, $cookies,$location) {
		var vmSignup = this;
        vmSignup.submit = 'Send OTP'
        vmSignup.phoneVerified = false
        vmSignup.subId = ''
        vmSignup.userId = ''
        $scope.$watch('vmSignup.mobileno', function (phone) {
            if(phone){
                if(phone.length==10){
                    $http.post(`/checkUser/${phone}`).then(function(response){
                        if(response.data.length>0){
                            vmSignup.submit = 'Submit'
                            vmSignup.phoneVerified = true
                            vmSignup.userId = response.data[0]._id
                            $cookies.put('UaweSeaEaeRaaIaaD',response.data[0]._id);
                            // $http.post(`/getSubByUser/${response.data[0]._id}`).then(function(response){
                            //     console.log(response.data,'response')
                            //     vmSignup.subId = response.data._id
                            // })
                        }
                        else
                        {
                            $cookies.put('UaweSeaEaeRaaIaaD',undefined);
                            $cookies.put('SaweUSeaBaeSaaCaaRxxIssBaaEaaR',undefined);
                            $cookies.put('OccTxxxPqqSzzzIyyGqqN', undefined);
                            $cookies.put('MasOassBqqLssIxxE', undefined);
                        }
                    })
                }
            }
        });

        $scope.sendOtp=function(user){
            console.log(vmSignup.mobileno,'vmSignup.mobileno')

            // let signotp = Math.floor(1000 + Math.random() * 9000);
            let signotp = 2323;             //temporary for testing

            $cookies.put('OccTxxxPqqSzzzIyyGqqN', signotp);
            $cookies.put('MasOassBqqLssIxxE', vmSignup.mobileno);
            $location.path('/verify').search({userId:vmSignup.userId});      
        };
	}
}