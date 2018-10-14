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
        
        let vegMealCount =10
        vmCalender.dayVegCount = 1  
        let nonvegMealCount =12
        vmCalender.dayNonvegCount = 1  

        // let dateFull = Date.today().add(i+1).days().toISOString().slice(0,10)
        // let date = Date.today().add(i+1).days().toISOString().slice(0,2)
        // console.log(dateFull, date, 'date') 
        // console.log(`md-0-month-${dateFull}`)

        let lastDateVeg= ''
        let lastDateNonveg= ''

        //read
        setTimeout(function(){ 
            for(var i=0;i<vegMealCount;i++){
                var day = new Date('Oct 14, 2018');
                var nextDay = new Date(day);
                nextDay.setDate(day.getDate()+i+1);
                var pastMonthtoday = new Date(nextDay.setMonth(nextDay.getMonth() - 1)).toISOString().slice(0,10);
                if(pastMonthtoday.charAt(5)==0){ pastMonthtoday=pastMonthtoday.slice(0, 5) + pastMonthtoday.slice(6); }
                let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]
                let date = pastMonthtoday.substr(pastMonthtoday.length - 2)
                dateSpan.innerHTML = `${date} <span class="material-label mdl-badge veg" data-badge="1">`
                dateSpan.style.background = 'blue';
                dateSpan.style.color = 'white';
                if(i==vegMealCount-1){
                    lastDateVeg = pastMonthtoday
                }
            }
            for(var i=0;i<nonvegMealCount;i++){
                var day1 = new Date('Oct 14, 2018');
                var nextDay1 = new Date(day1);
                nextDay1.setDate(day1.getDate()+i+1);
                var pastMonthtoday1 = new Date(nextDay1.setMonth(nextDay1.getMonth() - 1)).toISOString().slice(0,10);
                if(pastMonthtoday1.charAt(5)==0){ pastMonthtoday1=pastMonthtoday1.slice(0, 5) + pastMonthtoday1.slice(6); }
                let dateSpan1 = document.getElementById(`md-0-month-${pastMonthtoday1}`).childNodes[0]
                dateSpan1.innerHTML += '<span class="material-label mdl-badge nonveg" data-badge="1">';
                dateSpan1.style.background = 'blue';
                dateSpan1.style.color = 'white';
                if(i==nonvegMealCount-1){
                    lastDateNonveg = pastMonthtoday1 
                }
            }
        }, 800);

        // update
        $scope.some= function(){
            document.getElementById('mealCountDisp').style.display ="none"
            document.getElementById('mealCountForm').style.display ="block"
            console.log(vmCalender.startDate,'some')
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