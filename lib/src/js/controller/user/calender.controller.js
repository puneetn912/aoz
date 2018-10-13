export default function calenderController() {
	angular.module('cmsApp')
	.controller('calenderController', calenderController);
	calenderController.$inject = ['$scope','$timeout', '$q', '$log'];
	function calenderController($scope,$timeout, $q, $log) {
		var vmCalender = this;
        $scope.$watch('vmCalender.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
	}
}