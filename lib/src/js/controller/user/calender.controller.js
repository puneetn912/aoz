export default function calenderController() {
	angular.module('cmsApp')
	.controller('calenderController', calenderController);
	calenderController.$inject = ['$scope','$timeout', '$q', '$log'];
	function calenderController($scope,$timeout, $q, $log) {
		var vmCalender = this;
        $scope.$watch('vmCalender.myDate', function (myDate) {
            $log.info(myDate);
            if (myDate){
                console.log('myDate',myDate)
            }
        });

        let vegCount =10
        let nonvegCount =12
        
        vmCalender.vegCount = 10  
        vmCalender.nonvegCount = 12  

        // vmCalender.dayVegCount = 0  
        // vmCalender.dayNonvegCount = 0  
        
        vmCalender.startDate = new Date()
        vmCalender.currDate = new Date()
        vmCalender.currDateHead = vmCalender.startDate.toString().slice(3,15)

        vmCalender.allDatesVeg = []
        vmCalender.allDatesNonveg = []
        
        // let lastDateVeg= ''
        let lastDateNonveg= ''

        vmCalender.allDatesVeg.push({date:vmCalender.startDate.toString().slice(3,15), vegCount:1})
        vmCalender.allDatesNonveg.push({date:vmCalender.startDate.toString().slice(3,15), nonvegCount:1})
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

        // oldCode
            //read
            // setTimeout(function(){
            //     for(var i=0;i<vegCount;i++){
            //         var nextDay = new Date(vmCalender.startDate);
            //         nextDay.setDate(vmCalender.startDate.getDate()+i);
            //         vmCalender.allDatesVeg.push({date:nextDay.toString().slice(3,15), vegCount:1})
                    
            //         var pastMonthtoday =  `${nextDay.getFullYear()}-${nextDay.getMonth()}-${nextDay.getDate()}`;
            //         let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]
            //         let date = nextDay.getDate()
                    
            //         dateSpan.innerHTML = `${date} <span class="material-label mdl-badge veg" data-badge="1">`
            //         vmCalender.dayVegCount = 1
                    
            //         dateSpan.style.background = 'blue';
            //         dateSpan.style.color = 'white';

            //         if(i==vegCount-1){
            //             vmCalender.lastDateVeg = pastMonthtoday
            //         }
            //     }
            //     for(var i=0;i<nonvegCount;i++){
            //         var nextDay1 = new Date(vmCalender.startDate);
            //         nextDay1.setDate(vmCalender.startDate.getDate()+i);
            //         vmCalender.allDatesNonveg.push({date:nextDay1.toString().slice(3,15), nonvegCount:1})
                    
            //         var pastMonthtoday1 =  `${nextDay1.getFullYear()}-${nextDay1.getMonth()}-${nextDay1.getDate()}`;
            //         let dateSpan1 = document.getElementById(`md-0-month-${pastMonthtoday1}`).childNodes[0]

            //         dateSpan1.innerHTML += '<span class="material-label mdl-badge nonveg" data-badge="1">';
            //         vmCalender.dayNonvegCount = 1

            //         dateSpan1.style.background = 'blue';
            //         dateSpan1.style.color = 'white';
                    
            //         if(i==nonvegCount-1){
            //             lastDateNonveg = pastMonthtoday1
            //         }
            //     }
            // }, 800);

        // update
        let selectedDate = ''
        let objIndexVeg = ''
        let objIndexNonveg = ''
        let currDate = ''

        //on date click
            // get current date veg count
            // get current date nonveg count
        $scope.some= function(){
            currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
            selectedDate = vmCalender.currDate.toString().slice(3,15)
            vmCalender.currDateHead = selectedDate

            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

            if(objIndexVeg==-1){
                vmCalender.dayVegCount = 0
                // old code
                    // currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
                    // var pastMonthSelectedDate = currDate
                    // let selectedDateSpan = document.getElementById(`md-0-month-${pastMonthSelectedDate}`).childNodes[0]
                    // dateSpan1.innerHTML += '<span class="material-label mdl-badge nonveg" data-badge="0">';
                    // vmCalender.dayNonvegCount = 1
                    // dateSpan1.style.background = 'blue';
                    // dateSpan1.style.color = 'white';
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
            // reduce veg count in  last date - done
            // if 0 the clear class - done
            // incr count for curr date - done
            // reduce lastvegDate - done
            // calculate remaining veg count - 
            // if veg and nonveg value is 0 then normalize the date span - done
        $scope.caliveg = function(){   
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
                console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg')
                console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg')
                currSpan.innerHTML = ``
                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="1"></span>`
                if (objIndexNonveg!=-1) {
                    currSpan.innerHTML += `<span class="material-label mdl-badge nonveg" data-badge="${vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount}"></span>`;
                }
                currSpan.style.background = 'rgb(63, 81, 181)';
                currSpan.style.color = 'white';
            }

            // old code

                // badge value of last date
                // if(lastVegSpan.childNodes[1].attributes[1].value == 1){
                //     lastVegSpan.childNodes[1].attributes[0].value = ''      //class value of badge
                //     let lastVegDate = new Date(vmCalender.lastDateVeg)
                    
                //     vmCalender.lastDateVeg = `${lastVegDate.getFullYear()}-${lastVegDate.getMonth()+1}-${lastVegDate.getDate()-1}`
                //     console.log(vmCalender.lastDateVeg, 'vmCalender.lastVegDate')

                // }

                // normalize span
                // if(lastVegSpan.childNodes[1].attributes[1].value == 0 && lastVegSpan.childNodes[2].attributes[1].value== 0 ){
                //     lastVegSpan.childNodes[1].attributes[0].value == '';
                //     lastVegSpan.childNodes[2].attributes[0].value == '';
                //     dateSpan1.style.background = 'white';
                //     dateSpan1.style.color = 'black';
                // }


                // if (lastDateSpan.childNodes[1].attributes[1].value == 0) {
                //      lastDateSpan.childNodes[1].attributes[1].value++

                // } else {
                // lastDateSpan.childNodes[1].class = ''
                // }
                // lastDateSpan.innerHTML = new Date(lastDateVeg).getDate();

            var value = parseInt(document.getElementById('calveg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('calveg').value = value;

        }

        // minus button click
            // incr veg count in date
            // if class is empty add class
            // decr count for curr date
        $scope.caldveg = function(){
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
                    if(objIndexNonveg==-1){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                        currSpan.style.removeProperty('background');
                        currSpan.style.removeProperty('color');
                    }
                }else{
                    currSpan.childNodes[1].attributes[1].value = vmCalender.dayVegCount

                }
            }else{
                // old code
                    // vmCalender.dayVegCount = 1
                    // vmCalender.allDatesVeg.push({date:selectedDate, vegCount:1})
                    // currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="1"></span>`
                    // currSpan.style.background = 'blue';
                    // currSpan.style.color = 'white';
            }
            // old code
                // if(currNonvegSpan.childNodes[2]){
                    // console.log(currNonvegSpan.childNodes,'currNonvegSpan.childNodes[2]')
                    // currNonvegSpan.childNodes[2].attributes[1].value--
                // }
                // }else{
                //     currVegSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="1"></span>`
                //     currVegSpan.style.background = 'blue';
                //     currVegSpan.style.color = 'white';
                // }


                // material-label mdl-badge veg class
                // let lastNonvegSpan = document.getElementById(`md-0-month-${lastDateNonveg}`).childNodes[0]
                // console.log(lastNonvegSpan,'lastNonvegSpan')
                // lastNonvegSpan.childNodes[1].attributes[0].value = 'material-label mdl-badge veg class'
                // lastNonvegSpan.childNodes[1].attributes[1].value = 'material-label mdl-badge veg class'

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

        



	}
}

// old code
    // class="material-label mdl-badge" data-badge="4"
    // <span class="material-label mdl-badge nonveg" data-badge="3">

    // var day = new Date('Apr 30, 2000');
    // console.log(day, 'day'); // Apr 30 2000

    // var nextDay = new Date(day);
    // nextDay.setDate(day.getDate()+1);
    // console.log(nextDay,'nextDay');