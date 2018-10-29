export default function thankyouController() {
    angular.module('cmsApp')
    .controller('thankyouController', thankyouController);
    thankyouController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http','$mdToast'];
    function thankyouController($scope,$timeout, $q, $log, $location,$routeParams,$http,$mdToast) {
        var vmThanks = this;
        var urlParams = $location.search();

        // $scope.$on('$locationChangeStart', function(evnt, next, current){            
        //     if (window.confirm('Please set your meals schedule')){
        //         console.log('yes')
        //         $location.path(`/calendar/${$routeParams.subId}`);
        //     }else{
        //         console.log('no')
        //         $location.path(`/signup`);
        //     }
        //     //Prevent browser's back button default action.
        //     evnt.preventDefault();            
        // });

        $http.post(`getSub/${$routeParams.subId}`).then(function(response){
            console.log(response.data,'response')
            let finalObj = {}
            let finalArray =[]
            let startDate = new Date()
            startDate.setDate(startDate.getDate()+1);

            let vegCount = response.data.veg_count
            let nvegCount = response.data.nonveg_count
            console.log(response.data.nonveg_count,'response.data.nonveg_count')

            for(var i=0;i<vegCount;i++){
                var nextDay = new Date();
                nextDay.setDate(startDate.getDate()+i);
                nextDay = nextDay.toString().slice(3,15)
                console.log(nextDay.slice(0,4),'nextDay.slice(0,3)')
                finalArray.push({selected_data:nextDay, veg_count_on_day:1, nonVeg_count_on_day:0, 
                    subscription_id:response.data._id,
                    subscriber_name:'puneet',
                    month:nextDay.slice(0,4)
                })
                if(i==vegCount-1){
                    for(var j=0;j<nvegCount;j++){
                        var nextDay = new Date();
                        nextDay.setDate(startDate.getDate()+j);
                        nextDay = nextDay.toString().slice(3,15)
                        
                        let objIndex = finalArray.findIndex(obj => obj.selected_data == nextDay);
                        console.log(objIndex,'objIndex')
                        if(objIndex == -1){
                            finalArray.push({selected_data:nextDay, veg_count_on_day:0, nonVeg_count_on_day:1,
                                subscription_id:response.data._id,
                                subscriber_name:'puneet',
                                month:nextDay.slice(0,4)
                            })
                        }
                        else{
                            finalArray[objIndex].nonVeg_count_on_day = 1
                        }
                        if(j==nvegCount-1){
                            console.log(finalArray,'finalArray')

                            $http.post(`/addCalendar`,finalArray).then(function(response){
                                console.log(response.data,'response')
                            })
                        }
                    }
                }
            }

        })

        window.onpopstate = function (e) { window.history.forward(1); }

        $scope.calendar = function(){
            document.getElementById('calendarBtn').setAttribute('disabled','disabled');
            document.getElementById('loader').style.display = 'block'
            // window.onpopstate   = function(e) { window.history.replaceState() }
            // $http.post(`createCal`)
            window.location.href = `/calendar/${$routeParams.subId}`
            
            // $location.search('userId', null);
            // $location.path(`/calendar/${$routeParams.subId}`);
        }

        vmThanks.update = 'Update'
        $scope.update =function(){
            console.log(vmThanks.doorNo,'vmThanks.doorNo')
            console.log(vmThanks.userName,'vmThanks.userName')

            if(vmThanks.doorNo && vmThanks.userName){
                document.getElementById('updateBtn').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'
                let data = {door_no:vmThanks.doorNo, name:vmThanks.userName, userId:urlParams.userId}
                $http.post(`/updateUser`,data).then(function(response){
                    console.log(response.data,'response')
                    window.location.href = `/calendar/${$routeParams.subId}`
                })
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please fill the details').hideDelay(2000) );
            }
        }

    }
}