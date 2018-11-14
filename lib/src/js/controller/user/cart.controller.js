export default function cartController() {
	angular.module('cmsApp')
	.controller('cartController', cartController);
	cartController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http','$cookies','$mdToast'];
	function cartController($scope,$timeout, $q, $log,$location,$routeParams, $http,$cookies,$mdToast) {
		var vmCart = this;

        let status = false
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'),'$cookies.get1')


        $scope.$watch('vmCart.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
        let subId= $cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')
        let subscription = ''
        $http({method:'POST',url:`/getSub/${subId}`}).then(function successCallback(response) { if (response.data){
            if(response.data.status == true){
                status = true
                document.getElementById('calIcon').style.display = 'block'
            }
            subscription = response.data
            vmCart.userPhone = subscription.user_id.mobileno
            vmCart._id = Number(subscription.user_id.mobileno)
            vmCart.address = subscription.apartment_name
            vmCart.mealTime = subscription.category
            vmCart.mealType = subscription.meal_type
            
            // vmCart.vegAmt = ((subscription.veg_count * 99) - (subscription.veg_count * 99*0.05)).toFixed(2)  
            // vmCart.nvegAmt = ((subscription.nonveg_count * 119) - (subscription.nonveg_count * 119*0.05)).toFixed(2)  
            // vmCart.mealCost = (parseFloat(vmCart.vegAmt) + parseFloat(vmCart.nvegAmt)).toFixed(2)
            // vmCart.total = ((subscription.veg_count * 99) + (subscription.nonveg_count * 119)).toFixed(2);
            // vmCart.gst = (vmCart.total*0.05).toFixed(2)
            // console.log(vmCart.vegAmt, vmCart.nvegAmt, vmCart.nvegAmt+vmCart.vegAmt )
            // console.log(subscription.veg_count * 99, 'subscription.veg_count * 99')

            vmCart.vegAmt = ((subscription.veg_count * 119)).toFixed(2)  
            vmCart.nvegAmt = ((subscription.nonveg_count * 139)).toFixed(2)  
            vmCart.mealCost = (parseFloat(vmCart.vegAmt) + parseFloat(vmCart.nvegAmt)).toFixed(2)
            vmCart.gst = (vmCart.mealCost*0.05).toFixed(2)
            vmCart.total = (parseFloat(vmCart.gst) + parseFloat(vmCart.mealCost)).toFixed(2);
            console.log(vmCart.vegAmt, vmCart.nvegAmt, vmCart.nvegAmt+vmCart.vegAmt )
            console.log(subscription.veg_count * 99, 'subscription.veg_count * 99')

        }else{ console.log('puneet') }})

        // $scope.paynow = function(payment){
        //     let urlto = `/sendtoairpay`;
        //     let finalObj = {
        //         userPhone : document.getElementById('userPhone').value,
        //         buyerAddress :document.getElementById('address').value,
        //         orderid : document.getElementById('su_id').value,
        //         amount : document.getElementById('total').value
        //     }
        //     $http.post(urlto,JSON.stringify(finalObj)).then(function (response) {
        //         if (response.data){
        //             console.log('responseresponse',response.data)
        //             document.getElementById('privatekey').value = response.data.privatekey
        //             document.getElementById('mid').value = response.data.mid
        //             document.getElementById('checksum').value = response.data.checksum
        //             document.getElementById('buyerPhone').value = response.data.data.userPhone
        //             document.getElementById('orderid').value = response.data.data.userPhone
        //             document.getElementById('buyerAddress').value = response.data.data.buyerAddress
        //             document.getElementById('amount').value = response.data.data.amount
        //              setTimeout(function(){
        //                   document.getElementById("sendtoairpay").submit();
        //              }, 1000);
        //         }
        //         else
        //         {
        //             console.log('shyam') 
        //         }
        //     })
        $scope.paynow = function(){
            let orderNo = `${vmCart.userPhone}${new Date().getTime()}`
            let data = {
                veg_count:subscription.veg_count, 
                nonveg_count:subscription.nonveg_count,
                amount:vmCart.total,
                payment_date : new Date(),
                order_no : orderNo,
                meal_type : subscription.meal_type
            }
            $http.post(`/addPayment/${$routeParams.subId}`,data).then(function(response){if(response.data){
                console.log(response.data, 'payment added')
                document.getElementById('payBtn').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'
                $location.path(`/thankyou/${$routeParams.subId}`).search({userId: subscription.user_id._id,
                    pId:response.data._id});
            }})
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