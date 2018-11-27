export default function subscriptioneditController() {
	angular.module('cmsApp')
	.controller('apartmentController', apartmentController);
	apartmentController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$mdToast'];
	function apartmentController($scope,$timeout, $q, $log,$http,$cookies,$mdToast) {
		var vmApartment = this;

        console.log('asdfa')
        vmApartment.isFormFilled = false
        vmApartment.errMsg = ''
        $scope.submit = function(){
            console.log('hey')
            
            let formData = document.forms["apartmentForm"].getElementsByTagName("input")
            console.log(formData.length)
            let userData = {}
            for(var i=0;i<formData.length;i++){
                console.log(formData[i].value,'formData[i].value')
                if(formData[i].value){
                    userData[formData[i].name] = formData[i].value
                    vmApartment.errMsg = ''
                }else{
                    vmApartment.errMsg = 'Please fill all Details'
                }
                if(i==formData.length-1){
                    if(vmApartment.errMsg == ''){
                        console.log(userData,'a')
                        $http.post(`/addApt`,userData).then(function(response){if(response.data){
                            $mdToast.show( $mdToast.simple().textContent('Details has been submitted').hideDelay(1000) );
                            vmApartment.isFormFilled = true
                        }}) 
                    }
                }
            }
        }
	}
}