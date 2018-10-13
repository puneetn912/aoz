export default function subscriptioneditController() {
	angular.module('cmsApp')
	.controller('subscriptioneditController', subscriptioneditController);
	subscriptioneditController.$inject = ['$scope','$timeout', '$q', '$log'];
	function subscriptioneditController($scope,$timeout, $q, $log) {
		var vmSubscriptionedit = this;
        $scope.$watch('vmSubscriptionedit.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
	}
}