export default function subscriptionController() {
	angular.module('cmsApp')
	.controller('subscriptionController', subscriptionController);
	subscriptionController.$inject = ['$scope','$timeout', '$q', '$log', '$filter','$http','$location','$routeParams','$cookies','$mdToast'];
	function subscriptionController($scope,$timeout, $q, $log, $filter,$http,$location,$routeParams,$cookies,$mdToast) {
		var vmSubscription = this;

        var urlParams = $location.search();

        let vegAmt = 0, nvegAmt = 0, total = 0, gst = 0, mealCost = 0, vegCount = 0, nvegCount = 0

        let status = false
        $http.post(`/getSub/${$routeParams.subId}`).then(function(response){
            console.log(response.data,'subscription')
            if(response.data.status == true){
                status = true
                setTimeout(function(){
                    document.getElementById('calIcon').style.display = 'block'
                }, 300);
            }
        })

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
                    $location.path(`/calender/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`);
                }else{
                    $location.path(`/subscribe`);
                }
            });
        }

        let mealType = ''
        $scope.selectedMeal = function(meal){
            mealType = meal
            console.log(mealType,'mealType')
            if(mealType=='Veg'){
                vmSubscription.nvegCount = 0
                nvegCount = 0
                nvegAmt = 0
                total = vegAmt + nvegAmt
                document.getElementById('total').value = total
                document.getElementById('vegCount').disabled = false
                document.getElementById('nvegCount').disabled = true  
            }else if(mealType=='Both'){
                document.getElementById('nvegCount').disabled = false
                document.getElementById('vegCount').disabled = false
            }else if(mealType=='Non Veg'){
                vmSubscription.vegCount = 0
                vegCount = 0
                vegAmt = 0
                total = vegAmt + nvegAmt
                document.getElementById('total').value = total
                document.getElementById('nvegCount').disabled = false
                document.getElementById('vegCount').disabled = true
            }
        }
        $scope.changeVcount = function(veg){
            console.log()
            vegCount = veg
            vegAmt = vegCount * 99
            total = vegAmt + nvegAmt
            document.getElementById('total').value = total
        }
        $scope.changeNVcount = function(nveg){
            nvegCount = nveg
            nvegAmt = nvegCount * 119
            total = vegAmt + nvegAmt
            document.getElementById('total').value = total
        }
        $scope.subscribe = function(){
            if(total!=0 && mealType){
                document.getElementById('subscribeBtn').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'

                let totalVegCount = parseInt(vegCount), 
                totalNvegCount = parseInt(nvegCount), 
                vegRemaining = 0, 
                nvegRemaining = 0
                
                if(urlParams.vegCount){
                    totalVegCount += parseInt(urlParams.vegCount) 
                    totalNvegCount += parseInt(urlParams.nonvegCount)
                    vegRemaining = parseInt(vegCount) + parseInt(urlParams.vegRem)
                    nvegRemaining = parseInt(nvegCount) + parseInt(urlParams.nvegRem)
                }

                let data = {
                    category:'dinner',
                    veg_count:vegCount, 
                    nonveg_count:nvegCount,
                    totalVegCount:totalVegCount,
                    totalNvegCount:totalNvegCount,
                    veg_remain:vegRemaining ,
                    nonveg_remain:nvegRemaining,
                    meal_type:mealType
                }

                $http.post(`/updateSubs/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`,data).then(function successCallback(response) { 
                    console.log(response.data,'response')
                    $location.path(`/cart/${response.data._id}`);
                });
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill all details').hideDelay(2000) );
            }
        }

        $scope.goCal = function(){ 
            console.log(status,'sta')
            if(status == true){ $location.path(`/calendar/${$routeParams.subId}`) 
            }
        }

	}
}

