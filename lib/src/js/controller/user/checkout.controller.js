export default function checkoutController() {
	angular.module('cmsApp')
	.controller('checkoutController', checkoutController);
	checkoutController.$inject = ['$scope','$timeout', '$q', '$log'];
	function checkoutController($scope,$timeout, $q, $log) {
		var vmCheckout = this;
        $scope.$watch('vmCheckout.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                // console.log('myDate',myDate)
            }
        });
	}
}