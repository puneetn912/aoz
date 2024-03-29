export default function thankyouController() {
    angular.module('cmsApp')
    .controller('thankyouController', thankyouController);
    thankyouController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http','$mdToast','$cookies'];
    function thankyouController($scope,$timeout, $q, $log, $location,$routeParams,$http,$mdToast,$cookies) {
        var vmThanks = this;
        var urlParams = $location.search();

        history.pushState(null, null, location.href);
        //console.log('shyam')
        window.onpopstate = function () {
            history.go(1);
        };

        let cookies = $cookies.getAll()
        //console.log(cookies,'cookiesThank')

        let userStatus = false
        if(cookies.doorNo != "null"){
            userStatus = true
            document.getElementById('doorInp').style.display ='none'
            document.getElementById('nameInp').style.display = 'none'
            document.getElementById('emailInp').style.display = 'none'
            document.getElementById('greeting').innerHTML = ''
            vmThanks.update = `Manage`
        }else{
            vmThanks.update = 'Save my profile'
        }

        //console.log(window.location.href, 'url')
        let currUrl = window.location.href 

        if(cookies.mealType){
            let subData = {
                category:'dinner',
                veg_count:cookies.countVeg, 
                nonveg_count:cookies.countNveg,
                totalVegCount:cookies.countTotalVeg,
                totalNvegCount:cookies.countTotalNveg,
                veg_remain:cookies.countVegRem,
                nonveg_remain:cookies.countNvegRem,
                meal_type:cookies.mealType,
                status:true
            }
            //console.log(subData, 'subData')
            $http.post(`/updateSubs/${cookies.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`,subData).then(function successCallback(response){if(response.data){
                vmThanks.subscription = response.data
                
                $cookies.put('countVeg',0)
                $cookies.put('countNveg',0)
                $cookies.put('countTotalVeg',0)
                $cookies.put('countTotalNveg',0)
                $cookies.put('countVegRem',0 )
                $cookies.put('countNvegRem',0)
                $cookies.put('mealType',undefined)
                $cookies.put('sumAmt',undefined)

                //console.log(vmThanks.subscription,'subscription updated')
                $http.post(`/updatePaymentStatus/${cookies.ppid}`).then(function(response){if(response.data){
                    vmThanks.payment = response.data

                    //sms confirmation
                    let mobile = vmThanks.subscription.user_id.mobileno;
                    let phone = [];
                    phone.push(mobile);
                    //console.log(phone, 'phone')
                    let smsurl = 'https://smsapi.epadhai.in/api/v1/sendsms';
                    let data = {"apikey":"cjixzzbge0001y9quo1ckwbbz",
                                "number":phone,
                                "message":`Your order on DJFresh is confirmed, You can manage your meal schedule on the app`,
                                "senderId": "JORDAN"}
                    $http.post(smsurl, JSON.stringify(data)).then(function (response) { if(response.data){
                        //console.log(response.data,'msg response')
                    }}, function myError(response) {
                        //console.log(response,'response')
                    })

                    
                    let payDate = vmThanks.payment.created_at
                    $cookies.put('payDate',vmThanks.payment.created_at)
                    //console.log(vmThanks.payment,'payment updated')
                    $cookies.put('subStatus',true)
                    $cookies.put('pidStatus',true)

                    let finalObj = {}
                    let finalArray =[]

                    // let startDate = new Date(payDate)  
                    let startDate = new Date("Jan 20 2019")  // pre launch date

                    let today= new Date()

                    let setDate = new Date()
                    setDate.setHours(15,0,0,0)

                    console.log(today,'today')
                    console.log(setDate,'setDate')
                    if(setDate > startDate){
                        if(setDate < today){
                            today.setDate(today.getDate()+1);
                            startDate = today
                        }else{
                            startDate = today
                        }
                    }
                    console.log(startDate,'startDate')
                    startDate = new Date(startDate)

                    let vegCount = vmThanks.subscription.veg_count
                    let nvegCount = vmThanks.subscription.nonveg_count

                    if(vmThanks.subscription.account_status == true){
                        Array.from({length: vegCount}, (x,i) => {
                            var day = startDate;

                            var nextDay = new Date(day)
                            nextDay.setDate(day.getDate()+i);
                            nextDay = nextDay.toString().slice(3,15)

                            finalArray.push({selected_data:nextDay, veg_count_on_day:1, nonVeg_count_on_day:0, 
                                subscription_id:vmThanks.subscription._id,
                                subscriber_name:'puneet',
                                month:nextDay.slice(0,4),
                                apartment_id:vmThanks.subscription.apartment_id,
                                user_id:vmThanks.subscription.user_id._id,
                                caterer_veg_id:cookies.catererVegId || null,
                                caterer_nonveg_id:cookies.catererNvegId || null
                            })
                        });

                        Array.from({length: nvegCount}, (x,i) => {
                            var day = startDate;

                            var nextDay = new Date(day)
                            nextDay.setDate(day.getDate()+i);
                            nextDay = nextDay.toString().slice(3,15)

                            let objIndex = finalArray.findIndex(obj => obj.selected_data == nextDay);
                            if(objIndex == -1){
                                finalArray.push({selected_data:nextDay, veg_count_on_day:0, nonVeg_count_on_day:1,
                                    subscription_id:vmThanks.subscription._id,
                                    subscriber_name:'puneet',
                                    month:nextDay.slice(0,4),
                                    apartment_id:vmThanks.subscription.apartment_id,
                                    user_id:vmThanks.subscription.user_id._id,
                                    caterer_veg_id:cookies.catererVegId || null,
                                    caterer_nonveg_id:cookies.catererNvegId || null
                                })
                            }else{
                                finalArray[objIndex].nonVeg_count_on_day = 1
                            }
                        })
                        //console.log(finalArray,'finalArray')
                        $http.post(`/addCalendar`,finalArray).then(function(response){
                            //console.log(response.data,'response')
                        })
                    }
                }})
            }else{
                var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                        $location.path(`/`) 
                    }
                });
                
            }})
        }else{
            //console.log('no data bro')
        }

        

        $scope.$watch('userDetails.$valid', function (doorCheck) {
            doorCheck==false ? document.getElementById('updateBtn').disabled = true : document.getElementById('updateBtn').disabled = false
        })

        $scope.calendar = function(){
            document.getElementById('calendarBtn').setAttribute('disabled','disabled');
            document.getElementById('loader').style.display = 'block'
            window.location.href = `/calendar/${cookies.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`
        }

        
        $scope.update =function(){
            if(vmThanks.update=='Manage'){
                window.location.href = `/calendar/${cookies.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`
            }else if(vmThanks.doorNo && vmThanks.userName && vmThanks.email){
                document.getElementById('updateBtn').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'
                let data = {door_no:vmThanks.doorNo, name:vmThanks.userName, userId:cookies.UaweSeaEaeRaaIaaD, email:vmThanks.email}
                $http.post(`/updateUser`,data).then(function(response){
                    //console.log(response.data,'user updated')
                    $cookies.put('doorNo', response.data.door_no)
                    $cookies.put('email', response.data.email)
                    $cookies.put('name', response.data.name)
                    window.location.href = `/calendar/${cookies.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`
                })
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill the details').hideDelay(2000) );
            }
        }

        $scope.goCal = function(){
            if(userStatus == true){
                window.location.href = `/calendar/${cookies.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill the details').hideDelay(2000) );
            }
        }

        $scope.goProfile = function(){ 
            if(vmThanks.update == 'Manage'){
                $location.path(`/profile/${cookies.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`) 
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill all details to see profile').hideDelay(2000) );
            }
        }
    }
}