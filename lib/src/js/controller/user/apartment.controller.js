export default function subscriptioneditController() {
	angular.module('cmsApp')
	.controller('apartmentController', apartmentController);
	apartmentController.$inject = ['$scope','$timeout', '$q', '$log','$http','$cookies','$mdToast'];
	function apartmentController($scope,$timeout, $q, $log,$http,$cookies,$mdToast) {
		var vmApartment = this;

        // console.log('asdfa')
        vmApartment.isFormFilled = false
        vmApartment.errMsg = ''
        $scope.submit = function(){
            let formData = document.forms["apartmentForm"].getElementsByTagName("input")
            // console.log(formData.length)
            let userData = {}
            for(var i=0;i<formData.length;i++){
                // console.log(formData[i].value,'formData[i].value')
                if(formData[i].value){
                    userData[formData[i].name] = formData[i].value
                    vmApartment.errMsg = ''
                }else{
                    vmApartment.errMsg = 'Please fill all Details'
                }
                if(i==formData.length-1){
                    if(vmApartment.errMsg == ''){
                        // console.log(userData,'a')
                        $http.post(`/addApt`,userData).then(function(response){if(response.data){
                            $mdToast.show( $mdToast.simple().textContent('Details has been submitted').hideDelay(3000) );
                            vmApartment.isFormFilled = true
                            vmApartment.success = 'Please stay tuned , we will be there in your location in no time!'
                        }else{
                            var confirm = $mdDialog.confirm().title('Hey Bro').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
                            $mdDialog.show(confirm).then(function() {
                                // let cookiesRem = $cookies.getAll()
                                // angular.forEach(cookiesRem, function (cookie, key) {
                                //     $cookies.remove(key)
                                // });
                                $location.path(`/`)       
                            }); 
                        }}) 
                    }
                }
            }
        }
	}
}