export default function cartController() {
	angular.module('cmsApp')
	.controller('cartController', cartController);
	cartController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http','$cookies','$mdToast'];
	function cartController($scope,$timeout, $q, $log,$location,$routeParams, $http,$cookies,$mdToast) {
		var vmCart = this;

        let status = false
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'),'$cookies.get1')

        let subId= $cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')
        let subscription = ''

        $http({method:'POST',url:`/getSub/${subId}`}).then(function successCallback(response) { if (response.data){
            if(response.data.status == true){
                status = true
                // document.getElementById('calIcon').style.display = 'block'
            }
            subscription = response.data
            console.log(subscription, 'subscription')
            
            vmCart.meal_type = subscription.meal_type
            vmCart.category = subscription.category

            vmCart.name = 'user'
            vmCart.userPhone = subscription.user_id.mobileno
            vmCart.email = 'abc@abc.com'
            vmCart.address = subscription.apartment_name

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
        //         buyerFirstName : document.getElementById('name').value,
        //         buyerPhone : document.getElementById('userPhone').value,
        //         orderid : document.getElementById('userPhone').value,
        //         buyerEmail :document.getElementById('email').value,
        //         buyerAddress :document.getElementById('address').value,
        //         amount : document.getElementById('total').value
        //     }
        //     $http.post(urlto,JSON.stringify(finalObj)).then(function (response) {
        //         if (response.data){
        //             console.log('responseresponse',response.data)

        //             document.getElementById('buyerFirstName').value = response.data.data.buyerFirstName
        //             document.getElementById('buyerPhone').value = response.data.data.buyerPhone
        //             document.getElementById('buyerAddress').value = response.data.data.buyerAddress
        //             document.getElementById('amount').value = response.data.data.amount
        //             document.getElementById('orderid1').value = response.data.data.buyerPhone

        //             document.getElementById('privatekey').value = response.data.privatekey
        //             document.getElementById('mid').value = response.data.mid
        //             document.getElementById('checksum').value = response.data.checksum

        //             let formData = document.forms["pForm"].getElementsByTagName("input")

        //             let userData = {}
        //             for(var i=0;i<formData.length;i++){
        //                 userData[formData[i].name] = formData[i].value
        //                 if(i==formData.length-1){
        //                     console.log(userData,'a')
        //                 }
        //             }

        //             setTimeout(function(){
        //                  document.getElementById("sendtoairpay").submit();
        //             }, 1000);
        //         }
        //         else{
        //             console.log('shyam') 
        //         }
        //     })
        // }

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

            $http.post(`/addPayment/${subId}`,data).then(function(response){if(response.data){
                console.log(response.data, 'payment added')
                    // $cookies.putObject(`pid-${response.data._id}`, false);
                    $cookies.put('ppid',response.data._id)
                    $cookies.put('pidStatus',false)
                    document.getElementById('payBtn').setAttribute('disabled','disabled');
                    document.getElementById('loader').style.display = 'block'
                    // $location.path(`/thankyou/${$routeParams.subId}`).search({userId: subscription.user_id._id,pId:response.data._id});
                    $location.path(`/thankyou`)
            }})
        }

        $scope.goCal = function(){  
            if(status == true){
                window.location.href = `/calendar/${subId}`
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill all details').hideDelay(2000) );
            }
        }

        $scope.goProfile = function(){ 
            if(status == true){
                $location.path(`/profile/${subId}`) 
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please complete Order to see details').hideDelay(2000) );
            }
        }
	}
}