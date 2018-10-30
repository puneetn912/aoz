export default function userdetailsController() {
	angular.module('cmsApp')
	.controller('userdetailsController', userdetailsController);
	userdetailsController.$inject = ['$scope','$timeout', '$q', '$log','$http','$routeParams','$location','$cookies'];
	function userdetailsController($scope,$timeout, $q, $log,$http,$routeParams,$location,$cookies) {
		var vmUserdetails = this;
        $scope.$watch('vmUserdetails.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        vmUserdetails.locality = ''
        vmUserdetails.apartment = ''
        vmUserdetails.tower = ''

        $http({method:'POST',url:`/getAllLocality`}).then(function successCallback(response) { if (response.data){
            vmUserdetails.statesPin = response.data    
        }else{ console.log('punet') }   
        }, function errorCallback(response) { });

        vmUserdetails.statesApt = ''

        // autocomplete pincode
            vmUserdetails.querySearchPin   = querySearchPin;
            vmUserdetails.selectedItemChangePin = selectedItemChangePin;
            vmUserdetails.searchTextChangePin   = searchTextChangePin;
            vmUserdetails.newStatePin = newStatePin;

            function newStatePin(statePin) {
              alert("Sorry! You'll need to create a Constitution for " + statePin + " first!");
            }

            function querySearchPin (query) {
              var results = query ? vmUserdetails.statesPin.filter( createFilterForPin(query) ) : vmUserdetails.statesPin,
                  deferred;
              if (vmUserdetails.simulateQueryPin) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
              } else {
                return results;
              }
            }

            function searchTextChangePin(text) {
              $log.info('Text changed to ' + text);

            }

            function selectedItemChangePin(item) {
              // $log.info('Item changed to ' + JSON.stringify(item));
              // console.log(item, 'item')
                if(item){
                    vmUserdetails.isDisabledApt    = false;
                    vmUserdetails.locality = {id:item._id, name:item.locality}
                    $http({method:'POST',url:`/getAptByLocality/${item._id}`}).then(function successCallback(response) { if (response.data){
                        console.log(response.data,'response.data')
                        vmUserdetails.statesApt = response.data
                    }else{ console.log('punet') }   
                    }, function errorCallback(response) { });
                }

            }

            function createFilterForPin(query) {
              var lowercaseQuery = query.toString();

              return function filterFn(statePin) {
                return (statePin.pincode.toString().indexOf(lowercaseQuery) === 0);
              };

            }


        // autocomplete apartment
            // vmUserdetails.statesApt        = [{display:"puneet",value:"for"},{display:"name",value:"naik"}];
            vmUserdetails.querySearchApt   = querySearchApt;
            vmUserdetails.selectedItemChangeApt = selectedItemChangeApt;
            vmUserdetails.searchTextChangeApt   = searchTextChangeApt;

            vmUserdetails.simulateQuery = true;
            vmUserdetails.isDisabledApt    = true;

            function newStateApt(stateApt) {
              alert("Sorry! You'll need to create a Constitution for " + stateApt + " first!");
            }

            function querySearchApt (query) {
                console.log(vmUserdetails.statesApt,'vmUserdetails.statesApt')
                var results = query ? vmUserdetails.statesApt.filter( createFilterForApt(query) ) : vmUserdetails.statesApt,
                  deferred;
                if (vmUserdetails.simulateQueryApt) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                    return 'none';
                } else {
                return results;
                }
            }

            function searchTextChangeApt(text) {
              $log.info('Text changed to ' + text);
            }

            function selectedItemChangeApt(item) {
                if(item){
                    vmUserdetails.isDisabledTwr = false;
                    vmUserdetails.apartment = {id:item._id, name:item.apartment_name}
                    console.log(item.tower_names,'towers_infromation')
                    vmUserdetails.statesTwr= item.tower_names;
                }

            } 

            function createFilterForApt(query) {
              var lowercaseQuery = query.toLowerCase();

              return function filterFn(stateApt) {
                return (stateApt.apartment_name.indexOf(lowercaseQuery) === 0);
              };

            }


        // autocomplete tower
            vmUserdetails.querySearchTwr   = querySearchTwr;
            vmUserdetails.searchTextChangeTwr   = searchTextChangeTwr;
            vmUserdetails.newStateTwr = newStateTwr;
            vmUserdetails.isDisabledTwr    = true;


            function newStateTwr(stateTwr) {
              alert("Sorry! You'll need to create a Constitution for " + stateTwr + " first!");
            }

            function querySearchTwr (query) {
              var results = query ? vmUserdetails.statesTwr.filter( createFilterForTwr(query) ) : vmUserdetails.statesTwr,
                  deferred;
              if (vmUserdetails.simulateQueryTwr) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
              } else {
                return results;
              }
            }

            function searchTextChangeTwr(text) {
              $log.info('Text changed to ' + text);
            }

            function selectedItemChangeTwr(item) {
                $log.info('Item changed to ' + JSON.stringify(item));
                vmUserdetails.tower = item
            }

            function createFilterForTwr(query) {
              var lowercaseQuery = query.toLowerCase();

              return function filterFn(stateTwr) {
                return (stateTwr.indexOf(lowercaseQuery) === 0);
              };

            }
            
        $scope.updateUser = function(){
            document.getElementById('detailSubmit').setAttribute('disabled','disabled');
            document.getElementById('loader').style.display = 'block'

            let data = { apartment_id :vmUserdetails.apartment.id, 
                        apartment_name:vmUserdetails.apartment.name,
                        tower_name:vmUserdetails.tower,
                        userId:$cookies.get('UaweSeaEaeRaaIaaD')}


            $http({method:'POST',url:`/updateUser`, data:data}).then(function successCallback(response) { if (response.data){
                // console.log(response.data,'updateUser')
                let user = response.data
                $http({method:'POST', url:`/createSubs`, data:user}).then(function successCallback(response) { if (response.data){
                    // console.log(response.data,'createSubs')
                    $cookies.put('SaweUSeaBaeSaaCaaRxxIssBaaEaaR',response.data._id)
                    if($cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')){
                       $location.path(`/subscribe/${$cookies.get('SaweUSeaBaeSaaCaaRxxIssBaaEaaR')}`);
                    }
                }else{console.log('error')}})
            }else{ console.log('punet') }})
          
        }
            
	}
}