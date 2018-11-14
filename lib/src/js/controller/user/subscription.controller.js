export default function subscriptionController() {
	angular.module('cmsApp')
	.controller('subscriptionController', subscriptionController);
	subscriptionController.$inject = ['$scope','$timeout', '$q', '$log', '$filter','$http','$location','$routeParams','$cookies','$mdToast'];
	function subscriptionController($scope,$timeout, $q, $log, $filter,$http,$location,$routeParams,$cookies,$mdToast) {
		var vmSubscription = this;

        var urlParams = $location.search();
        console.log(urlParams,'urlParams')
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'),'$cookies.get1')

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

        let mealType = ''
        vmSubscription.vegSelect = true;
        vmSubscription.nonvegSelect = true;
        $scope.selectedMeal = function(meal){
            mealType = meal
            console.log(mealType,'mealType')
            if(mealType=='Veg'){
                console.log('i am veg')
                vmSubscription.nvegCount = 0
                nvegCount = 0
                nvegAmt = 0
                total = vegAmt + nvegAmt
                vmSubscription.vegSelect = false;
                vmSubscription.nonvegSelect = true;
                document.getElementById('total').value = total
                // document.getElementById('vegCount').disabled = false
                // document.getElementById('nvegCount').disabled = true  
            }else if(mealType=='Both'){
                 console.log('i am both')
                vmSubscription.vegSelect = false;
                vmSubscription.nonvegSelect = false;
                // document.getElementById('nvegCount').disabled = false
                // document.getElementById('vegCount').disabled = false
            }else if(mealType=='Non Veg'){
                 console.log('i am non veg')
                vmSubscription.vegCount = 0
                vegCount = 0
                vegAmt = 0
                total = vegAmt + nvegAmt
                document.getElementById('total').value = total
                vmSubscription.vegSelect = true;
                vmSubscription.nonvegSelect = false;
                // document.getElementById('nvegCount').disabled = false
                // document.getElementById('vegCount').disabled = true
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

                $http.post(`/updateSubs/${$routeParams.subId}`,data).then(function successCallback(response) { 
                    console.log(response.data,'update Sub')
                    $cookies.put('mealType',response.data.meal_type)
                    $cookies.put('SaweUSeaBaeSaaCaaRxxIssBaaEaaR',response.data._id)
                    $cookies.put('apt_id',response.data.apartment_id)
                    $cookies.put('apartment_name',response.data.apartment_name)
                    $cookies.put('tower_name',response.data.tower_name)
                    $cookies.put('subStatus',response.data.status)
                    $cookies.put('name',response.data.user_id.name)
                    $cookies.put('email',response.data.user_id.email)
                    $cookies.put('doorNo',response.data.user_id.door_no)

                    $location.path(`/cart/${response.data._id}`);
                });
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill all details').hideDelay(2000) );
            }
        }

        $scope.goCal = function(){  
            if(status == true){
                window.location.href = `/calendar/${$routeParams.subId}`
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill all details').hideDelay(2000) );
            }
        }

        $scope.goProfile = function(){ 
            if(status == true){
                $location.path(`/profile/${$routeParams.subId}`) 
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please complete Order to see details').hideDelay(2000) );
            }
        }
    }
}

