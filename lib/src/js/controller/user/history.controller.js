export default function historyController() {
	angular.module('cmsApp')
	.controller('historyController', historyController);
	historyController.$inject = ['$scope','$timeout', '$q', '$log','$cookies','$http'];
	function historyController($scope,$timeout, $q, $log,$cookies, $http) {
		var vmHistory = this;
        // console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'))

        vmHistory.nonVegShow = true
        vmHistory.vegShow = false

        $http.post(`/getPayments/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`).then(function(response){if(response.data){
            // console.log(response.data, 'payments')
            vmHistory.payments = response.data
            // console.log(vmHistory,'vmHistory')
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