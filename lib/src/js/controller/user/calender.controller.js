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
        vmCalender.vegCount = 10  
        vmCalender.dayVegCount = 0  
        let nonvegCount =12
        vmCalender.nonvegCount = 12  
        vmCalender.dayNonvegCount = 0  
        vmCalender.startDate = new Date()

        vmCalender.allDatesVeg = []
        vmCalender.allDatesNonveg = []
        let lastDateVeg= ''
        let lastDateNonveg= ''

        //read
        setTimeout(function(){
            for(var i=0;i<vegCount;i++){
                var nextDay = new Date(vmCalender.startDate);
                nextDay.setDate(vmCalender.startDate.getDate()+i);
                vmCalender.allDatesVeg.push({date:nextDay.toString().slice(3,15), vegCount:1})
                var pastMonthtoday = new Date(nextDay.setMonth(nextDay.getMonth() - 1)).toISOString().slice(0,10);
                if(pastMonthtoday.charAt(5)==0){ pastMonthtoday=pastMonthtoday.slice(0, 5) + pastMonthtoday.slice(6); }
                let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]
                let date = pastMonthtoday.substr(pastMonthtoday.length - 2)
                dateSpan.innerHTML = `${date} <span class="material-label mdl-badge veg" data-badge="1">`
                vmCalender.dayVegCount = 1
                dateSpan.style.background = 'blue';
                dateSpan.style.color = 'white';
                if(i==vegCount-1){
                    lastDateVeg = pastMonthtoday
                    // console.log(vmCalender.takenDatesVeg,'takenDatesVeg')
                    // console.log(vmCalender.allDatesVeg,'allDatesVeg')
                }
            }
            for(var i=0;i<nonvegCount;i++){
                var day1 = new Date('Oct 14, 2018');
                var nextDay1 = new Date(vmCalender.startDate);
                nextDay1.setDate(vmCalender.startDate.getDate()+i);
                vmCalender.allDatesNonveg.push({date:nextDay.toString().slice(3,15), nonvegCount:1})
                var pastMonthtoday1 = new Date(nextDay1.setMonth(nextDay1.getMonth() - 1)).toISOString().slice(0,10);
                if(pastMonthtoday1.charAt(5)==0){ pastMonthtoday1=pastMonthtoday1.slice(0, 5) + pastMonthtoday1.slice(6); }
                let dateSpan1 = document.getElementById(`md-0-month-${pastMonthtoday1}`).childNodes[0]
                dateSpan1.innerHTML += '<span class="material-label mdl-badge nonveg" data-badge="1">';
                vmCalender.dayNonvegCount = 1
                dateSpan1.style.background = 'blue';
                dateSpan1.style.color = 'white';
                if(i==nonvegCount-1){
                    lastDateNonveg = pastMonthtoday1
                    // console.log(vmCalender.takenDatesNonveg,'takenDatesNonveg')
                    // console.log(vmCalender.allDatesNonveg,'allDatesNonveg')

                }
            }
        }, 800);

        // update
        let selectedDate = ''
        $scope.some= function(){
            let startDateHead =document.getElementById('startDateHead')
            let currDateHead =document.getElementById('currDateHead')
            if(startDateHead.style.display != 'none'){startDateHead.style.display = 'none';currDateHead.style.display = 'block';}
            // console.log(vmCalender.currDate,'some')
            selectedDate = vmCalender.currDate
            vmCalender.currDateHead = vmCalender.currDate.toString().slice(3,15)
            // let newEntry = {date:vmCalender.currDate.toString().slice(3,15),}
            let objIndex = vmCalender.allDatesVeg.findIndex((obj => obj.date == ' Oct 15 2018'));
            vmCalender.allDatesVeg[objIndex].vegCount = 2
            console.log(vmCalender.allDatesVeg,'data')

        }



	}
}

// class="material-label mdl-badge" data-badge="4"
// <span class="material-label mdl-badge nonveg" data-badge="3">

// var day = new Date('Apr 30, 2000');
// console.log(day, 'day'); // Apr 30 2000

// var nextDay = new Date(day);
// nextDay.setDate(day.getDate()+1);
// console.log(nextDay,'nextDay');