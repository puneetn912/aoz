export default function cartController() {
	angular.module('cmsApp')
	.controller('cartController', cartController);
	cartController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http'];
	function cartController($scope,$timeout, $q, $log,$location,$routeParams, $http) {
		var vmCart = this;

        $scope.$watch('vmCart.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
        let subId= $routeParams.subId
        let subscription = ''
        $http({method:'POST',url:`/getSub/${subId}`}).then(function successCallback(response) { if (response.data){
            console.log(response.data,'response')
            subscription = response.data
            vmCart.userPhone = subscription.user_id.mobileno
            vmCart.mealTime = subscription.category
            vmCart.mealType = subscription.meal_type
            
            vmCart.vegAmt = ((subscription.veg_count * 99) - (subscription.veg_count * 99*0.05)).toFixed(2)  
            vmCart.nvegAmt = ((subscription.nonveg_count * 119) - (subscription.nonveg_count * 119*0.05)).toFixed(2)  
            vmCart.mealCost = (parseFloat(vmCart.vegAmt) + parseFloat(vmCart.nvegAmt)).toFixed(2)
            vmCart.total = ((subscription.veg_count * 99) + (subscription.nonveg_count * 119)).toFixed(2);
            vmCart.gst = (vmCart.total*0.05).toFixed(2)
            console.log(vmCart.vegAmt, vmCart.nvegAmt, vmCart.nvegAmt+vmCart.vegAmt )
            console.log(subscription.veg_count * 99, 'subscription.veg_count * 99')
        }else{ console.log('puneet') }})

        $scope.paynow = function(){
            $location.path(`/thankyou/${$routeParams.subId}`);
        }
	}
}