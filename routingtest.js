angular.module('adminApp',['ngRoute'])
    .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
      $routeProvider
      .when('/',{
        title:'Customer',
        templateUrl:'./views/userscreen/customscreen/user_landing.ejs',
        controller:'customerLandCtrl'
        })
      .when('/login',{
        title:'Customer Login',
        templateUrl:'./views/userscreen/customscreen/user_landing.ejs',
        controller:'customerLoginCtrl'
        })
      .when('/signup',{
        title:'Customer SignUp',
        templateUrl:'./views/userscreen/customscreen/user_signup.ejs',
        controller:'customerSignCtrl'
        })
      .otherwise({
          redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
}]);
