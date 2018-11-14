var app = angular.module("cmsApp", ["ngRoute","ngMaterial","ngCookies"])

let a = ''
app.run(function run($rootScope,$location, $http, $cookies ){
    a = $cookies.getAll()
    console.log(a,'a')
    $rootScope.$on('$routeChangeStart', function(event,next,current){
        // if((Object.keys(a).length)>0){
        //     if(a.UaweSeaEaeRaaIaaD) {
        //         if(a.SaweUSeaBaeSaaCaaRxxIssBaaEaaR){
        //             if(a.subStatus == "true"){
        //                 console.log('goto to calender')
        //                 $location.path(`/calendar/${a.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`);
        //             }else{
        //                 console.log('goto order')
        //                 $location.path(`/subscribe/${a.SaweUSeaBaeSaaCaaRxxIssBaaEaaR}`);
        //             }
        //         }else{
        //             console.log('goto user details')
        //             $location.path(`/userdetails/${a.UaweSeaEaeRaaIaaD}`);
        //         }
        //     }else{
        //         console.log('goto start')
        //         $location.path(`/`);
        //     }
        // }else{
        //     console.log('not ther')
        // }
        
    })
      

    // $http.defaults.headers.common["X-AUTH-TOKEN"] = $cookies;
});

app.config(['$routeProvider','$locationProvider','$mdThemingProvider',function($routeProvider,$locationProvider,$mdThemingProvider) {
	console.log(a,'a')
    $routeProvider
	.when("/", { title:'home page', templateUrl:"views/user/home.html", controller:"homeController"})

	.when("/signup", { title:'user signup page', templateUrl : "views/user/signup.html" })
	
    .when("/verify", { title:'user otp page', templateUrl : "views/user/verifyOtp.html" })
	
    .when("/userdetails/:userId", { title:'user details page', templateUrl : "views/user/userdetails.html" })
	
    .when("/subscribe/:subId", { title:'subsrciption form page', templateUrl : "views/user/subscription.html" })
	
    .when("/cart/:subId", { title:'cart page', templateUrl : "views/user/cart.html" })
	
    .when("/declined/:subId", { title:'checkout page', templateUrl : "views/user/checkout.html" })
    
    .when("/thankyou/:subId", { title:'Thankyou page', templateUrl : "views/user/thankyou.html", type:"thankyou" })
    
    .when("/calendar/:subId", { title:'calender page', templateUrl : "views/user/calender.html" })
    
    .when("/transactions/:subId", { title:'transactions page', templateUrl : "views/user/transactions.html" })
    
    .when("/profile/:subId", { title:'Profile page', templateUrl : "views/user/profile.html" })
    
    .when("/menu", { title:'Menu', templateUrl : "views/static/menu.html", type:'static'})
    .when("/faq", { title:'FAQs', templateUrl : "views/static/faq.html", type:'static'})
    .when("/terms", { title:'Terms and Conditions', templateUrl : "views/static/terms.html", type:'static'})
    .when("/cancellation", { title:'Cancellation Policy', templateUrl : "views/static/cancellation.html", type:'static'})
    .when("/history", { title:'Order History', templateUrl : "views/static/history.html", type:'static'})
    .when("/contact", { title:'Contact Us', templateUrl : "views/static/contact.html" , type:'static'})
    .when("/chef-registration", { title:'Chef Registration', templateUrl : "views/static/registrationChef.html", type:'static'})

	.otherwise({ redirectTo: '/' });
	$locationProvider.html5Mode(true);
}]);