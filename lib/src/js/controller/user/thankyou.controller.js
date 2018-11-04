export default function thankyouController() {
    angular.module('cmsApp')
    .controller('thankyouController', thankyouController);
    thankyouController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http','$mdToast'];
    function thankyouController($scope,$timeout, $q, $log, $location,$routeParams,$http,$mdToast) {
        var vmThanks = this;
        var urlParams = $location.search();

        let status = false
        $http.post(`/updateStatus/${$routeParams.subId}`).then(function(response){if(response.data){
            console.log(response.data,'subscription')
            if(response.data.user_id.name){
                document.getElementById('calIcon').style.display = 'block'
                document.getElementById('doorInp').style.display ='none'
                document.getElementById('nameInp').style.display = 'none'
                document.getElementById('emailInp').style.display = 'none'
                vmThanks.update = `Manage`
                document.getElementById('greeting').innerHTML = ''
            }
            let finalObj = {}
            let finalArray =[]
            let startDate = new Date()
            startDate.setDate(startDate.getDate()+1);
            startDate = new Date(startDate)

            let vegCount = response.data.veg_count
            let nvegCount = response.data.nonveg_count

            Array.from({length: vegCount}, (x,i) => {
                var day = startDate;

                var nextDay = new Date(day)
                nextDay.setDate(day.getDate()+i);
                nextDay = nextDay.toString().slice(3,15)

                finalArray.push({selected_data:nextDay, veg_count_on_day:1, nonVeg_count_on_day:0, 
                    subscription_id:response.data._id,
                    subscriber_name:'puneet',
                    month:nextDay.slice(0,4),
                    apartment_id:response.data.apartment_id,
                    user_id:response.data.user_id._id
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
                        subscription_id:response.data._id,
                        subscriber_name:'puneet',
                        month:nextDay.slice(0,4),
                        apartment_id:response.data.apartment_id,
                        user_id:response.data.user_id._id
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

        window.onpopstate = function (e) { window.history.forward(1); }

        $scope.calendar = function(){
            document.getElementById('calendarBtn').setAttribute('disabled','disabled');
            document.getElementById('loader').style.display = 'block'
            window.location.href = `/calendar/${$routeParams.subId}`
        }

        vmThanks.update = 'Save my profile'
        $scope.update =function(){
            if(vmThanks.update=='Manage'){
                document.getElementById('calIcon').style.display = 'block'
                window.location.href = `/calendar/${$routeParams.subId}`
            }else if(vmThanks.doorNo && vmThanks.userName && vmThanks.email){
                document.getElementById('updateBtn').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'
                let data = {door_no:vmThanks.doorNo, name:vmThanks.userName, userId:urlParams.userId, email:vmThanks.email}
                $http.post(`/updateUser`,data).then(function(response){
                    console.log(response.data,'response')
                    window.location.href = `/calendar/${$routeParams.subId}`
                })
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill the details').hideDelay(2000) );
            }
        }

        $scope.goCal = function(){  window.location.href = `/calendar/${$routeParams.subId}`}


    }
}