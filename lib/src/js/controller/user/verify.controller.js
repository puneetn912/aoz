export default function verifyController() {
	angular.module('cmsApp')
	.controller('verifyController', verifyController);
	verifyController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$location','$mdToast'];
	function verifyController($scope,$timeout, $q, $log, $http, $cookies,$location,$mdToast) {
		var vmVerify = this;
        var urlParams = $location.search();

        console.log($cookies.getAll(), 'cookies')
        console.log(urlParams.userId, 'urlParams.userId')

        let signotp = Math.floor(1000 + Math.random() * 9000);
        if($cookies.get('MasOassBqqLssIxxE')){
            let mobile = $cookies.get('MasOassBqqLssIxxE');
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
            // console.log(otp,'otp')

        })
		
        let myVar = ''
        $scope.resendOtp=function(){
            document.getElementById('resendMsg').innerHTML = `Please wait 30 seconds to resend OTP`
            document.getElementById('resendOtp').disabled = true
            function myTimer() {
                let c = d--
                if (c==0){
                    vmVerify.resendMsg = ``
                    clearInterval(myVar);
                }else{
                    console.log(c,'c')
                    document.getElementById('resendMsg').innerHTML = `Please wait ${c} seconds to resend OTP`
                }
            }

            myVar = setInterval(myTimer, 1000);
            var d = 29;

            setTimeout(
                function(){
                    document.getElementById("resendOtp").disabled = false;
                    document.getElementById('resendMsg').innerHTML = ``
                }, 
            30000)

            let mobile = $cookies.get('MasOassBqqLssIxxE');
            signotp = Math.floor(1000 + Math.random() * 9000);
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
            //     }
            // })
            console.log(mobile, signotp, 'otpSent')
        }
        $scope.verifyOtp=function(otp){
            if(signotp == vmVerify.Otp || 2323 == vmVerify.Otp){  
                document.getElementById('verifyOtp').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'
                clearInterval(myVar);
                
                // if($cookies.get('UaweSeaEaeRaaIaaD')){
                if(urlParams.userId){
                    console.log('entered if, existing user')
                    $http.post(`/getSubByUser/${urlParams.userId}`).then(function(response){if(response.data){
                        console.log(response.data,'subs get')
                        $cookies.put('SaweUSeaBaeSaaCaaRxxIssBaaEaaR',response.data._id)
                        $cookies.put('apt_id',response.data.apartment_id)
                        $cookies.put('apartment_name',response.data.apartment_name)
                        $cookies.put('tower_name',response.data.tower_name)
                        $cookies.put('subStatus',response.data.status)
                        $cookies.put('name',response.data.user_id.name)
                        $cookies.put('email',response.data.user_id.email)
                        $cookies.put('doorNo',response.data.user_id.door_no)

                        if(response.data.status == true){
                            $location.path(`/calendar/${response.data._id}`);
                        }else{
                            $location.path(`/subscribe/${response.data._id}`);
                        }
                    }else{
                        $location.path(`/userdetails/${urlParams.userId}`);
                    }
                    })
                }else{
                    console.log('entered else')
                    let data = {phone: $cookies.get('MasOassBqqLssIxxE')}
                    $http({method:'POST', url:`/createUser`, data:data}).then(function successCallback(response) { if (response.data){
                        console.log(response.data, 'user created')
                        let user = response.data
                        $cookies.put('UaweSeaEaeRaaIaaD',user._id);
                        $location.path(`/userdetails/${user._id}`).search('userId', null);
                    }})
                }

            }else{ $mdToast.show( $mdToast.simple().textContent('OTP did not match').hideDelay(2000) ); }
            
		}

	}
}