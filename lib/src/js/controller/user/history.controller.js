export default function historyController() {
	angular.module('cmsApp')
	.controller('historyController', historyController);
	historyController.$inject = ['$scope','$timeout', '$q', '$log','$cookies','$http'];
	function historyController($scope,$timeout, $q, $log,$cookies, $http) {
		var vmHistory = this;
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'))
        $http.post(`/getPayments/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`).then(function(response){
            console.log(response.data, 'payments')
            vmHistory.payments = response.data
        })
	}
}