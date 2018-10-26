export default function calenderController() {
	angular.module('cmsApp')
	.controller('calenderController', calenderController);
	calenderController.$inject = ['$scope','$timeout', '$q', '$log','$http','$routeParams'];
	function calenderController($scope,$timeout, $q, $log,$http,$routeParams) {
		var vmCalender = this;
        $scope.$watch('vmCalender.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });
        
        console.log($routeParams.subId,'$routeParams')
        // window.onpopstate = function (e) { window.history.forward(1); }


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
                
                dateSpan.style.background = 'blue';
                dateSpan.style.color = 'white';

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

                dateSpan1.style.background = 'blue';
                dateSpan1.style.color = 'white';
                
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
        $scope.some= function(){
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
                console.log('remaingin 0 bro')
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
                    currSpan.style.color = 'black';
                }

                // old code
                var value = parseInt(document.getElementById('calveg').value);
                value = isNaN(value) ? 0 : value;
                value++;
                document.getElementById('calveg').value = value;
            }  

        }

        // minus button click
        $scope.caldveg = function(){
            vmCalender.vegRem++
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
                        currSpan.style.removeProperty('background');
                        currSpan.style.removeProperty('color');
                    }
                }else{
                    currSpan.childNodes[1].attributes[1].value = vmCalender.dayVegCount

                }
            }
            
            // increment code
                var value = parseInt(document.getElementById('calveg').value);
                value = isNaN(value) ? 0 : value;
                value--;
                 if(value<0){
                  value=0;
                 }

                document.getElementById('calveg').value = value;
        }

        // plus button nonveg
        $scope.calinveg = function(){
            if(vmCalender.nvegRem==0){
                console.log('remaingin 0 bro')
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
                    currSpan.childNodes[2].attributes[1].value = vmCalender.dayNonvegCount
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
                    currSpan.style.background = 'white';
                    currSpan.style.color = 'black';
                }
                var value = parseInt(document.getElementById('calnveg').value);
                value = isNaN(value) ? 0 : value;
                value++;
                document.getElementById('calnveg').value = value;
            }
        }

        // minus nonveg
        $scope.caldnveg = function(){
            vmCalender.nvegRem++
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
                    currSpan.childNodes[2].attributes[0].value = ''
                    currSpan.childNodes[2].attributes[1].value = '0'
                    vmCalender.allDatesNonveg.splice(objIndexNonveg,1)
                    console.log(vmCalender.allDatesNonveg, 'vmCalender.allDatesNonveg splice')
                    if(objIndexVeg==-1){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                        currSpan.style.removeProperty('background');
                        currSpan.style.removeProperty('color');
                    }
                }else{
                    currSpan.childNodes[2].attributes[1].value = vmCalender.dayNonvegCount

                }
            }
            var value = parseInt(document.getElementById('calnveg').value);
            value = isNaN(value) ? 0 : value;
            value--;
             if(value<0){
             value=0; 
             }
            document.getElementById('calnveg').value = value;
            // console.log('ddd',document.getElementById('text').value)
        }

        $scope.finalSave = function(){
            // console.log('save');
            console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg');
            console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg');
            let finalObj = [{date:vmCalender.startDate.toString().slice(3,15), vegCount:0, nonVegcount:0, subscriptionId:subscriptionId}]
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
                            finalObj.push({date:x.date, vegCount:x.vegCount, nonVegcount:0, subscriptionId:subscriptionId})
                        }
                        if(finalIndexNonveg == -1){
                            finalObj.push({date:y.date, vegCount:0, nonVegcount:y.nonvegCount, subscriptionId:subscriptionId})
                        }

                    }
                })
                console.log(finalObj, 'finalObjfist')
                let data = {subId:subscriptionId ,data:finalObj}
                // console.log(data,'data')
                // $http.post(`/calendarSave`,data).then(function(response){
                //     console.log(response.data,'response')
                // })
                // console.log(finalObj,'finalObjlast')
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



	}
}
