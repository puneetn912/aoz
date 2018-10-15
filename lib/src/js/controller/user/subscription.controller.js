export default function subscriptionController() {
	angular.module('cmsApp')
	.controller('subscriptionController', subscriptionController);
	subscriptionController.$inject = ['$scope','$timeout', '$q', '$log', '$filter'];
	function subscriptionController($scope,$timeout, $q, $log, $filter) {
		var vmSubscription = this;
        $scope.$watch('vmSubscription.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        $scope.inc = function()
        {
            var value = parseInt(document.getElementById('text').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('text').value = value;
            // console.log('cccc',document.getElementById('text').value)
        }
        $scope.dec = function()
        {
            var value = parseInt(document.getElementById('text').value);
            value = isNaN(value) ? 0 : value;
            value--;
             if(value<0){
             value =0; 
             }
            document.getElementById('text').value = value;
            // console.log('ddd',document.getElementById('text').value)
        }

        // vmSubscription.startDate = new Date();
        // console.log(vmSubscription.startDate)
        // vmSubscription.startDate.setDate(this.startDate.getDate() + 5);
        

        // vmSubscription.endDate = new Date();
        // vmSubscription.endDate.setDate(vmSubscription.endDate.getDate() + 5);
	}
}

