export default function menuController() {
    angular.module('cmsApp')
    .controller('menuController', menuController);
    menuController.$inject = ['$scope','$timeout', '$q', '$log'];
    function menuController($scope,$timeout, $q, $log, $http) {
        var vmMenu = this;

        console.log('asdfasdfasdfasdfasdf')

        // $http.post()


         var tabs = [
        { title: 'Zero ', content: 'Woah...that is a really long title!' },
        { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
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
    }
}