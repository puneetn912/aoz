export default function userdetailsController() {
	angular.module('cmsApp')
	.controller('userdetailsController', userdetailsController);
	userdetailsController.$inject = ['$scope','$timeout', '$q', '$log','$http','$routeParams','$location','$cookies','$mdToast'];
	function userdetailsController($scope,$timeout, $q, $log,$http,$routeParams,$location,$cookies,$mdToast) {
		var vmUserdetails = this;
        
        vmUserdetails.locality = ''
        vmUserdetails.apartment = ''
        vmUserdetails.tower = ''
        vmUserdetails.noTowers = ''
        

        $http.post(`/getAllApt`).then(function(response) { if (response.data){
            console.log(response.data,'apts')
            vmUserdetails.statesApt = response.data
        }else{ console.log('punet') }})

        $scope.updateUser = function(){
            console.log(vmUserdetails.tower,'tower', vmUserdetails.apartment.id, vmUserdetails.apartment.name,'vmUserdetails.name')
            if(vmUserdetails.apartment.id && vmUserdetails.tower){
                document.getElementById('detailSubmit').setAttribute('disabled','disabled');
                document.getElementById('loader').style.display = 'block'
                let data = { apartment_id :vmUserdetails.apartment.id, 
                            apartment_name:vmUserdetails.apartment.name,
                            tower_name:vmUserdetails.tower,
                            userId:$cookies.get('UaweSeaEaeRaaIaaD')}
                console.log(data, 'subDAta')
                $http({method:'POST',url:`/updateUser`, data:data}).then(function successCallback(response) { if (response.data){
                    console.log(response.data,'updateUser')
                    let user = response.data
                    $cookies.put('apt_id',user.apartment_id)
                    $cookies.put('apartment_name',user.apartment_name)
                    $cookies.put('tower_name',user.tower_name)

                    $http({method:'POST', url:`/createSubs`, data:user}).then(function successCallback(response) { if (response.data){
                        console.log(response.data,'createSubs')
                        $cookies.put('SaweUSeaBaeSaaCaaRxxIssBaaEaaR',response.data._id)
                        $cookies.put('subStatus',response.data.status)
                        $cookies.put('name',response.data.user_id.name)
                        $cookies.put('email',response.data.user_id.email)
                        $cookies.put('doorNo',response.data.user_id.door_no)
                        $cookies.put('catererVegId', response.data.apartment_id.caterer_veg_id)
                        $cookies.put('catererNvegId', response.data.apartment_id.caterer_nonveg_id)

                        if($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')){
                           $location.path(`/subscribe/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`);
                        }
                    }else{console.log('error')}})
                }else{ 
                    var confirm = $mdDialog.confirm().title('Hey Bro').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
                    $mdDialog.show(confirm).then(function() {
                        // let cookiesRem = $cookies.getAll()
                        // angular.forEach(cookiesRem, function (cookie, key) {
                        //     $cookies.remove(key)
                        // });
                        $location.path(`/`)       
                    });
                }})
            }else{
                $mdToast.show($mdToast.simple().textContent('Please fill all the details by selecting from options').hideDelay(2000) );                
            }
        }

        // $http({method:'POST',url:`/getAllLocality`}).then(function successCallback(response) { if (response.data){
        //     vmUserdetails.statesPin = response.data    
        // }else{ console.log('punet') }   
        // }, function errorCallback(response) { });

        // autocomplete pincode
            // vmUserdetails.statesPin = []
            // vmUserdetails.querySearchPin   = querySearchPin;
            // vmUserdetails.selectedItemChangePin = selectedItemChangePin;
            // vmUserdetails.searchTextChangePin   = searchTextChangePin;
            // vmUserdetails.newStatePin = newStatePin;

            // function newStatePin(statePin) {
            //   alert("Sorry! You'll need to create a Constitution for " + statePin + " first!");
            // }

            // function querySearchPin (query) {
            //   var results = query ? vmUserdetails.statesPin.filter( createFilterForPin(query) ) : vmUserdetails.statesPin,
            //       deferred;
            //   if (vmUserdetails.simulateQueryPin) {
            //     deferred = $q.defer();
            //     $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            //     return deferred.promise;
            //   } else {
            //     return results;
            //   }
            // }

            // function searchTextChangePin(text) {
            //   $log.info('Text changed to ' + text);

            // }

            // function selectedItemChangePin(item) {
            //   // $log.info('Item changed to ' + JSON.stringify(item));
            //   console.log(item, 'item')
            //     if(item){
            //         vmUserdetails.isDisabledApt    = false;
            //         vmUserdetails.locality = {id:item._id, name:item.locality}
            //         $http({method:'POST',url:`/getAptByLocality/${item._id}`}).then(function successCallback(response) { if (response.data){
            //             console.log(response.data,'apartment')
            //             vmUserdetails.statesApt = response.data
            //         }else{ console.log('punet') }   
            //         }, function errorCallback(response) { });
            //     }

            // }

            // function createFilterForPin(query) {
            //   var lowercaseQuery = query.toString();

            //   return function filterFn(statePin) {
            //     return (statePin.pincode.toString().indexOf(lowercaseQuery) === 0);
            //   };

            // }

        // autocomplete apartment
            vmUserdetails.querySearchApt = querySearchApt;
            vmUserdetails.selectedItemChangeApt = selectedItemChangeApt;
            vmUserdetails.searchTextChangeApt   = searchTextChangeApt;
            // vmUserdetails.searchTextApt   = searchTextApt;
            // vmUserdetails.isDisabledApt    = true;

            function newStateApt(stateApt) {
              alert("Sorry! You'll need to create a Constitution for " + stateApt + " first!");
            }

            function querySearchApt (query) {
                var results = query ? vmUserdetails.statesApt.filter( createFilterForApt(query) ) : vmUserdetails.statesApt, deferred;
                if (vmUserdetails.simulateQueryApt) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                    return 'none';
                } else { 
                    return results; 
                    console.log(results,'results')
                }
                              
            }

            function searchTextChangeApt(text) {
              $log.info('Text changed to ' + text);
            }

            function selectedItemChangeApt(item) {
                if(item){
                    console.log(item,'item')
                    vmUserdetails.apartment = {id:item._id, name:item.apartment_name}
                    vmUserdetails.statesTwr = item.tower_names;
                    console.log(vmUserdetails.statesTwr,'vmUserdetails.statesTwr')
                    if(item.tower_names.length>0){
                        console.log('its in')
                        vmUserdetails.noTowers = ``
                        vmUserdetails.isDisabledTwr = false;
                    }else{
                        console.log('its out')

                        vmUserdetails.noTowers = `Sorry we are running full with orders in your location. We will notify you once there is availability.`
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
            vmUserdetails.statesTwr = []
            vmUserdetails.querySearchTwr = querySearchTwr;
            vmUserdetails.selectedItemChangeTwr = selectedItemChangeTwr;
            vmUserdetails.searchTextChangeTwr   = searchTextChangeTwr;
            vmUserdetails.isDisabledTwr = true;
            vmUserdetails.newStateTwr = newStateTwr;

            function newStateTwr(stateTwr) {
                console.log(vmUserdetails.apartment,'vmUserdetails.apartment')
                let tower = { tower : stateTwr}
                $http.post(`/addTwr/${vmUserdetails.apartment.id}`,tower).then(function(response){if(response.data){
                    console.log(response.data,'updated apt')
                    vmUserdetails.tower = stateTwr
                }else{                
                    $mdToast.show( $mdToast.simple().textContent('Some error occured').hideDelay(2000) );                
                }})
            }

            function querySearchTwr (query) {
                console.log(vmUserdetails.statesTwr, 'vmUserdetails.statesTwr')
                var results = query ? vmUserdetails.statesTwr.filter( createFilterForTwr(query) ) : vmUserdetails.statesTwr, deferred;
                if (vmUserdetails.simulateQueryTwr) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                    return deferred.promise;
                } else { return results; }
            }

            function searchTextChangeTwr(text) {
              // $log.info('Text changed to ' + text);
            }

            function selectedItemChangeTwr(item) {
                console.log(item,'selected tower')
                $log.info('Item changed to ' + JSON.stringify(item));
                vmUserdetails.tower = item
            }

            function createFilterForTwr(query) {
              var lowercaseQuery = query.toLowerCase();

              return function filterFn(stateTwr) {
                return (stateTwr.toLowerCase().indexOf(lowercaseQuery) === 0);
              };

            }
            
            
	}
}