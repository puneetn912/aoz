export default function profileController() {
	angular.module('cmsApp')
	.controller('profileController', profileController);
	profileController.$inject = ['$scope','$timeout', '$q', '$log', '$http', '$routeParams', '$mdToast','$location'];
	function profileController($scope,$timeout, $q, $log, $http, $routeParams,$mdToast,$location) {
		var vmProfile = this;
        $scope.hey = function(){
            console.log('asdf')
        }

        vmProfile.isDisabled = true

        $http.post(`/getSub/${$routeParams.subId}`).then(function(response){
            console.log(response.data,'subscription')
            
            vmProfile.subscription = response.data
            if(response.data.status == true){
                status = true
                setTimeout(function(){
                    document.getElementById('calIcon').style.display = 'block'
                }, 300);
            }
        })

        $scope.editProfile = function () {
            vmProfile.isDisabled = false
        }

        $scope.submit =function(){
        
            let formData = document.forms["profileForm"].getElementsByTagName("input")
            console.log(formData.length)
            let userData = {}
            for(var i=0;i<formData.length;i++){
                userData[formData[i].name] = formData[i].value
                if(i==formData.length-1){
                    userData.userId = vmProfile.subscription.user_id._id
                    console.log(userData,'a')
                    $http.post(`/updateUser`,userData).then(function(response){
                        console.log(response.data,'user')
                        $mdToast.show( $mdToast.simple().textContent('Data has been updated').hideDelay(2000) );
                    })
                }
            }
            vmProfile.isDisabled = true;
        }

        $scope.goCal = function(){  
            window.location.href = `/calendar/${$routeParams.subId}`
        }

        $scope.goProfile = function(){ 
            $mdToast.show( $mdToast.simple().textContent('You are in your profile').hideDelay(2000) );
        }

	}
}