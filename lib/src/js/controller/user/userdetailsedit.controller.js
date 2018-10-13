export default function userdetailseditController() {
	angular.module('cmsApp')
	.controller('userdetailseditController', userdetailseditController);
	userdetailseditController.$inject = ['$scope','$timeout', '$q', '$log'];
	function userdetailseditController($scope,$timeout, $q, $log) {
		var vmUserdetailsedit = this;
        $scope.$watch('vmUserdetailsedit.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
	}
}