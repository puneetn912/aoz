export default function subscriptionController() {
	angular.module('cmsApp')
	.controller('subscriptionController', subscriptionController);
	subscriptionController.$inject = ['$scope','$timeout', '$q', '$log', '$filter','$http'];
	function subscriptionController($scope,$timeout, $q, $log, $filter,$http) {
		var vmSubscription = this;

        $scope.$watch('vmSubscription.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        $scope.iveg = function()
        {
            var value = parseInt(document.getElementById('veg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('veg').value = value;
            // console.log('cccc',document.getElementById('text').value)
        }
        $scope.dveg = function()
        {
            var value = parseInt(document.getElementById('veg').value);
            value = isNaN(value) ? 0 : value;
            value--;
             if(value<0){
             value =0; 
             }
            document.getElementById('veg').value = value;
            // console.log('ddd',document.getElementById('text').value)
        }


        $scope.inveg = function()
        {
            var value = parseInt(document.getElementById('nveg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('nveg').value = value;
            // console.log('cccc',document.getElementById('text').value)
        }
        $scope.dnveg = function()
        {
            var value = parseInt(document.getElementById('nveg').value);
            value = isNaN(value) ? 0 : value;
            value--;
             if(value<0){
             value =0; 
             }
            document.getElementById('nveg').value = value;
            // console.log('ddd',document.getElementById('text').value)
        }

        $scope.saveNumber=function(count){
            let subCount = {
                veg_count : Number(document.getElementById('veg').value),
                nonveg_count : Number(document.getElementById('nveg').value),
                start_date : count.start_date.$viewValue
            }
            console.log('subCount subCount',subCount);
            $http.post("/mealcount",subCount).then(function(res,status){
                let url = window.location.href.split('/')
                if(res.data)
                {
                    window.location.href=`${url[0]}//${window.location.host}/calender/${res.data._id}`;
                }
                else
                {
                    window.location.href=`${url[0]}//${window.location.host}/subscribe`;
                }
            });
        }


        $scope.subscribe = function(){
            console.log('sadfasdf')
            window.location.href=`http://localhost:3008/cart/:subId`;

        }



        // vmSubscription.startDate = new Date();
        // console.log(vmSubscription.startDate)
        // vmSubscription.startDate.setDate(this.startDate.getDate() + 5);
        

        // vmSubscription.endDate = new Date();
        // vmSubscription.endDate.setDate(vmSubscription.endDate.getDate() + 5);
	}
}

