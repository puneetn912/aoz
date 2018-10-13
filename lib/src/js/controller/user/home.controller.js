export default function homeController() {
	angular.module('cmsApp')
	.controller('homeController', homeController);
	homeController.$inject = ['$scope','$timeout', '$q', '$log'];
	function homeController($scope,$timeout, $q, $log) {
		var vmHome = this;
        $scope.$watch('vmHome.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        $scope.sendOtp = function()
        {
        	console.log('mobilemobile')
        }
	}
}