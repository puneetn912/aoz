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
            subscription = response.data
            console.log(response.data,'response')
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
        // vmCalender.startDate.setDate(vmCalender.startDate.getDate()+1)
        vmCalender.currDate = new Date()
        vmCalender.currDate.setDate(vmCalender.currDate.getDate()+1)
        vmCalender.threeMahead = new Date(vmCalender.currDate)  
        vmCalender.threeMahead = new Date(vmCalender.threeMahead.setMonth(vmCalender.threeMahead.getMonth()+3))  
        console.log(vmCalender.threeMahead,'vmCalender.threeMahead')
        
        vmCalender.currDateHead = vmCalender.startDate.toString().slice(3,15)

        vmCalender.allDatesVeg = []
        vmCalender.allDatesNonveg = []
        
        let existingDateVeg =  [{date: new Date(),vegCount:1}]
        let existingDateNonveg = [{date: new Date(),nonvegCount:1}]

        var pastMonthtoday = `${vmCalender.startDate.getFullYear()}-${vmCalender.startDate.getMonth()}-${vmCalender.startDate.getDate()}`;
        let date = vmCalender.startDate.getDate()
        vmCalender.dayVegCount = 1
        vmCalender.dayNonvegCount = 1  

        $http.post(`/getCal/${$routeParams.subId}`).then(function(response){
            console.log(response.data,'response')
            setTimeout(function(){
                response.data.map((x,i)=>{
                    console.log(x,'x')
                    var nextDay = new Date(x.selected_data);

                    x.veg_count_on_day = parseInt(x.veg_count_on_day)
                    x.nonVeg_count_on_day = parseInt(x.nonVeg_count_on_day)

                    var pastMonthtoday = `${nextDay.getFullYear()}-${nextDay.getMonth()}-${nextDay.getDate()}`;
                    let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]
                    let date = nextDay.getDate()

                    if(x.veg_count_on_day!=0){
                        vmCalender.allDatesVeg.push({date:x.selected_data, vegCount:x.veg_count_on_day})
                    }
                    if(x.nonVeg_count_on_day!=0){
                        vmCalender.allDatesNonveg.push({date:x.selected_data, nonvegCount:x.nonVeg_count_on_day})
                    }

                    dateSpan.innerHTML = `${date} <span class="material-label mdl-badge veg" data-badge="${x.veg_count_on_day}"></span><span class="material-label mdl-badge nonveg" data-badge="${x.nonVeg_count_on_day}"></span>`
                    dateSpan.style.border = '1px solid #c02425';

                    vmCalender.dayVegCount = x.veg_count_on_day
                    vmCalender.dayNonvegCount = x.nonVeg_count_on_day

                })
            }, 1000);
        })

        // update
        let selectedDate = ''
        let objIndexVeg = ''
        let objIndexNonveg = ''
        let currDate = ''

        $scope.some= function(ev){
            console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg')
            console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg')

            document.getElementById('finalSubmit').style.display = "block"
            currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`

            let currTd = document.getElementById(`md-0-month-${currDate}`)
            
            let currSpan = ''
            if(document.getElementById(`md-0-month-${currDate}`)){
                currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
            }
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

        currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
        selectedDate = vmCalender.currDate.toString().slice(3,15)
        
        // minus button veg
        $scope.caldveg = function(){
            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]

            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);                

            if(vmCalender.dayVegCount == 0){
                if(vmCalender.dayNonvegCount == 0){
                    currSpan.innerHTML = vmCalender.currDate.getDate()
                }
                console.log('dont do anything')
            }else{
                vmCalender.dayVegCount--
                vmCalender.vegRem++
                
                if(vmCalender.dayVegCount == 0){
                    if(vmCalender.dayNonvegCount == 0){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                    }
                }
                if(objIndexVeg!=-1){
                    vmCalender.allDatesVeg.splice(objIndexVeg,1)
                    console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg')
                }                
                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
            }
        } 

        // plus veg click - done
        $scope.caliveg = function(){
            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
         
            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

            if(vmCalender.vegRem==0){
                console.log('dont do')
            }else{
                vmCalender.vegRem--
                vmCalender.dayVegCount++

                if(objIndexVeg!=-1){
                    vmCalender.allDatesVeg[objIndexVeg].vegCount = vmCalender.dayVegCount 
                }else{
                    vmCalender.allDatesVeg.push({date:selectedDate, vegCount:1})
                    console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg')
                }
                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
            }
        }

        // plus button nonveg
        $scope.calinveg = function(){
            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
         
            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

            if(vmCalender.nvegRem==0){
                console.log('dont do')
            }else{
                vmCalender.nvegRem--
                vmCalender.dayNonvegCount++

                if(objIndexNonveg!=-1){
                    vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount = vmCalender.dayNonvegCount
                    console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg updated')
                }else{
                    vmCalender.allDatesNonveg.push({date:selectedDate, nonvegCount:1})
                    console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg pushed')
                }
                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
            }
        }

        // minus nonveg
        $scope.caldnveg = function(){
            let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]

            objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
            objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);                

            if(vmCalender.dayNonvegCount == 0){
                if(vmCalender.dayVegCount == 0){
                    currSpan.innerHTML = vmCalender.currDate.getDate()
                }
                console.log('dont do anything')
            }else{
                vmCalender.dayNonvegCount--
                vmCalender.nvegRem++
                
                if(vmCalender.dayNonvegCount == 0){
                    if(vmCalender.dayVegCount == 0){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                    }
                }
                if(objIndexNonveg!=-1){
                    vmCalender.allDatesNonveg.splice(objIndexNonveg,1)
                    console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg splice')
                }
                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
            }
        }

        $scope.finalSave = function(){
            // console.log('save');
            console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg');
            console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg');
            // let finalObj = [{date:vmCalender.startDate.toString().slice(3,15), vegCount:0, nonVegcount:0, subscriptionId:$routeParams.subId}]
            let finalObj = []
            // vmCalender.allDatesVeg.map((x, index)=>{
            //     vmCalender.allDatesNonveg.map((y, index)=>{
            //         let finalIndexVeg = finalObj.findIndex(obj=> obj.date == x.date) 
            //         let finalIndexNonveg = finalObj.findIndex(obj=> obj.date == y.date)
            //         if(x.date == y.date){
            //             if(finalIndexVeg!=-1){
            //                 finalObj[finalIndexVeg].vegCount = x.vegCount
            //                 finalObj[finalIndexVeg].nonVegcount = y.nonvegCount
            //             }
            //         }else{
            //             if(finalIndexVeg == -1){
            //                 finalObj.push({date:x.date, vegCount:x.vegCount, nonVegcount:0, subscriptionId:$routeParams.subId})
            //             }
            //             if(finalIndexNonveg == -1){
            //                 finalObj.push({date:y.date, vegCount:0, nonVegcount:y.nonvegCount, subscriptionId:$routeParams.subId})
            //             }

            //         }
            //     })
            // }) 
            vmCalender.allDatesVeg.map((x, index)=>{
                let finalIndexVeg = finalObj.findIndex(obj=> obj.date == x.date) 
                if(finalIndexVeg!=-1){
                    finalObj[finalIndexVeg].vegCount = x.vegCount
                }else{
                    finalObj.push({date:x.date, vegCount:x.vegCount, nonVegcount:0, subscriptionId:$routeParams.subId})
                }
            })
            vmCalender.allDatesNonveg.map((y, index)=>{
                let finalIndexNonveg = finalObj.findIndex(obj=> obj.date == y.date)
                if(finalIndexNonveg!=-1){
                    finalObj[finalIndexNonveg].nonVegcount = y.nonvegCount
                }else{
                    finalObj.push({date:y.date, vegCount:0, nonVegcount:y.nonvegCount, subscriptionId:$routeParams.subId})
                }
            }) 


            console.log(finalObj, 'finalObjfist')
            $http.post(`/updateCal`,finalObj).then(function(response){
                console.log(response.date,'response')
            })

            let remObj = {vegRemFinal : vmCalender.vegRem, nvegRemFinal : vmCalender.nvegRem }  
            console.log(remObj,'remObj')
            $http.post(`/updateSubBro/${subId}`, remObj).then(function(response){
                console.log(response.data,'response')
            })


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
