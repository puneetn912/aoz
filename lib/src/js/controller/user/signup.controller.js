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
                            vmSignup.submit = 'Send OTP..'
                            vmSignup.phoneVerified = true
                            vmSignup.userId = response.data[0]._id
                            $cookies.put('UaweSeaEaeRaaIaaD',response.data[0]._id);
                        }else{
                            $cookies.put('UaweSeaEaeRaaIaaD',undefined);
                            $cookies.put('SaweUSeaBaeSaaCaaRxxIssBaaEaaR',undefined);
                            $cookies.put('OccTxxxPqqSzzzIyyGqqN', undefined);
                            $cookies.put('MasOassBqqLssIxxE', undefined);
                            $cookies.put('apartment_name', undefined);
                            $cookies.put('apt_id', undefined);
                            $cookies.put('mealType', undefined);
                            $cookies.put('subStatus', undefined);
                            $cookies.put('tower_name', undefined);
                            $cookies.put('doorNo', undefined);
                            $cookies.put('email', undefined);
                            $cookies.put('name', undefined);
                            $cookies.put('ppid', undefined);
                            $cookies.put('pidStatus', undefined);
                            $cookies.put('countNveg', undefined);
                            $cookies.put('countNvegRem', undefined);
                            $cookies.put('countTotalNveg', undefined);
                            $cookies.put('countTotalVeg', undefined);
                            $cookies.put('countVeg', undefined);
                            $cookies.put('countVegRem', undefined);
                            $cookies.put('catererVegId', undefined);
                            $cookies.put('catererNvegId', undefined);
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
                        $location.path('/verify').search({userId:vmSignup.userId});      
                    }}, function myError(response) {
                        console.log(response,'response')
                        $location.path('/verify').search({userId:vmSignup.userId});      
                    })
                }else{
                    $mdToast.show( $mdToast.simple().textContent('Mobile Number should be 10 Digits').hideDelay(2000) );
                }
            }
        };
	}
}