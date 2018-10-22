var app = angular.module("cmsApp", ["ngRoute","ngMaterial","ngCookies"])
.config(['$routeProvider','$locationProvider','$mdThemingProvider',function($routeProvider,$locationProvider,$mdThemingProvider) {
	$routeProvider
	.when("/", {
		title:'home page',
		templateUrl : "views/user/home.html",
		controller  : "homeController"
	})
	.when("/signup", {
		title:'user signup page',
		templateUrl : "views/user/signup.html"
	})
	.when("/verify", {
		title:'user otp page',
		templateUrl : "views/user/verifyOtp.html"
	})
	.when("/userdetails/:userId", {
		title:'user details page',
		templateUrl : "views/user/userdetails.html"
	})
	.when("/userdetails/edit/:userId", {
		title:'user edit page',
		templateUrl : "views/user/userdetailsedit.html"
	})
	.when("/subscribe", {
		title:'subsrciption form page',
		templateUrl : "views/user/subscription.html"
	})
	// .when("/otp", {
	// 	title:'User otp page',
	// 	templateUrl : "views/user/otp.html"
	// })
	.when("/subcription/:subId", {
		title:'subsrciption details page',
		templateUrl : "views/user/subcriptionview.html"
	})
	.when("/subcription/edit/:subId", {
		title:'subsrciption edit page',
		templateUrl : "views/user/subcriptionedit.html"
	})
	.when("/cart/:subId", {
		title:'cart page',
		templateUrl : "views/user/cart.html"
	})
	.when("/checkout/:subId", {
		title:'checkout page',
		templateUrl : "views/user/checkout.html"
	})
	.when("/calender/:subId", {
		title:'calender page',
		templateUrl : "views/user/calender.html"
	})
	.when("/transactions/:subId", {
		title:'transactions page',
		templateUrl : "views/user/transactions.html"
	})
	.when("/thankyou/:subId", {
		title:'Thankyou page',
		templateUrl : "views/user/thankyou.html"
	})
	.otherwise({
       redirectTo: '/'
    });
	$locationProvider.html5Mode(true);
}]);