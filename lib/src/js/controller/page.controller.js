export default function pageController() {
  angular.module('cmsApp')
    .controller('pageController', pageController);

  pageController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', '$location', '$routeParams', '$http','$route','$cookies','$mdToast'];

  function pageController($scope, $timeout, $mdSidenav, $log, $location, $routeParams, $http,$route,$cookies, $mdToast) {
    var vmPage = this;
    
    var paramValue = $route.current.$$route.type;
    var page = $route.current.$$route.page;
    console.log(page,'page')
    

    // $http.post(`/sendMail`).then(function(response){
    //     console.log(response.data,'response mail')
    // })

    // sidebar
        vmPage.toggleLeft = buildDelayedToggler('left')
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope, args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        function buildDelayedToggler(navID) {
            return debounce(function() {
                // console.log('here1')
                if(paramValue != 'thankyou'){
                    $mdSidenav(navID).toggle().then(function () {
                        $log.debug("done");
                    });
                }else{
                    console.log(document.getElementById('updateBtn'))
                    if(document.getElementById('updateBtn')){
                        if(document.getElementById('updateBtn').innerHTML == 'Manage'){
                            $mdSidenav(navID).toggle().then(function () {
                                $log.debug("done");
                            });    
                        }else{
                            $mdToast.show( $mdToast.simple().textContent('Please fill all the details').hideDelay(1500) );
                        }
                    }   
                }
            }, 200);
        }
        vmPage.close = function () {
          // Component lookup should always be available since we are not using `ng-if`
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT is done");
            });
        };

    $scope.faq = function(faq,up,down){

        if(document.getElementById(faq).style.display == 'none'){
            document.getElementById(faq).style.display = 'block';
            document.getElementById(up).style.display = 'block';
            document.getElementById(down).style.display = 'none';
        }
        else{
            document.getElementById(faq).style.display = 'none';
            document.getElementById(down).style.display = 'block';
            document.getElementById(up).style.display = 'none';
        }
    }
    
    let status = false
    vmPage.errMsg = ''
    if(paramValue == 'static'){
        if(page=='contact' || page=='chef'){
            vmPage.errMsg = ''
            vmPage.isFormFilled = false
            $scope.submit = function(){
                console.log('hey')
                let formData = document.forms["contactForm"].getElementsByTagName("input")
                console.log(formData.length)
                let userData = {}
                for(var i=0;i<formData.length;i++){
                    console.log(formData[i].value,'formData[i].value')
                    if(formData[i].value){
                        userData[formData[i].name] = formData[i].value
                        vmPage.errMsg = ''
                    }else{
                        vmPage.errMsg = 'Please fill all Details'
                    }
                    if(i==formData.length-1){
                        if(vmPage.errMsg == ''){
                            console.log(userData,'a')
                            if(userData.name){
                                $http.post(`/addContactLead`,userData).then(function(response){if(response.data){
                                    console.log(response.data,'userData')
                                    $mdToast.show( $mdToast.simple().textContent('Details has been submitted').hideDelay(1500) );
                                    vmPage.isFormFilled = true
                                }})
                            }else{
                                $http.post(`/addChefLead`,userData).then(function(response){if(response.data){
                                    console.log(response.data,'userData')
                                    $mdToast.show( $mdToast.simple().textContent('Details has been submitted').hideDelay(1500) );
                                    vmPage.isFormFilled = true
                                }})
                            }
                        }
                    }
                }
            }
        }else if(page=='chef'){
            
        }

        if($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')){
            // console.log('cookie found')
            $http.post(`/getSub/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`).then(function(response){if(response.data){
                // console.log(response.data,'data')
                if(response.data.status == false){ 
                    setTimeout(function(){
                        document.getElementById('secondSlot').innerHTML = `<img src="../images/catering.png" width="28px" height="28px" alt="white-logo"><span style="font-size: 12px;margin-top: -5px;letter-spacing: 1px;width: max-content" class="whitefont">Add Meals</span>`
                    },200) 
                }else{
                    status = true    
                }
            }})
            $scope.goCal = function(){
                if(status ==true){
                    window.location.href = `/calendar/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`
                }else{
                    $location.path(`/subscribe/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`) 
                    // var toast = $mdToast.simple().textContent('Please make an order first').action('ORDER NOW').highlightAction(true).highlightClass('md-raised').hideDelay(2000);
                    // $mdToast.show(toast).then(function(response) {
                    //   // console.log(response,'response')
                    //   if ( response == 'ok' ) {
                    //     $location.path(`/subscribe/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`) 
                    //   }
                    // });
                }
            }

            $scope.goProfile = function(){
                if(status == true){
                    $location.path(`/profile/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`) 
                }else{
                    var toast = $mdToast.simple().textContent('Please make an order first').action('ORDER NOW').highlightAction(true).highlightClass('md-raised').hideDelay(2000);
                    $mdToast.show(toast).then(function(response) {
                      // console.log(response,'response')
                      if ( response == 'ok' ) {
                        $location.path(`/subscribe/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`) 
                      }
                    });
                }
            }
        }else{
            console.log('cookie not found')
            $scope.goCal = function(){
                var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                        $location.path(`/`) 
                    }
                });
            }
            $scope.goProfile = function(){
                var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                        $location.path(`/`) 
                    }
                });
            }
        }
    }

    let cookies = $cookies.getAll()
    console.log(cookies, 'cookiesPAge')
    $scope.goDJ = function(){
        // if(paramValue=='thankyou'){
            // window.open('http://www.dialjordan.com', '_blank');
        // }else{
            if(cookies.subStatus){
                if(cookies.subStatus=="true"){
                    window.open('http://www.dialjordan.com', '_blank');
                }else{
                    console.log('cant bro')
                }
            }
        // }
    }




    // }else{
    //     console.log('diff page from static')
    //     $scope.goCal = function(){
    //         console.log('asdf')
    //         var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
    //         $mdToast.show(toast).then(function(response) {
    //             if ( response == 'ok' ) {
    //                 $location.path(`/`) 
    //             }
    //         });
    //     }
    //     $scope.goProfile = function(){
    //         var toast = $mdToast.simple().textContent('Something went wrong').action('Go Home').highlightAction(true).hideDelay(2000);
    //         $mdToast.show(toast).then(function(response) {
    //             if ( response == 'ok' ) {
    //                 $location.path(`/`) 
    //             }
    //         });
    //     }
    // }

    // if(url == '/menu' || url==)

    // vmPage.hey = function(){
    //     console.log('hey')
    // } 

    // $scope.goHome = function(){ $location.path(`/`) }
    // $scope.goProfile = function(){ 
    //     console.log($routeParams.subId,'$routeParams.subId')
    //     $location.path(`/profile/${$routeParams.subId}`) 
    // }
  }
}