export default function userdetailsController() {
	angular.module('cmsApp')
	.controller('userdetailsController', userdetailsController);
	userdetailsController.$inject = ['$scope','$timeout', '$q', '$log'];
	function userdetailsController($scope,$timeout, $q, $log) {
		var vmUserdetails = this;
        $scope.$watch('vmUserdetails.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        $scope.sendOtp = function(){
        	console.log('sdasdfasdf')
        	window.location.href=`http://localhost:3008/subscribe`;
        }
	}
}