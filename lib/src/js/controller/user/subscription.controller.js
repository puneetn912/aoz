export default function subscriptionController() {
	angular.module('cmsApp')
	.controller('subscriptionController', subscriptionController);
	subscriptionController.$inject = ['$scope','$timeout', '$q', '$log', '$filter','$http','$location','$routeParams'];
	function subscriptionController($scope,$timeout, $q, $log, $filter,$http,$location,$routeParams) {
		var vmSubscription = this;

        $scope.$watch('vmSubscription.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        let vegAmt = 0
        let nvegAmt = 0
        let total = 0
        let gst = 0
        let mealCost = 0
        let vegCount = 0
        let nvegCount = 0
        // plus veg
        $scope.iveg = function(){
            vegAmt = vegAmt + 99
            // document.getElementById('vegAmt').innerHTML = `vegAmt is ${vegAmt}`
            total = vegAmt + nvegAmt
            document.getElementById('total').value = total

            var value = parseInt(document.getElementById('veg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            vegCount = value
            document.getElementById('veg').value = value;
        }

        // minus veg
        $scope.dveg = function(){
            if(vegAmt!=0){vegAmt = vegAmt - 99}
            // document.getElementById('vegAmt').innerHTML = `vegAmt is ${vegAmt}`
            total = vegAmt + nvegAmt
            document.getElementById('total').value = total

            var value = parseInt(document.getElementById('veg').value);
            value = isNaN(value) ? 0 : value;
            value--;
            if(value<0){ value =0; }
            vegCount = value
            document.getElementById('veg').value = value;
        }

        // plus nveg
        $scope.inveg = function(){
            nvegAmt = nvegAmt + 119
            // document.getElementById('nvegAmt').innerHTML = `nvegAmt is ${nvegAmt}`
            total = vegAmt + nvegAmt
            document.getElementById('total').value = total

            var value = parseInt(document.getElementById('nveg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            nvegCount = value
            document.getElementById('nveg').value = value;
        }

        // minus nonveg
        $scope.dnveg = function(){
            if(nvegAmt!=0){nvegAmt = nvegAmt -119}
            // document.getElementById('nvegAmt').innerHTML = `nvegAmt is ${nvegAmt}`
            total = vegAmt + nvegAmt
            document.getElementById('total').value = total

            var value = parseInt(document.getElementById('nveg').value);
            value = isNaN(value) ? 0 : value;
            value--;
            if(value<0){ value =0 }
            nvegCount = value
            document.getElementById('nveg').value = value;
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
                if(res.data){
                    window.location.href=`${url[0]}//${window.location.host}/calender/${res.data._id}`;
                }else{
                    window.location.href=`${url[0]}//${window.location.host}/subscribe`;
                }
            });
        }

        let mealType = ''
        $scope.selectedMeal = function(meal){
            mealType = meal
        }

        $scope.subscribe = function(){
            console.log(total,'total')
            console.log(vegCount,'vegCount')
            console.log(nvegCount,'nvegCount')
            console.log(mealType,'mealType')
            let data = {
                vegCount:vegCount, 
                nvegCount:nvegCount, 
                subId:$routeParams.subId, 
                category:'dinner',
                mealType:mealType,
            }

            $http({method:'POST',url:`/updateSubs`, data:data}).then(function successCallback(response) { if (response.data){
                $location.path(`/cart/${response.data._id}`);
            }else{ console.log('punet') }   
            }, function errorCallback(response) { });

            // $location.path('/cart/:subId').search({vegAmt: vegAmt, nvegAmt:nvegAmt, gst:gst, mealCost:mealCost, total:total});
            // window.location.href=`http://localhost:3008/cart/:subId`;

        }



        // vmSubscription.startDate = new Date();
        // console.log(vmSubscription.startDate)
        // vmSubscription.startDate.setDate(this.startDate.getDate() + 5);
        

        // vmSubscription.endDate = new Date();
        // vmSubscription.endDate.setDate(vmSubscription.endDate.getDate() + 5);
	}
}

