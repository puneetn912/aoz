export default function cartController() {
	angular.module('cmsApp')
	.controller('cartController', cartController);
	cartController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http','$cookies','$mdToast'];
	function cartController($scope,$timeout, $q, $log,$location,$routeParams, $http,$cookies,$mdToast) {
		var vmCart = this;

        let status = false
        let cookies = $cookies.getAll()

        let subId= $cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')
        let subscription = ''

        $http({method:'POST',url:`/getSub/${subId}`}).then(function successCallback(response) { if (response.data){
            if(response.data.status == true){
                status = true
            }
            if(!cookies.mealType){
                console.log('no cookies man')
                // $location.path('/thankyou')
            }else{
                vmCart.category = 'dinner'
                vmCart.veg_count = cookies.countVeg
                vmCart.nveg_count = cookies.countNveg
                vmCart.meal_type = cookies.mealType

                if(vmCart.meal_type == 'Veg'){
                    document.getElementById('veeg').style.display = 'block';
                    document.getElementById('nveeg').style.display = 'none';
                }
                else if(vmCart.meal_type == "Non Veg"){
                    document.getElementById('nveeg').style.display = 'block';
                    document.getElementById('veeg').style.display = 'none';
                }
                else{
                    document.getElementById('veeg').style.display = 'block';
                    document.getElementById('nveeg').style.display = 'block';
                }
                vmCart.name = cookies.name
                vmCart.userName = cookies.name != "null" ? cookies.name : 'User ID'
                vmCart.userPhone = cookies.MasOassBqqLssIxxE
                vmCart.email = cookies.email
                vmCart.address = cookies.apartment_name

                vmCart.vegAmt = ((cookies.countVeg * 1)).toFixed(2)  
                vmCart.nvegAmt = ((cookies.countNveg * 2)).toFixed(2)  
                vmCart.mealCost = (parseFloat(vmCart.vegAmt) + parseFloat(vmCart.nvegAmt)).toFixed(2)
                vmCart.gst = (vmCart.mealCost*0.01).toFixed(2)
                vmCart.total = (parseFloat(vmCart.gst) + parseFloat(vmCart.mealCost)).toFixed(2);
                console.log(vmCart.vegAmt, vmCart.nvegAmt, vmCart.nvegAmt+vmCart.vegAmt )
            }

        }else{ console.log('puneet') }})

        let host = window.location.hostname

        $scope.modify = function(){
            console.log(vmCart,'vmCart')
            $location.path(`/subscribe/${subId}`)
            // window.location.href = `/subscribe/${subId}`
        }
        $scope.paynow = function(payment){
            if(host == 'localhost'){
                console.log('localbro')
                let orderNo = `${vmCart.userPhone}${new Date().getTime()}`
                let data = {
                    veg_count:cookies.countVeg, 
                    nonveg_count:cookies.countNveg,
                    amount:vmCart.total,
                    payment_date : new Date(),
                    order_no : orderNo,
                    meal_type : cookies.mealType
                }

                console.log(data, 'data')
                $http.post(`/addPayment/${subId}`,data).then(function(response){if(response.data){
                    console.log(response.data, 'payment added')
                    $cookies.put('ppid',response.data._id)
                    $cookies.put('pidStatus',false)
                    document.getElementById('payBtn').setAttribute('disabled','disabled');
                    document.getElementById('loader').style.display = 'block'
                    $location.path(`/thankyou`)
                }})
            }else{
                console.log('else pay')
                let urlto = `/sendtoairpay`;
                let finalObj = {
                    buyerFirstName : document.getElementById('name').value,
                    buyerPhone : document.getElementById('userPhone').value,
                    orderid : document.getElementById('userPhone').value,
                    buyerEmail :document.getElementById('email').value,
                    buyerAddress :document.getElementById('address').value,
                    amount : document.getElementById('total').value
                }
                $http.post(urlto,JSON.stringify(finalObj)).then(function (response) {
                    if (response.data){
                        console.log('responseresponse',response.data)
                        document.getElementById('privatekey').value = response.data.privatekey
                        document.getElementById('mid').value = response.data.mercid
                        document.getElementById('checksum').value = response.data.checksum
                        document.getElementById('buyerPhone').value = response.data.buyerPhone
                        document.getElementById('orderid1').value = response.data.orderid
                        document.getElementById('buyerAddress').value = response.data.buyerAddress
                        document.getElementById('amount').value = response.data.amount
                        

                        let orderNo = `${vmCart.userPhone}${new Date().getTime()}`
                        let data = {
                            veg_count:cookies.countVeg, 
                            nonveg_count:cookies.countNveg,
                            amount:vmCart.total,
                            payment_date : new Date(),
                            order_no : orderNo,
                            meal_type : cookies.mealType
                        }

                        let formData = document.forms["paymentForm"].getElementsByTagName("input")
                        console.log(formData.length)
                        let userData = {}
                        for(var i=0;i<formData.length;i++){
                            userData[formData[i].name] = formData[i].value
                            if(i==formData.length-1){
                                console.log(userData,'userData')
                            }
                        }

                        $http.post(`/addPayment/${subId}`,data).then(function(response){if(response.data){
                            console.log(response.data, 'payment added')
                            $cookies.put('sumAmt',undefined)
                            $cookies.put('ppid',response.data._id)
                            $cookies.put('pidStatus',false)
                            document.getElementById('payBtn').setAttribute('disabled','disabled');
                            document.getElementById('loader').style.display = 'block'

                            setTimeout(function(){
                                document.getElementById("sendtoairpay").submit();
                            }, 500);
                        }})

                    }else{
                        console.log('shyam') 
                    }
                })
            }
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