/* Code generator by Bharath */
export default function authController() {
  angular.module('adminApp')
    .controller('authController', authController);

  authController.$inject = ['$scope','$location','$window','$mdDialog'];

  function authController($scope,$location,$window,$mdDialog) {
    var vmAuth = this;

    $scope.$watch('vmAuth.email', function (email) {
        // console.log(email)
    })

    $scope.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('Super Admin verification')
          .textContent('Enter SuperAdmin Password to Signup')
          .placeholder('Password')
          .targetEvent(ev)
          .required(true)
          .ok('Submit')
          .cancel('I am not SuperAdmin');

        $mdDialog.show(confirm).then(function(result) {
          if (result =='itsadminbro'){
            $window.location.href = "/signup";
          } else{
            $scope.status = 'Wrong Admin password';
          }
        }, function() {
          // $scope.status = 'Its all cool bro';
        });
    };

  }
}
/* End of File */