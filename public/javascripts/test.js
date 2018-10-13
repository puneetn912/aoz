var app = angular.module("cmsApp", ["ngRoute"])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	$routeProvider
	.when("/", {
		title:'home page',
		templateUrl : "views/user/home.html"
	})
	.when("/login", {
		title:'user login page',
		templateUrl : "views/user/login.html"
	})
	
	.when("/signup", {
		title:'user signup page',
		templateUrl : "views/user/signup.html"
	})
	.otherwise({
       redirectTo: '/'
    });
	$locationProvider.html5Mode(true);
}]);