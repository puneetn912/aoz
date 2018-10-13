export default function transactionsController() {
	angular.module('cmsApp')
	.controller('transactionsController', transactionsController);
	transactionsController.$inject = ['$scope','$timeout', '$q', '$log'];
	function transactionsController($scope,$timeout, $q, $log) {
		var vmTransactions = this;
        $scope.$watch('vmTransactions.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
	}
}