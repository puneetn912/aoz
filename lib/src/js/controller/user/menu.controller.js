export default function menuController() {
    angular.module('cmsApp')
    .controller('menuController', menuController);
    menuController.$inject = ['$scope','$timeout','$q','$log','$http','$location','$routeParams','$cookies'];
    function menuController($scope, $timeout, $q, $log, $http, $location, $routeParams, $cookies) {
        var vmMenu = this;

        // $http.post()
        console.log($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR'),'$cookies.get1')

         var tabs = [
            { title: 'Veg ', content: 'Woah...that is a really long title!' },
            { title: 'Non Veg', content: "Tabs will become paginated if there isn't enough room for them."},
        ],

        selected = null,
        previous = null;
        $scope.tabs = tabs;
        $scope.selectedIndex = 0;
        $scope.$watch('selectedIndex', function(current, old){
            previous = selected;
            selected = tabs[current];
            if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
            if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
        });

        

        // $scope.showcal = function(){
        //     console.log('asdfasdf')
        //     // $location.path(`/`)
        //     window.location.href = `/`
        // }

    }
}