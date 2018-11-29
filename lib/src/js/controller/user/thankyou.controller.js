export default function thankyouController() {
    angular.module('cmsApp')
    .controller('thankyouController', thankyouController);
    thankyouController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http','$mdToast','$cookies'];
    function thankyouController($scope,$timeout, $q, $log, $location,$routeParams,$http,$mdToast,$cookies) {
        var vmThanks = this;
        var urlParams = $location.search();

        history.pushState(null, null, location.href);
        console.log('shyam')
        window.onpopstate = function () {
            history.go(1);
        };

        let cookies = $cookies.getAll()
        console.log(cookies,'cookiesThank')

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

        console.log(window.location.href, 'url')
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
            $http.post(`/updateSubs/${cookies.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`,subData).then(function successCallback(response){if(response.data){
                vmThanks.subscription = response.data
                
                $cookies.put('countVeg',undefined)
                $cookies.put('countNveg',undefined)
                $cookies.put('countTotalVeg',undefined)
                $cookies.put('countTotalNveg',undefined)
                $cookies.put('countVegRem',undefined )
                $cookies.put('countNvegRem',undefined)
                $cookies.put('mealType',undefined)
                $cookies.put('sumAmt',undefined)

                console.log(vmThanks.subscription,'subscription updated')
                $http.post(`/updatePaymentStatus/${cookies.ppid}`).then(function(response){if(response.data){
                    vmThanks.payment = response.data
                    console.log(vmThanks.payment,'payment updated')
                    $cookies.put('subStatus',true)
                    $cookies.put('pidStatus',true)

                    let finalObj = {}
                    let finalArray =[]
                    let startDate = new Date()
                    startDate.setDate(startDate.getDate()+1);
                    startDate = new Date(startDate)

                    let vegCount = vmThanks.subscription.veg_count
                    let nvegCount = vmThanks.subscription.nonveg_count

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
                    console.log(finalArray,'finalArray')
                    $http.post(`/addCalendar`,finalArray).then(function(response){
                        console.log(response.data,'response')
                    })
                }})
            }})
        }else{
            console.log('no data bro')
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
                    console.log(response.data,'user updated')
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