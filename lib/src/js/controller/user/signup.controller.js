export default function signupController() {
	angular.module('cmsApp')
	.controller('signupController', signupController);
	signupController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$location','$mdToast'];
	function signupController($scope,$timeout, $q, $log, $http, $cookies,$location,$mdToast) {
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
                            console.log(response.data,'response user')
                            vmSignup.submit = 'Send OTP..'
                            vmSignup.phoneVerified = true
                            vmSignup.userId = response.data[0]._id
                            $cookies.put('UaweSeaEaeRaaIaaD',response.data[0]._id);
                        }else{
                            console.log('else usercheck')
                            var cookies = document.cookie.split(";");

                            for (var i = 0; i < cookies.length; i++) {
                                var cookie = cookies[i];
                                var eqPos = cookie.indexOf("=");
                                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                            }
                        }
                    })
                }
            }
        });

        $scope.sendOtp=function(user){
            if(vmSignup.mobileno){
                if(vmSignup.mobileno.length==10){
                    document.getElementById('sendOTP').setAttribute('disabled','disabled');
                    document.getElementById('loader').style.display = 'block'
                    console.log(vmSignup.mobileno,'vmSignup.mobileno')

                    let signotp = Math.floor(1000 + Math.random() * 9000);

                    $cookies.put('OccTxxxPqqSzzzIyyGqqN', signotp);
                    $cookies.put('MasOassBqqLssIxxE', vmSignup.mobileno);

                    let mobile = vmSignup.mobileno;
                    let phone = [];
                    phone.push(mobile);
                    let smsurl = 'https://smsapi.epadhai.in/api/v1/sendsms';
                    let data = {"apikey":"cjixzzbh50003y9qul39hvghy",
                                "number":phone,
                                "message":'Your OTP is'+' '+signotp+'.Please do not share with anyone!',
                                "senderId": "JORDAN"}
                    
                    $http.post(smsurl, JSON.stringify(data)).then(function (response) { if(response.data){
                        console.log(response.data,'otp response')
                        $location.path('/verify')   ;      
                    }}, function myError(response) {
                        console.log(response,'response')
                        $location.path('/verify');      
                    })
                }else{
                    $mdToast.show( $mdToast.simple().textContent('Mobile Number should be 10 Digits').hideDelay(2000) );
                }
            }
        };
	}
}