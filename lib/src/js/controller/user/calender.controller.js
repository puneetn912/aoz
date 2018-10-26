export default function calenderController() {
	angular.module('cmsApp')
	.controller('calenderController', calenderController);
	calenderController.$inject = ['$scope','$timeout', '$q', '$log','$http','$routeParams','$location', '$mdDialog','$mdToast'];
	function calenderController($scope,$timeout, $q,$log,$http,$routeParams,$location,$mdDialog,$mdToast) {
		var vmCalender = this;

        console.log($routeParams.subId,'$routeParams')

        let vegCount =0
        let nonvegCount =0
        let subscription = ''
        let subId = $routeParams.subId
        let vegRemaining = 0
        let nvegRemaining = 0

        $http.post(`/getSub/${$routeParams.subId}`).then(function(response){
            console.log(response.data,'response')
            subscription = response.data
            vegCount = subscription.veg_count
            nonvegCount = subscription.nonveg_count
            vmCalender.vegRem = subscription.veg_remain
            vmCalender.nvegRem = subscription.nonveg_remain
            vmCalender.vegCount = vegCount
            vmCalender.totalVegCount = subscription.totalVegCount
            vmCalender.totalNvegCount = subscription.totalNvegCount
            vmCalender.nonvegCount = nonvegCount
        })

        vmCalender.startDate = new Date()
        vmCalender.startDate.setDate(vmCalender.startDate.getDate()+1)
        vmCalender.currDate = new Date()
        vmCalender.currDate.setDate(vmCalender.currDate.getDate()+1)
        vmCalender.threeMahead = new Date(vmCalender.currDate)  
        vmCalender.threeMahead = new Date(vmCalender.threeMahead.setMonth(vmCalender.threeMahead.getMonth()+3))  
        console.log(vmCalender.threeMahead,'vmCalender.threeMahead')
        
        vmCalender.currDateHead = vmCalender.startDate.toString().slice(3,15)

        vmCalender.allDatesVeg = []
        vmCalender.allDatesNonveg = []
        
        vmCalender.allDatesVeg.push({date:vmCalender.startDate.toString().slice(3,15), vegCount:1})
        vmCalender.allDatesNonveg.push({date:vmCalender.startDate.toString().slice(3,15), nonvegCount:1})
        let existingDateVeg =  [{date: new Date(),vegCount:1}]
        let existingDateNonveg = [{date: new Date(),nonvegCount:1}]

        var pastMonthtoday = `${vmCalender.startDate.getFullYear()}-${vmCalender.startDate.getMonth()}-${vmCalender.startDate.getDate()}`;
        let date = vmCalender.startDate.getDate()
        vmCalender.dayVegCount = 1
        vmCalender.dayNonvegCount = 1  


        // setTimeout(function(){
        //     let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]
        //     dateSpan.innerHTML = `${date}<span class="material-label mdl-badge veg" data-badge="1"></span><span class="material-label mdl-badge nonveg" data-badge="1"></span>`

        //     dateSpan.style.border = '1px solid #c02425';
        //     dateSpan.style.color = 'black';
        // }, 1000);

        setTimeout(function(){
            for(var i=0;i<vegCount;i++){
                var nextDay = new Date(vmCalender.startDate);
                nextDay.setDate(vmCalender.startDate.getDate()+i);
                vmCalender.allDatesVeg.push({date:nextDay.toString().slice(3,15), vegCount:1})
                
                var pastMonthtoday =  `${nextDay.getFullYear()}-${nextDay.getMonth()}-${nextDay.getDate()}`;
                let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]
                let date = nextDay.getDate()
                
                dateSpan.innerHTML = `${date} <span class="material-label mdl-badge veg" data-badge="1">`
                vmCalender.dayVegCount = 1
                
                dateSpan.style.border = '1px solid #c02425';
                // dateSpan.style.color = 'white';

                // if(i==vegCount-1){
                //     lastDateVeg = pastMonthtoday
                // }
            }
            for(var i=0;i<nonvegCount;i++){
                var nextDay1 = new Date(vmCalender.startDate);
                nextDay1.setDate(vmCalender.startDate.getDate()+i);
                vmCalender.allDatesNonveg.push({date:nextDay1.toString().slice(3,15), nonvegCount:1})
                
                var pastMonthtoday1 =  `${nextDay1.getFullYear()}-${nextDay1.getMonth()}-${nextDay1.getDate()}`;
                let dateSpan1 = document.getElementById(`md-0-month-${pastMonthtoday1}`).childNodes[0]

                dateSpan1.innerHTML += '<span class="material-label mdl-badge nonveg" data-badge="1">';
                vmCalender.dayNonvegCount = 1

                dateSpan1.style.border = '1px solid #c02425';
                // dateSpan1.style.color = 'white';
                
                // if(i==nonvegCount-1){
                //     lastDateNonveg = pastMonthtoday1
                // }
            }
        }, 1000);

        // update
        let selectedDate = ''
        let objIndexVeg = ''
        let objIndexNonveg = ''
        let currDate = ''

        //on date click
            // get current date veg count
            // get current date nonveg count
        $scope.some= function(ev){

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                template: `<form name="userForm" id='mealCountForm' style="margin-bottom: 0px" align="center"> 


                        <div layout="row" layout-align="space-between center" layout-padding class="pt0 pb0 bt-1-s-eee">
                            <div>
                                <label class="greyfont">No. of Veg Meals</label>
                            </div>
                            <div layout="row" layout-align="center center" class="pt0 pb0">
                                <div>
                                    <md-button class="md-raised sub-meal-btn" ng-click="caldveg()"><i class="fa fa-minus" aria-hidden="true"></i></md-button>
                                </div>
                                <div>
                                    <input readonly id="calveg" class="aligncenter width35 border-none" type="number" value="0" ng-model="${vmCalender.dayVegCount}">
                                </div>
                                <div>
                                    <md-button class="md-raised sub-meal-btn" ng-click="caliveg()"><i class="fa fa-plus" aria-hidden="true"></i></md-button>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div layout="row" layout-align="space-between center" layout-padding class="pt0 pb0 bt-1-s-eee">
                            <div>
                                <label class="greyfont">No. of non Veg Meals</label>
                            </div>
                            <div layout="row" layout-align="center center" class="pt0 pb0">
                                <div>
                                    <md-button class="md-raised sub-meal-btn" ng-click="caldnveg()"><i class="fa fa-minus" aria-hidden="true"></i></md-button>
                                </div>
                                <div>
                                    <input readonly id="calnveg" class="aligncenter width35 border-none" type="number" value="0" ng-model="${vmCalender.dayNonvegCount}">
                                </div>
                                <div>
                                    <md-button class="md-raised sub-meal-btn" ng-click="calinveg()"><i class="fa fa-plus" aria-hidden="true"></i></md-button>
                                </div>
                            </div>
                        </div>
            </form>`,
                locals:{},
                controller: calenderController
            });

            document.getElementById('finalSubmit').style.display = "block"
            currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
            selectedDate = vmCalender.currDate.toString().slice(3,15)
            vmCalender.currDateHead = selectedDate

            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

            if(objIndexVeg==-1){
                vmCalender.dayVegCount = 0
            }else{
                vmCalender.dayVegCount = vmCalender.allDatesVeg[objIndexVeg].vegCount
            }
            if(objIndexNonveg==-1){
                vmCalender.dayNonvegCount = 0
            }else{
                vmCalender.dayNonvegCount = vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount
            }


        }

        // plus veg click - done
        $scope.caliveg = function(){
            if(vmCalender.vegRem==0){
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Remaining meals is 0')
                    .hideDelay(2000)
                );
            }else{
                vmCalender.vegRem--
                document.getElementById('finalSubmit').style.display = "block"

                currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
                let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
                
                selectedDate = vmCalender.currDate.toString().slice(3,15)
                objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
                objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

                if(objIndexVeg!=-1){
                    vmCalender.allDatesVeg[objIndexVeg].vegCount++
                    vmCalender.dayVegCount = vmCalender.allDatesVeg[objIndexVeg].vegCount
                    currSpan.childNodes[1].attributes[1].value = vmCalender.dayVegCount
                }else{
                    vmCalender.dayVegCount = 1
                    vmCalender.allDatesVeg.push({date:selectedDate, vegCount:1})
                    console.log(vmCalender.allDatesVeg, 'vmCalender.allDatesVeg push')
                    currSpan.innerHTML = ``
                    let nonVegData = 0
                    if (objIndexNonveg!=-1) {
                        nonVegData = vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount
                    }
                    currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="1"></span><span class="material-label mdl-badge nonveg" data-badge="${nonVegData}"></span>`
                    currSpan.style.border = '1px solid #c02425';
                    // currSpan.style.color = 'black';
                }

                var value = parseInt(document.getElementById('calveg').value);
                value = isNaN(value) ? 0 : value;
                value++;
                vmCalender.dayVegCount = value;
            }  

        }

        // minus button click
        $scope.caldveg = function(){
            document.getElementById('finalSubmit').style.display = "block"

            currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
            selectedDate = vmCalender.currDate.toString().slice(3,15)

            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]

            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

            if(objIndexVeg!=-1){
                vmCalender.allDatesVeg[objIndexVeg].vegCount--
                vmCalender.dayVegCount = vmCalender.allDatesVeg[objIndexVeg].vegCount
                if(vmCalender.allDatesVeg[objIndexVeg].vegCount == 0){
                    currSpan.childNodes[1].attributes[0].value = ''
                    currSpan.childNodes[1].attributes[1].value = '0'
                    vmCalender.allDatesVeg.splice(objIndexVeg,1)
                    console.log(vmCalender.allDatesVeg, 'vmCalender.allDatesVeg slipce')
                    if(objIndexNonveg==-1){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                        currSpan.style.removeProperty('border');
                        // currSpan.style.removeProperty('color');
                    }
                }else{
                    currSpan.childNodes[1].attributes[1].value = vmCalender.dayVegCount

                }
            }

                var value = parseInt(document.getElementById('calveg').value);
                if(value>0){vmCalender.vegRem++}else{console.log('value is 0 bro')}
                value = isNaN(value) ? 0 : value;
                value--
                if(value<0){ value=0 }
                vmCalender.dayVegCount = value;


            
        }

        // plus button nonveg
        $scope.calinveg = function(){
            if(vmCalender.nvegRem==0){
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Remaining meals is 0')
                    .hideDelay(2000)
                );
            }else{
                vmCalender.nvegRem--
                document.getElementById('finalSubmit').style.display = "block"

                currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
                let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
                
                selectedDate = vmCalender.currDate.toString().slice(3,15)
                objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
                objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);
                if(objIndexNonveg!=-1){
                    vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount++
                    vmCalender.dayNonvegCount = vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount
                    if(currSpan.childNodes[1].attributes[0].value == 'material-label mdl-badge nonveg'){
                        currSpan.childNodes[1].attributes[1].value = vmCalender.dayNonvegCount
                    }else{
                        currSpan.childNodes[2].attributes[1].value = vmCalender.dayNonvegCount
                    }
                }else{
                    vmCalender.dayNonvegCount = 1
                    vmCalender.allDatesNonveg.push({date:selectedDate, nonvegCount:1})
                    console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg push')
                    let vegCountCurr= 0
                    if (objIndexVeg!=-1) {
                        vegCountCurr = vmCalender.allDatesVeg[objIndexVeg].vegCount;
                    }
                    currSpan.innerHTML = `${vmCalender.currDate.getDate()}<span class="material-label mdl-badge veg" data-badge="${vegCountCurr}"></span>`
                    currSpan.innerHTML += `<span class="material-label mdl-badge nonveg" data-badge="1"></span>`
                    currSpan.style.border = '1px solid #c02425';
                }
                var value = parseInt(document.getElementById('calnveg').value);
                value = isNaN(value) ? 0 : value;
                value++;
                console.log(value,'value')
                console.log(vmCalender.dayNonvegCount,'vmCalender.dayNonvegCount')
                vmCalender.dayNonvegCount = value;
                console.log(vmCalender.dayNonvegCount,'vmCalender.dayNonvegCount')
            }
        }

        // minus nonveg
        $scope.caldnveg = function(){

            var value = parseInt(document.getElementById('calnveg').value);
            if(value>0){vmCalender.nvegRem++}
            value = isNaN(value) ? 0 : value;
            value--;
            if(value<0){value=0}
            vmCalender.dayNonvegCount = value;

            document.getElementById('finalSubmit').style.display = "block"

            currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
            selectedDate = vmCalender.currDate.toString().slice(3,15)
            
            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]

            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

            if(objIndexNonveg!=-1){
                vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount--
                vmCalender.dayNonvegCount = vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount
                if(vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount == 0){
                    console.log(currSpan,'currSpan')
                    if(currSpan.childNodes[1].attributes[0].value == 'material-label mdl-badge nonveg'){
                        currSpan.childNodes[1].attributes[0].value = ''
                        currSpan.childNodes[1].attributes[1].value = '0'
                    }else{
                        currSpan.childNodes[2].attributes[0].value = ''
                        currSpan.childNodes[2].attributes[1].value = '0'
                    }
                    vmCalender.allDatesNonveg.splice(objIndexNonveg,1)
                    console.log(vmCalender.allDatesNonveg, 'vmCalender.allDatesNonveg splice')
                    if(objIndexVeg==-1){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                        currSpan.style.removeProperty('border');
                    }
                }else{
                    currSpan.childNodes[2].attributes[1].value = vmCalender.dayNonvegCount

                }
            }
        }

        $scope.finalSave = function(){
            // console.log('save');
            console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg');
            console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg');
            let finalObj = [{date:vmCalender.startDate.toString().slice(3,15), vegCount:0, nonVegcount:0, subscriptionId:$routeParams.subId}]
            vmCalender.allDatesVeg.map((x, index)=>{
                vmCalender.allDatesNonveg.map((y, index)=>{
                    let finalIndexVeg = finalObj.findIndex(obj=> obj.date == x.date) 
                    let finalIndexNonveg = finalObj.findIndex(obj=> obj.date == y.date)

                    if(x.date == y.date){
                        if(finalIndexVeg!=-1){
                            finalObj[finalIndexVeg].vegCount = x.vegCount
                            finalObj[finalIndexVeg].nonVegcount = y.nonvegCount
                        }
                    }else{
                        if(finalIndexVeg == -1){
                            finalObj.push({date:x.date, vegCount:x.vegCount, nonVegcount:0, subscriptionId:$routeParams.subId})
                        }
                        if(finalIndexNonveg == -1){
                            finalObj.push({date:y.date, vegCount:0, nonVegcount:y.nonvegCount, subscriptionId:$routeParams.subId})
                        }

                    }
                })
                // let data = {subId:subscriptionId ,data:finalObj}
                // console.log(data,'data')
                // $http.post(`/calendarSave`,data).then(function(response){
                //     console.log(response.data,'response')
                // })
                // console.log(finalObj,'finalObjlast')
            }) 
            console.log(finalObj, 'finalObjfist')
            $http.post(`/updateCal`,finalObj).then(function(response){
                console.log(response.date,'response')
            })

        }
        
        $scope.finalCancel = function(){
            console.log('cancel')
            document.getElementById('finalSubmit').style.display = "none"
            console.log(existingDateVeg,'existingDatesVeg')
            console.log(existingDateNonveg,'existingDatesNonveg')
            let cancelObj = [{date:new Date(), vegCount:1, nonvegCount:1}]
            console.log(cancelObj,'')
        }

        $scope.pause = function(){
            console.log('cancel')
            document.getElementById('pauseSub').style.display = "none"
            document.getElementById('resume').style.display = "block"
        }

        $scope.resume = function(){
            console.log('cancel')
            document.getElementById('finalSubmit').style.display = "none"
            console.log(existingDateVeg,'existingDatesVeg')
            console.log(existingDateNonveg,'existingDatesNonveg')
            let cancelObj = [{date:new Date(), vegCount:1, nonvegCount:1}]
            console.log(cancelObj,'')
        }

        $scope.addMore = function(){
            console.log('add')
            console.log(vmCalender.nvegRem,'vmCalender.nvegRem')
            console.log(vmCalender.vegRem,'vmCalender.nvegRem')
            let remObj = {vegRem:vmCalender.nvegRem, nvegRem:vmCalender.vegRem}
            // $http.post(`/updateSubBro/${$routeParams.subId}`, remObj).then(function(response){
                // console.log(response.data,'response')
                $location.path(`/subscribe/${$routeParams.subId}`).search({vegCount:vmCalender.vegCount, 
                    nonvegCount:vmCalender.nonvegCount, 
                    vegRem:vmCalender.vegRem, 
                    nvegRem:vmCalender.nvegRem });
            // })

        }



	}
}
