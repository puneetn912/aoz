export default function calenderController() {
	angular.module('cmsApp')
	.controller('calenderController', calenderController);
	calenderController.$inject = ['$scope','$timeout', '$q', '$log','$http'];
	function calenderController($scope,$timeout, $q, $log,$http) {
		var vmCalender = this;
        $scope.$watch('vmCalender.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        let vegCount =10
        let nonvegCount =12

        let subscriptionId = '1234qwer'
        
        vmCalender.vegCount = 10  
        vmCalender.nonvegCount = 12  

        vmCalender.startDate = new Date()
        vmCalender.currDate = new Date()
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


        setTimeout(function(){
            let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]
            dateSpan.innerHTML = `${date}<span class="material-label mdl-badge veg" data-badge="1"></span><span class="material-label mdl-badge nonveg" data-badge="1"></span>`
            dateSpan.style.background = 'rgb(63, 81, 181)';
            dateSpan.style.color = 'white';
        }, 800);

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
                currSpan.style.background = 'rgb(63, 81, 181)';
                currSpan.style.color = 'white';
            }

            // old code
            var value = parseInt(document.getElementById('calveg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('calveg').value = value;

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
                 value =0; 
                 }
                document.getElementById('calveg').value = value;
        }

        // plus button nonveg
        $scope.calinveg = function(){
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
                currSpan.style.background = 'rgb(63, 81, 181)';
                currSpan.style.color = 'white';
            }
            var value = parseInt(document.getElementById('calnveg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('calnveg').value = value;
        }

        // minus nonveg
        $scope.caldnveg = function(){
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
             value =0; 
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
                        console.log(finalObj, 'finalObj')


                    }
                })
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
