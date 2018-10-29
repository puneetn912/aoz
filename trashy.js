// dialog code

// console.log(currTd,'currTd')
            // if(currTd.class != 'md-calendar-date md-calendar-date-disabled'){
            //     $mdDialog.show({
                    
            //         parent: angular.element(document.getElementById('cardContent')),
            //         template: `<form name="userForm" id='mealCountForm' style="margin-bottom: 0px" align="center"> 
            //                 <div layout="row" layout-align="space-between center" layout-padding class="pt0 pb0 bt-1-s-eee">
            //                     <div>
            //                         <label class="greyfont">No. of Veg Meals</label>
            //                     </div>
            //                     <div layout="row" layout-align="center center" class="pt0 pb0">
            //                         <div>
            //                             <md-button class="md-raised sub-meal-btn" ng-click="caldveg()"><i class="fa fa-minus" aria-hidden="true"></i></md-button>
            //                         </div>
            //                         <div>
            //                             <input readonly id="calveg" class="aligncenter width35 border-none" type="number" value="${vmCalender.dayVegCount}">
            //                         </div>
            //                         <div>
            //                             <md-button class="md-raised sub-meal-btn" ng-click="caliveg()"><i class="fa fa-plus" aria-hidden="true"></i></md-button>
            //                         </div>
            //                     </div>
            //                 </div>
                            
            //                 <div layout="row" layout-align="space-between center" layout-padding class="pt0 pb0 bt-1-s-eee">
            //                     <div>
            //                         <label class="greyfont">No. of non Veg Meals</label>
            //                     </div>
            //                     <div layout="row" layout-align="center center" class="pt0 pb0">
            //                         <div>
            //                             <md-button class="md-raised sub-meal-btn" ng-click="caldnveg()"><i class="fa fa-minus" aria-hidden="true"></i></md-button>
            //                         </div>
            //                         <div>
            //                             <input readonly id="calnveg" class="aligncenter width35 border-none" type="number" value="${vmCalender.dayNonvegCount}">
            //                         </div>
            //                         <div>
            //                             <md-button class="md-raised sub-meal-btn" ng-click="calinveg()"><i class="fa fa-plus" aria-hidden="true"></i></md-button>
            //                         </div>
            //                     </div>
            //                 </div>
            //     </form>`,
            //         locals:{},
            //         scope:$scope,
            //         controller: calenderController
            //     });
            // }





//------------------------------------------------------------------------------------------------ Create controller with autocomplete

    // /* Code generator by Bharath */
    // export default function userCreateController() {
    //     angular.module('adminApp')
    //     .controller('userCreateController', userCreateController);

    //     userCreateController.$inject = ['$scope','$timeout', '$q', '$log', 'userFactory'];

    //     function userCreateController($scope,$timeout, $q, $log, userFactory) {
    //         var vmUserCreate = this;
    //         vmUserCreate.simulateQuery = false;
    //         vmUserCreate.isDisabled = false;

    //         vmUserCreate.users = userFactory.query();

    //         // list of `state` value/display objects
    //         vmUserCreate.states = loadAll();
    //         vmUserCreate.querySearch = querySearch;
    //         vmUserCreate.selectedItemChange = selectedItemChange;
    //         vmUserCreate.searchTextChange = searchTextChange;

    //         vmUserCreate.newState = newState;

    //         function newState(state) {
    //             alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    //         }

    //         function querySearch(query) {
    //             $log.info('query');
                
    //             var results = query ? vmUserCreate.states.filter(createFilterFor(query)) : vmUserCreate.states,
    //                 deferred;
    //             if (results) {
    //                 $log.info(vmUserCreate.states);
    //                 $log.info(results);
    //             }
    //             if (vmUserCreate.simulateQuery) {
    //                 deferred = $q.defer();
    //                 $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
    //                 return deferred.promise;
    //             } else {
    //                 return results;
    //             }
    //         }

    //         function searchTextChange(text) {
    //             $log.info('Text changed to ' + text);
    //         }

    //         function selectedItemChange(item) {
    //             $log.info('Item changed to ' + JSON.stringify(item));
    //         }

    //         /**
    //          * Build `states` list of key/value pairs
    //          */
    //         function loadAll() {
    //             $log.info('loadAll_TOP');
    //             $log.info(vmUserCreate.users);
    //             return vmUserCreate.users.map(function(state) {
    //                 state.value = state.name.toLowerCase();
    //                 state.display = state.name;
    //                 return state;
    //             });
    //         }

    //         /**
    //          * Create filter function for a query string
    //          */
    //         function createFilterFor(query) {
    //             var lowercaseQuery = query.toLowerCase();

    //             return function filterFn(state) {
    //                 return (state.value.indexOf(lowercaseQuery) === 0);
    //             };

    //         }
    //     }
    // }
    // /* End of File */

    // <md-autocomplete ng-disabled="<%= vm %>.isDisabled" md-no-cache="<%= vm %>.noCache" md-selected-item="<%= vm %>.selectedItem" md-search-text-change="<%= vm %>.searchTextChange(<%= vm %>.searchText)"
    //  md-search-text="<%= vm %>.searchText" md-selected-item-change="<%= vm %>.selectedItemChange(item)" md-items="item in <%= vm %>.querySearch(<%= vm %>.searchText)"
    //  md-item-text="item.display" md-min-length="0" placeholder="Owner Name">
    //     <md-item-template>
    //         <span md-highlight-text="<%= vm %>.searchText" md-highlight-flags="^i">{{item.display}}</span>
    //     </md-item-template>
    //     <md-not-found>
    //         No states matching "{{<%= vm %>.searchText}}" were found.
    //         <a ng-click="<%= vm %>.newState(<%= vm %>.searchText)">Create a new one!</a>
    //     </md-not-found>
    // </md-autocomplete>



            // let merchants = {}
            // let merchantArr = []
            // listing.merchant_id.map(x => merchants.id = x)
            // merchantArr.push(merchants)
            // //console.log(merchantArr,'merchantArr')
            // vmListingEdit.listing.rMerchants = listing.merchant_id
            // vmListingEdit.listing.merchant_id = merchants
            ////console.log('vmListingEdit.listing.rMerchants',vmListingEdit.listing.rMerchants)

















        // console.log(vmApartmentCreate.towerCount)


        // $scope.submitCount = function(){
        //     console.log(vmApartmentCreate.years,'type')
        // } 

        // $scope.calcul = function(){
        //     let countArr = Array.apply(null, {length: 3}).map(Number.call, Number)
        //     let document.innerHTML = countArr.map(x =>{
        //         return `<td layout='row' id='${x}'>
        //         <md-input-container class="md-block">
        //             <label for="tower_name">Tower Name</label>
        //             <input type="text" aria-label="apartments" name="tower_name" ng-model="<%= vm %>.tower_name" />
        //         </md-input-container>
        //         <md-input-container class="md-block">
        //             <label for="door_number">Door Numbers</label>
        //             <md-chips ng-model="vmApartmentCreate.editableTowerNames"  
        //             md-removable="vmApartmentCreate.removable" 
        //             md-enable-chip-edit="true" 
        //             md-transform-chip="vmApartmentCreate.newTower($chip)"></md-chips>
        //         </md-input-container>
        //         </td>`
        //     }).join(' ');
        //     return a
        // }   
        // var startYear = 1900
        // var thisYear = new Date().getFullYear();
        // var range = [];

            //         let appTitle = countArr.map(x =>{
            //     return `<td layout='row'>
            //     <md-input-container class="md-block">
            //         <label for="tower_name">Tower Name</label>
            //         <input type="text" aria-label="apartments" name="tower_name" ng-model="<%= vm %>.tower_name" />
            //     </md-input-container>
            //     <md-input-container class="md-block">
            //         <label for="door_number">Door Numbers</label>
            //         <md-chips ng-model="vmApartmentCreate.editableTowerNames"  
            //         md-removable="vmApartmentCreate.removable" 
            //         md-enable-chip-edit="true" 
            //         md-transform-chip="vmApartmentCreate.newTower($chip)"></md-chips>
            //     </md-input-container>
            //     </td>`
            // }).join(' ');
            // vmApartmentCreate.myText = $sce.trustAsHtml($compile(appTitle));

                        // document.getElementById('towerInputs').innerHTML = countArr.map(x =>{
            //     return `<td layout='row'>
            //     <md-input-container class="md-block">
            //         <label for="tower_name">Tower Name</label>
            //         <input type="text" aria-label="apartments" name="tower_name" ng-model="<%= vm %>.tower_name" />
            //     </md-input-container>
            //     <md-input-container class="md-block">
            //         <label for="door_number">Door Numbers</label>
            //         <md-chips ng-model="vmApartmentCreate.editableTowerNames"  
            //         md-removable="vmApartmentCreate.removable" 
            //         md-enable-chip-edit="true" 
            //         md-transform-chip="vmApartmentCreate.newTower($chip)"></md-chips>
            //     </md-input-container>
            //     </td>`
            // }).join(' ')
