export default function subscriptionController() {
	angular.module('cmsApp')
	.controller('subscriptionController', subscriptionController);
	subscriptionController.$inject = ['$scope','$timeout', '$q', '$log', '$filter','$http','$location','$routeParams','$cookies','$mdToast','$mdDialog'];
	function subscriptionController($scope,$timeout, $q, $log, $filter,$http,$location,$routeParams,$cookies,$mdToast,$mdDialog) {
		var vmSubscription = this;

        var urlParams = $location.search();

        $cookies.put('countTotalVeg', 0)
        $cookies.put('countTotalNveg', 0)
        $cookies.put('countVegRem', 0)
        $cookies.put('countNvegRem', 0)
        let cookies = $cookies.getAll()
        console.log(urlParams,'urlParams')
        // console.log(cookies,'cookiesSub')

        let vegAmt = 0, nvegAmt = 0, total = 0, gst = 0, mealCost = 0, vegCount = 0, nvegCount = 0, totalVegCount = 0, totalNvegCount=0, vegRemaining=0, nvegRemaining=0
        vmSubscription.sumAmt = 0

        let status = false
        $http.post(`/getSub/${$routeParams.subId}`).then(function(response){if(response.data){
            if(response.data.status == true){
                status = true
            }
        }else{
            var confirm = $mdDialog.confirm().title('Hey Bro').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
            $mdDialog.show(confirm).then(function() {
                // let cookiesRem = $cookies.getAll()
                // angular.forEach(cookiesRem, function (cookie, key) {
                //     $cookies.remove(key)
                // });
                $location.path(`/`)       
            });

        }})

        let mealType = ''
        vmSubscription.vegSelect = true;
        vmSubscription.nonvegSelect = true;

        if(cookies.sumAmt){
            vmSubscription.vegSelect = false;
            vmSubscription.nonvegSelect = false;
            
            vmSubscription.mealType = cookies.mealType
            mealType = cookies.mealType
            
            vmSubscription.sumAmt = parseInt(cookies.sumAmt)
            total = vmSubscription.sumAmt

            if(mealType == 'Both'){
                vmSubscription.isVegHidden = false
                vmSubscription.isNvegHidden = false
            }else if(mealType == 'Veg'){
                vmSubscription.isVegHidden = false
                vmSubscription.isNvegHidden = true
            }else if(mealType == 'Non Veg'){
                vmSubscription.isVegHidden = true
                vmSubscription.isNvegHidden = false
            }

            if(cookies.countVeg!="0"){ 
                vegCount = parseInt(cookies.countVeg)
                vegAmt = vegCount * 1 
                vmSubscription.vegCount = vegCount
            }
            if(cookies.countNveg!="0"){ 
                nvegCount = parseInt(cookies.countNveg)
                nvegAmt = nvegCount * 2
                vmSubscription.nvegCount = nvegCount
            }
        }
        if(urlParams.vegCount){
            cookies.countTotalVeg = parseInt(urlParams.vegCount)
            cookies.countTotalNveg = parseInt(urlParams.nonvegCount)
            cookies.countVegRem = parseInt(urlParams.vegRem)
            cookies.countNvegRem = parseInt(urlParams.nvegRem)
        }else{
            cookies.countTotalVeg = 0
            cookies.countTotalNveg = 0
            cookies.countVegRem = 0
            cookies.countNvegRem = 0
        }


        $scope.selectedMeal = function(meal){
            vmSubscription.mealType = meal
            console.log(vmSubscription.mealType,'mealType')
            if(vmSubscription.mealType=='Veg'){
                vmSubscription.isVegHidden = false
                vmSubscription.isNvegHidden = true
                vmSubscription.isVegRequired = true
                vmSubscription.isNvegRequired = false

                vmSubscription.nvegCount = 0
                nvegCount = 0
                nvegAmt = 0
                console.log(vegAmt,nvegAmt,'amounts')
                total = vegAmt + nvegAmt
                vmSubscription.vegSelect = false;
                vmSubscription.nonvegSelect = true;
                vmSubscription.sumAmt = total  
            }else if(vmSubscription.mealType=='Both'){
                vmSubscription.isVegHidden = false
                vmSubscription.isNvegHidden = false
                vmSubscription.isVegRequired = true
                vmSubscription.isNvegRequired = true


                vmSubscription.vegSelect = false;
                vmSubscription.nonvegSelect = false;
            }else if(vmSubscription.mealType=='Non Veg'){
                vmSubscription.isVegHidden = true
                vmSubscription.isNvegHidden = false
                vmSubscription.isVegRequired = false
                vmSubscription.isNvegRequired = true

                 // console.log('i am non veg')
                vmSubscription.vegCount = 0
                vegCount = 0
                vegAmt = 0
                total = vegAmt + nvegAmt
                vmSubscription.sumAmt = total
                vmSubscription.vegSelect = true;
                vmSubscription.nonvegSelect = false;
            }

        }


        $scope.changeVcount = function(veg){
            // console.log()
            vegCount = veg
            vegAmt = vegCount * 1
            total = vegAmt + nvegAmt
            vmSubscription.sumAmt = total
        }
        $scope.changeNVcount = function(nveg){
            nvegCount = nveg
            nvegAmt = nvegCount * 2
            total = vegAmt + nvegAmt
            vmSubscription.sumAmt = total
        }
        $scope.subscribe = function(){
            if(total!=0 && vmSubscription.mealType){
                document.getElementById('subscribeBtn').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'

                cookies.countTotalVeg += parseInt(vegCount)
                cookies.countTotalNveg += parseInt(nvegCount)
                console.log(urlParams.vegRem,'urlParams.vegRem')
                if(urlParams.vegRem!=undefined || urlParams.vegRem!=null){
                    cookies.countVegRem += parseInt(vegCount)
                }
                if(urlParams.nvegRem!=undefined || urlParams.nvegRem!=null ){
                    cookies.countNvegRem += parseInt(nvegCount)
                    console.log(cookies, 'cookie after updating nvegRem')
                }
                totalVegCount = cookies.countTotalVeg 
                totalNvegCount = cookies.countTotalNveg 
                vegRemaining = cookies.countVegRem
                nvegRemaining = cookies.countNvegRem
                
                let data = {
                    category:'dinner',
                    veg_count:parseInt(vegCount), 
                    nonveg_count:parseInt(nvegCount),
                    totalVegCount:totalVegCount,
                    totalNvegCount:totalNvegCount,
                    veg_remain:vegRemaining ,
                    nonveg_remain:nvegRemaining,
                    meal_type:mealType
                }

                $cookies.put('countVeg',vegCount)
                $cookies.put('countNveg',nvegCount)
                $cookies.put('countTotalVeg',totalVegCount)
                $cookies.put('countTotalNveg',totalNvegCount)
                $cookies.put('countVegRem',vegRemaining )
                $cookies.put('countNvegRem',nvegRemaining)
                $cookies.put('mealType',vmSubscription.mealType)
                $cookies.put('sumAmt',vmSubscription.sumAmt)

                console.log(data,'data')
                $http.post(`/getSub/${$routeParams.subId}`).then(function successCallback(response) { 
                // $http.post(`/updateSubs/${$routeParams.subId}`,data).then(function successCallback(response) { 
                    console.log(response.data,'get Sub')
                    $cookies.put('SaweUSeaBaeSaaCaaRxxIssBaaEaaR',response.data._id)
                    $cookies.put('apt_id',response.data.apartment_id)
                    $cookies.put('apartment_name',response.data.apartment_name)
                    $cookies.put('tower_name',response.data.tower_name)
                    $cookies.put('subStatus',response.data.status)
                    $cookies.put('name',response.data.user_id.name)
                    $cookies.put('email',response.data.user_id.email)
                    $cookies.put('doorNo',response.data.user_id.door_no)

                    console.log(cookies,'cookiesBro')

                    $location.path(`/cart`);
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




 var slidesInSlideshow = 2;
 var slidesTimeIntervalInMs = 5000; 
  
  $scope.slideshow = 1;
  var slideTimer =0; 
    $timeout(function interval() {
      $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
      slideTimer = $timeout(interval, slidesTimeIntervalInMs);
    }, slidesTimeIntervalInMs);
    

    }
}
