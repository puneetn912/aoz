export default function verifyController() {
	angular.module('cmsApp')
	.controller('verifyController', verifyController);
	verifyController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$location'];
	function verifyController($scope,$timeout, $q, $log, $http, $cookies,$location) {
		var vmVerify = this;
        var urlParams = $location.search();

        console.log($cookies.get('mobileno'), 'mobileno')
        console.log($cookies.get('signotp'), 'signotp')
        console.log(urlParams.userId, 'status')

        if($cookies.get('mobileno')){
            let mobile = $cookies.get('mobileno');
            let signotp = $cookies.get('signotp');
            let phone = [];
            phone.push(mobile);
            let smsurl = 'https://smsapi.epadhai.in/api/v1/sendsms';
            let data = {"apikey":"cjixzzbh50003y9qul39hvghy",
                        "number":phone,
                        "message":'Your OTP is'+' '+signotp+'.Please do not share with anyone!',
                        "senderId": "JORDAN"}
            // $http.post(smsurl, JSON.stringify(data)).then(function (response) {
            //     if(response.data){
            //         console.log(response.data,'response')
            //         // $location.path('/verify');
            //     }
            // })
        }

        // otp validation
        vmVerify.otpCheck = false
        $scope.$watch('vmVerify.Otp', function (otp) {
            console.log(otp,'otp')
            if(otp){
                if(otp.length==4){
                    vmVerify.otpCheck=true
                }
            }
        })
		
        $scope.verifyOtp=function(otp){
            console.log(vmVerify.otpCheck, 'vmVerify.otpCheck')
            if(vmVerify.otpCheck==true){
                if($cookies.get('signotp') == vmVerify.Otp){
                    if(urlParams.userId){
                        console.log('entered if')
                        $http.post(`/getSubByUser/${urlParams.userId}`).then(function(response){
                            console.log(response.data,'response')
                            $location.path(`/calendar/${response.data._id}`);
                        })
                    }else{
                        console.log('entered else')
                        let data = {phone: $cookies.get('mobileno')}
                        $http({method:'POST', url:`/createUser`, data:data}).then(function successCallback(response) { if (response.data){
                            let user = response.data
                            $location.search('userId', null);
                            $location.path(`/userdetails/${user._id}`);
                        }})
                    }
  
                }else{ console.log('otp dont match') }
            }else{ console.log('otp format invalid') }
		}

	}
}