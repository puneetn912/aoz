export default function thankyouController() {
    angular.module('cmsApp')
    .controller('thankyouController', thankyouController);
    thankyouController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http'];
    function thankyouController($scope,$timeout, $q, $log, $location,$routeParams,$http) {
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

            let vegCount = 10
            let nvegCount = 13

            // subscription_id: { type: String, required: true},
            // subscriber_name: { type: String,required: true},
            // selected_data: {type: String, required: true},
            // veg_count_on_day: {type: Number, required: true},
            // nonVeg_count_on_day: {type: String, required: true}

            for(var i=0;i<vegCount;i++){
                var nextDay = new Date();
                nextDay.setDate(startDate.getDate()+i);
                nextDay = nextDay.toString().slice(3,15)
                finalArray.push({selected_data:nextDay, veg_count_on_day:1, nonVeg_count_on_day:0, 
                    subscription_id:response.data._id,
                    subscriber_name:'puneet'
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
                                subscriber_name:'puneet'
                            })
                        }
                        else{
                            finalArray[objIndex].nonvegCount = 1
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
            // window.onpopstate   = function(e) { window.history.replaceState() }
            // $http.post(`createCal`)
            window.location.href = `/calendar/${$routeParams.subId}`
            
            // $location.search('userId', null);
            // $location.path(`/calendar/${$routeParams.subId}`);
        }

        vmThanks.update = 'Update'
        $scope.update =function(){
            console.log($routeParams.subId, $routeParams.userId)
            console.log(vmThanks.doorNo,'vmThanks.doorNo')
            console.log(vmThanks.userName,'vmThanks.doorNo')
            let data = {door_no:vmThanks.doorNo, name:vmThanks.userName, userId:urlParams.userId}
            $http.post(`/updateUser`,data).then(function(response){
                console.log(response.data,'response')
                vmThanks.update = 'Updated'
            })
        }

    }
}