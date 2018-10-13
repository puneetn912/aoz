export default function subscriptionviewController() {
	angular.module('cmsApp')
	.controller('subscriptionviewController', subscriptionviewController);
	subscriptionviewController.$inject = ['$scope','$timeout', '$q', '$log'];
	function subscriptionviewController($scope,$timeout, $q, $log) {
		var vmSubscriptionview = this;
        $scope.$watch('vmSubscriptionview.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
	}
}