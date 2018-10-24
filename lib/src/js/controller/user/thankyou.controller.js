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

        window.onpopstate = function (e) { window.history.forward(1); }

        $scope.calendar = function(){
            // window.onpopstate   = function(e) { window.history.replaceState() }
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