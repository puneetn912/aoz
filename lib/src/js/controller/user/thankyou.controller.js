export default function thankyouController() {
    angular.module('cmsApp')
    .controller('thankyouController', thankyouController);
    thankyouController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams'];
    function thankyouController($scope,$timeout, $q, $log, $location,$routeParams) {
        var vmThanks = this;

        $scope.some = function(){
            $location.path(`/calendar/${$routeParams.subId}`);
        }

    }
}