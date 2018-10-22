export default function cartController() {
	angular.module('cmsApp')
	.controller('cartController', cartController);
	cartController.$inject = ['$scope','$timeout', '$q', '$log'];
	function cartController($scope,$timeout, $q, $log) {
		var vmCart = this;
        $scope.$watch('vmCart.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        $scope.paynow = function(){
        	console.log('asdfasdfasd')
        	window.location.href=`http://localhost:3008/thankyou/:subId`;
        }
	}
}