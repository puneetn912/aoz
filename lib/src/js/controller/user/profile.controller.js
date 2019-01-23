export default function profileController() {
	angular.module('cmsApp')
	.controller('profileController', profileController);
	profileController.$inject = ['$scope','$timeout', '$q', '$log', '$http', '$routeParams', '$mdToast','$location'];
	function profileController($scope,$timeout, $q, $log, $http, $routeParams,$mdToast,$location) {
		var vmProfile = this;
        $scope.hey = function(){
            //console.log('asdf')
        }

        vmProfile.isDisabled = true

        $http.post(`/getAllApt`).then(function(response) { if (response.data){
            //console.log(response.data,'apts')
            vmProfile.statesApt = response.data
        }else{ //console.log('punet') }})

        $http.post(`/getSub/${$routeParams.subId}`).then(function(response){if(response.data){
            //console.log(response.data,'subscription')
            vmProfile.subscription = response.data
            if(response.data.status == true){
                status = true
                setTimeout(function(){
                    document.getElementById('firstSlot').innerHTML = `<img src="../images/catering.png" width="28px" height="28px" alt="white-logo"><span style="font-size: 12px;margin-top: -5px;letter-spacing: 1px;width: max-content" class="whitefont">Add Meals</span>`
                }, 300);
            }
        }else{
            var confirm = $mdDialog.confirm().title('Attention').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
            $mdDialog.show(confirm).then(function() {
                // let cookiesRem = $cookies.getAll()
                // angular.forEach(cookiesRem, function (cookie, key) {
                //     $cookies.remove(key)
                // });
                $location.path(`/`)       
            });
        }})


        vmProfile.swtich = false
        $scope.editProfile = function () {
            //console.log(vmProfile.swtich,'vmProfile.swtich')
            if(vmProfile.swtich == true){
                vmProfile.isDisabled = true
            }else{
                vmProfile.isDisabled = false
            }
        }   

        $scope.submit =function(){
            let formData = document.forms["profileForm"].getElementsByTagName("input")
            //console.log(formData.length)
            let userData = {}
            for(var i=0;i<formData.length;i++){
                userData[formData[i].name] = formData[i].value
                if(i==formData.length-1){
                    userData.userId = vmProfile.subscription.user_id._id
                    //console.log(userData,'a')
                    $http.post(`/updateUser`,userData).then(function(response){
                        $mdToast.show( $mdToast.simple().textContent('Profile updated!').hideDelay(2000) );
                    })
                }
            }
            vmProfile.isDisabled = true;
        }

        $scope.goCal = function(){ window.location.href = `/calendar/${$routeParams.subId}` }

        $scope.goProfile = function(){ 
            //console.log(vmProfile)
            $location.path(`/subscribe/${$routeParams.subId}`).search({
                vegCount:vmProfile.subscription.totalVegCount, 
                nonvegCount:vmProfile.subscription.totalNvegCount, 
                vegRem:vmProfile.subscription.veg_remain,
                nvegRem:vmProfile.subscription.nonveg_remain 
            });
            // $mdToast.show( $mdToast.simple().textContent('You are in your profile').hideDelay(2000) );
        }

        // autocomplete apartment
            vmProfile.querySearchApt = querySearchApt;
            vmProfile.selectedItemChangeApt = selectedItemChangeApt;
            vmProfile.searchTextChangeApt   = searchTextChangeApt;
            // vmProfile.searchTextApt   = searchTextApt;
            // vmProfile.isDisabledApt    = true;

            function newStateApt(stateApt) {
                alert("Sorry! You'll need to create a Constitution for " + stateApt + " first!");
            }

            function querySearchApt (query) {
                //console.log(vmProfile.statesApt,'vmProfile.statesApt')
                var results = query ? vmProfile.statesApt.filter( createFilterForApt(query) ) : vmProfile.statesApt, deferred;
                if (vmProfile.simulateQueryApt) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                    return 'none';
                } else { 
                    return results; 
                    //console.log(results,'results')
                }
                              
            }

            function searchTextChangeApt(text) {
              $log.info('Text changed to ' + text);
            }

            function selectedItemChangeApt(item) {
                if(item){
                    //console.log(item,'item')
                    vmProfile.isDisabledTwr = false;
                    vmProfile.apartment = {id:item._id, name:item.apartment_name}
                    vmProfile.apartment_id = item._id
                    //console.log(vmProfile.apartment_id,'vmProfile.apartment_id')
                    if(item.tower_names.length>0){
                        vmProfile.statesTwr= item.tower_names;
                    }else{
                        vmProfile.noTowers = `We're not serving in your area yet, hang in there!`
                    }
                }

            } 

            function createFilterForApt(query) {
                var lowercaseQuery = query.toLowerCase();
                return function filterFn(stateApt) {
                    return (stateApt.apartment_name.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            } 

        // autocomplete tower
            vmProfile.statesTwr = []
            vmProfile.querySearchTwr   = querySearchTwr;
            vmProfile.selectedItemChangeTwr = selectedItemChangeTwr;
            vmProfile.searchTextChangeTwr   = searchTextChangeTwr;
            vmProfile.isDisabledTwr = true;
            vmProfile.newStateTwr = newStateTwr;

            function newStateTwr(stateTwr) {
                //console.log(vmProfile.apartment,'vmProfile.apartment')
                let tower = { tower : stateTwr}
                $http.post(`/addTwr/${vmProfile.apartment.id}`,tower).then(function(response){if(response.data){
                    //console.log(response.data,'updated apt')
                    vmProfile.tower = stateTwr
                }else{                
                    $mdToast.show( $mdToast.simple().textContent('Some error occured').hideDelay(2000) );                
                }})
            }

            function querySearchTwr (query) {
                //console.log(vmProfile.statesTwr, 'vmProfile.statesTwr')
                var results = query ? vmProfile.statesTwr.filter( createFilterForTwr(query) ) : vmProfile.statesTwr, deferred;
                if (vmProfile.simulateQueryTwr) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                    return deferred.promise;
                } else { return results; }
            }

            function searchTextChangeTwr(text) {
              // $log.info('Text changed to ' + text);
            }

            function selectedItemChangeTwr(item) {
                //console.log(item,'item')
                $log.info('Item changed to ' + JSON.stringify(item));
                vmProfile.tower = item
            }

            function createFilterForTwr(query) {
              var lowercaseQuery = query.toLowerCase();

              return function filterFn(stateTwr) {
                return (stateTwr.toLowerCase().indexOf(lowercaseQuery) === 0);
              };

            }
	}
}