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

        vmCalender.dayVegCount = 0  
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
                }
            }
            for(var i=0;i<nonvegCount;i++){
                var nextDay1 = new Date(vmCalender.startDate);
                nextDay1.setDate(vmCalender.startDate.getDate()+i);
                
                vmCalender.allDatesNonveg.push({date:nextDay1.toString().slice(3,15), nonvegCount:1})
                
                var pastMonthtoday1 = new Date(nextDay1.setMonth(nextDay1.getMonth() - 1)).toISOString().slice(0,10);
                if(pastMonthtoday1.charAt(5)==0){ pastMonthtoday1=pastMonthtoday1.slice(0, 5) + pastMonthtoday1.slice(6); }
                
                let dateSpan1 = document.getElementById(`md-0-month-${pastMonthtoday1}`).childNodes[0]
                dateSpan1.innerHTML += '<span class="material-label mdl-badge nonveg" data-badge="1">';
                vmCalender.dayNonvegCount = 1
                dateSpan1.style.background = 'blue';
                dateSpan1.style.color = 'white';
                
                if(i==nonvegCount-1){
                    lastDateNonveg = pastMonthtoday1
                }
            }
        }, 800);

        // update
        let selectedDate = ''
        let objIndexVeg = ''
        let objIndexNonveg = ''
        $scope.some= function(){
            let startDateHead =document.getElementById('startDateHead')
            let currDateHead =document.getElementById('currDateHead')
            
            if(startDateHead.style.display != 'none'){startDateHead.style.display = 'none';currDateHead.style.display = 'block';}
            
            console.log(vmCalender.allDatesVeg,'allDatesVeg')
            console.log(vmCalender.allDatesNonveg,'allDatesVeg')
            
            selectedDate = vmCalender.currDate.toString().slice(3,15)
            
            vmCalender.currDateHead = selectedDate

            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);
            console.log(objIndexVeg,objIndexNonveg ,'objIndex')

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


            // vmCalender.allDatesVeg[objIndex].vegCount = 2
            // console.log(vmCalender.allDatesVeg,'data')
        }


        $scope.caliveg = function()
        {
            var value = parseInt(document.getElementById('calveg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('calveg').value = value;
            // console.log('cccc',document.getElementById('text').value)
        }
        $scope.caldveg = function()
        {
            var value = parseInt(document.getElementById('calveg').value);
            value = isNaN(value) ? 0 : value;
            value--;
             if(value<0){
             value =0; 
             }
            document.getElementById('calveg').value = value;
            // console.log('ddd',document.getElementById('text').value)
        }


        $scope.calinveg = function()
        {
            var value = parseInt(document.getElementById('calnveg').value);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('calnveg').value = value;
            // console.log('cccc',document.getElementById('text').value)
        }
        $scope.caldnveg = function()
        {
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

// class="material-label mdl-badge" data-badge="4"
// <span class="material-label mdl-badge nonveg" data-badge="3">

// var day = new Date('Apr 30, 2000');
// console.log(day, 'day'); // Apr 30 2000

// var nextDay = new Date(day);
// nextDay.setDate(day.getDate()+1);
// console.log(nextDay,'nextDay');