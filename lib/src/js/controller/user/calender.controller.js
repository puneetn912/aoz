export default function calenderController() {
	angular.module('cmsApp')
	.controller('calenderController', calenderController);
	calenderController.$inject = ['$scope','$timeout', '$q', '$log','$http','$routeParams','$location','$mdDialog','$mdToast','$cookies'];
	function calenderController($scope,$timeout, $q,$log,$http,$routeParams,$location,$mdDialog,$mdToast,$cookies) {
		var vmCalender = this;

        let cookies = $cookies.getAll()
        // //console.log(cookies,'cookiesCal')
        vmCalender.showPause = true
        // if(cookies.catererVegId){
            //console.log('asdf')
        // }else{
            //console.log('asd')
        // }

        // document.getElementById('calContent').classList.add("disableDiv");
        vmCalender.updateBtn = 'Edit'
        document.getElementById('countBtn').classList.add("disableDiv");
        let countBtnClass = document.getElementById('countBtn').classList 
        let countBtnArr = []
        countBtnClass.forEach( function(value, key, listObj) { countBtnArr.push(value) }, "arg" );
        // //console.log(countBtnArr,'countBtnArr')

        let vegCount =0, nonvegCount =0, subscription = '', subId = $routeParams.subId, vegRemaining = 0, nvegRemaining = 0

        let fullVegRem = ''
        let fullNvegRem = ''
        
        $http.post(`/getSub/${$routeParams.subId}`).then(function(response){if(response.data){
            // //console.log(response.data,'subs get')
            if(response.data.account_status == false){
                document.getElementById('finalSubmit').className = 'cal-btn-div disableDiv'
                 var confirm4 = $mdDialog.alert({escapeToClose :false})
                      .title('Subscription Paused!')
                      .textContent('Please hit resume to resume subscription')
                      .ok('Sure')

                $mdDialog.show(confirm4).then(function() {
                    // //console.log('Gotcha')
                });
                vmCalender.pauseBtn = 'Resume Subscription'
                // vmCalender.showPause = false
            }else{
                vmCalender.pauseBtn = 'Pause Subscription'
            }
            subscription = response.data

            $cookies.put('apt_id',response.data.apartment_id)
            $cookies.put('apartment_name',response.data.apartment_name)
            $cookies.put('tower_name',response.data.tower_name)
            $cookies.put('subStatus',response.data.status)
            // $cookies.put('name',response.data.user_id.name)
            // $cookies.put('email',response.data.user_id.email)
            // $cookies.put('doorNo',response.data.user_id.door_no)
            
            vmCalender.subscription = response.data
            vmCalender.userData = response.data.user_id
            vegCount = subscription.veg_count
            nonvegCount = subscription.nonveg_count
            vmCalender.vegRem = subscription.veg_remain
            vmCalender.nvegRem = subscription.nonveg_remain

            fullVegRem = vmCalender.vegRem
            fullNvegRem = vmCalender.nvegRem

            vmCalender.vegCount = vegCount
            vmCalender.totalVegCount = subscription.totalVegCount
            vmCalender.totalNvegCount = subscription.totalNvegCount
            vmCalender.nonvegCount = nonvegCount
        }else{
            var confirm = $mdDialog.confirm().title('Attention').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
            $mdDialog.show(confirm).then(function() {
                $location.path(`/`) 
            });
        }})


        vmCalender.startDate = new Date(cookies.payDate)   
        // vmCalender.startDate = new Date("Jan 2 2019")   //for pre launch
        vmCalender.currDate = new Date()
        vmCalender.threeMahead = new Date(vmCalender.startDate)  
        vmCalender.threeMahead = new Date(vmCalender.threeMahead.setMonth(vmCalender.threeMahead.getMonth()+3))  
        vmCalender.currDateHead = vmCalender.startDate.toString().slice(3,15)

        vmCalender.allDatesVeg = []
        vmCalender.allDatesNonveg = []

        var pastMonthtoday = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`;
        let date = vmCalender.currDate.getDate()
        vmCalender.dayVegCount = 0
        vmCalender.dayNonvegCount = 0

        // update
        let selectedDate = ''
        let objIndexVeg = ''
        let objIndexNonveg = ''
        let currDate = ''

        currDate = `${vmCalender.currDate.getFullYear()}-${vmCalender.currDate.getMonth()}-${vmCalender.currDate.getDate()}`
        selectedDate = vmCalender.currDate.toString().slice(3,15)
        
        let setTime = new Date()
        let setDate = new Date()
        setDate.setHours(0,0,0,0)
        setTime.setHours(15,0,0,0)

        $http.post(`/getCal/${$routeParams.subId}`).then(function(response){if(response.data){
            // //console.log(response.data,'getCal')
            vmCalender.cal = response.data
            if(response.data.length > 0){
                if(response.data[0].selected_data != 'noData'){
                    setTimeout(function(){
                        let vegDayCount = parseInt(response.data[0].veg_count_on_day)
                        let nvegDayCount = parseInt(response.data[0].nonVeg_count_on_day)
                        vmCalender.dayVegCount = vegDayCount
                        vmCalender.dayNonvegCount = nvegDayCount

                        if(!subscription.user_id.door_no || !subscription.user_id.name){
                            var confirm = $mdDialog.confirm()
                                  .title('Profile is not upto date')
                                  .textContent('Please update your profile, its mandatory for delivery')
                                  .ariaLabel('Lucky day')
                                  .ok('Update Now')

                            $mdDialog.show(confirm).then(function() {
                                $location.path(`/profile/${$routeParams.subId}`) 
                            }, function() {
                              $scope.status = 'You decided to keep your debt.';
                            });
                        }

                        response.data.map((x,i)=>{
                            var nextDay = new Date(x.selected_data);
                            if(setDate<=nextDay){
                                // //console.log('its in')
                                x.veg_count_on_day = parseInt(x.veg_count_on_day)
                                x.nonVeg_count_on_day = parseInt(x.nonVeg_count_on_day)

                                var pastMonthtoday = `${nextDay.getFullYear()}-${nextDay.getMonth()}-${nextDay.getDate()}`;
                                if(document.getElementById(`md-0-month-${pastMonthtoday}`)){
                                    let dateSpan = document.getElementById(`md-0-month-${pastMonthtoday}`).childNodes[0]

                                    let date = nextDay.getDate()

                                    if(x.veg_count_on_day!=0){
                                        vmCalender.allDatesVeg.push({date:x.selected_data, vegCount:x.veg_count_on_day})
                                    }
                                    if(x.nonVeg_count_on_day!=0){
                                        vmCalender.allDatesNonveg.push({date:x.selected_data, nonvegCount:x.nonVeg_count_on_day})
                                    }

                                    dateSpan.innerHTML = `${date}<span class="material-label mdl-badge veg" data-badge="${x.veg_count_on_day}"></span><span class="material-label mdl-badge nonveg" data-badge="${x.nonVeg_count_on_day}"></span>`
                                    dateSpan.style.border = '1px solid #c02425';
                                }else{
                                    document.getElementById('loader').style.display = 'block'
                                    window.location.reload()
                                }
                            }
                        })
                    }, 1000);
                }
            }else{
                setTimeout(function(){
                    // //console.log(vmCalender.subscription,'vmCalender.subscription')
                    // if(vmCalender.subscription.account_status == true){
                    //     vmCalender.showPause = true
                    // }
                }, 1000);
                // var confirm = $mdDialog.confirm().title('Attention').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
                // $mdDialog.show(confirm).then(function() {
                //     // angular.forEach(cookies, function (cookie, key) {
                //     //     $cookies.remove(key)
                //     // });
                //     $location.path(`/`)       
                // });                
            }
        }})

        $scope.some= function(ev){
            // //console.log(fullVegRem,'fullVegRem')
            // //console.log(fullNvegRem,'fullNvegRem')

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

            // //console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg')
            // //console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg')
        }
        // plus - minus
            // minus button veg
            $scope.caldveg = function(){
                let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]

                objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
                objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

                let timeCheck = vmCalender.currDate
                timeCheck = timeCheck.setHours(new Date().getHours(),new Date().getMinutes())
                timeCheck = new Date(timeCheck)

                if(vmCalender.dayVegCount == 0){
                    if(vmCalender.dayNonvegCount == 0){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                    }
                }else{
                    if(new Date(timeCheck).toString().slice(4,15) == new Date(setTime.setDate(setTime.getDate() )).toString().slice(4,15)){
                        if(timeCheck < setTime ){
                            vmCalender.dayVegCount--
                            vmCalender.vegRem++
                            
                            if(vmCalender.dayVegCount == 0){
                                if(vmCalender.dayNonvegCount == 0){
                                    currSpan.innerHTML = vmCalender.currDate.getDate()
                                }else{
                                    currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                                }
                            }else{
                                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`

                            }
                            if(objIndexVeg!=-1){
                                if(vmCalender.allDatesVeg[objIndexVeg].vegCount>1){
                                    vmCalender.allDatesVeg[objIndexVeg].vegCount = vmCalender.dayVegCount
                                }else if(vmCalender.allDatesVeg[objIndexVeg].vegCount==1){
                                    vmCalender.allDatesVeg.splice(objIndexVeg,1)
                                }
                            }                
                        }else{
                            $mdToast.show( $mdToast.simple().textContent(`Its past 3 PM today, You can't edit today's date`).hideDelay(2000) );    
                        }
                    }else{
                        vmCalender.dayVegCount--
                        vmCalender.vegRem++
                        
                        if(vmCalender.dayVegCount == 0){
                            if(vmCalender.dayNonvegCount == 0){
                                currSpan.innerHTML = vmCalender.currDate.getDate()
                            }else{
                                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                            }
                        }else{
                            currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                        }
                        if(objIndexVeg!=-1){
                            if(vmCalender.allDatesVeg[objIndexVeg].vegCount>1){
                                vmCalender.allDatesVeg[objIndexVeg].vegCount = vmCalender.dayVegCount
                            }else if(vmCalender.allDatesVeg[objIndexVeg].vegCount==1){
                                vmCalender.allDatesVeg.splice(objIndexVeg,1)
                            }
                        }                
                    }
                }
            } 
            // plus veg click - done
            $scope.caliveg = function(){
                let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]

                objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
                objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

                let timeCheck = vmCalender.currDate
                timeCheck = timeCheck.setHours(new Date().getHours(),new Date().getMinutes())
                timeCheck = new Date(timeCheck)

                if(vmCalender.vegRem==0){
                   $mdToast.show( $mdToast.simple().textContent('Remaining Meals is 0').hideDelay(2000) );
                }else{
                    if( new Date(timeCheck).toString().slice(4,15) == new Date(setTime.setDate(setTime.getDate() )).toString().slice(4,15) ){
                        if(timeCheck < setTime ){
                            vmCalender.vegRem--
                            vmCalender.dayVegCount++

                            if(objIndexVeg!=-1){
                                vmCalender.allDatesVeg[objIndexVeg].vegCount = vmCalender.dayVegCount 
                            }else{
                                vmCalender.allDatesVeg.push({date:selectedDate, vegCount:1})
                            }
                            currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`                        
                        }else{
                            $mdToast.show( $mdToast.simple().textContent('Its past 3 PM today').hideDelay(2000) );    
                        }
                    }else{
                        vmCalender.vegRem--
                        vmCalender.dayVegCount++

                        if(objIndexVeg!=-1){
                            vmCalender.allDatesVeg[objIndexVeg].vegCount = vmCalender.dayVegCount 
                        }else{
                            vmCalender.allDatesVeg.push({date:selectedDate, vegCount:1})
                        }
                        currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                    }
                    
                }
            }
            // plus button nonveg
            $scope.calinveg = function(){
                let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]
             
                objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
                objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

                let timeCheck = vmCalender.currDate
                timeCheck = timeCheck.setHours(new Date().getHours(),new Date().getMinutes())
                timeCheck = new Date(timeCheck)

                if(vmCalender.nvegRem==0){
                    $mdToast.show( $mdToast.simple().textContent('Remaining Meals is 0').hideDelay(2000) );
                }else{
                    if(new Date(timeCheck).toString().slice(4,15) == new Date(setTime.setDate(setTime.getDate() )).toString().slice(4,15) ){
                        if(timeCheck < setTime ){
                            vmCalender.nvegRem--
                            vmCalender.dayNonvegCount++

                            if(objIndexNonveg!=-1){
                                vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount = vmCalender.dayNonvegCount
                            }else{
                                vmCalender.allDatesNonveg.push({date:selectedDate, nonvegCount:1})
                            }
                            currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                        }else{
                            $mdToast.show( $mdToast.simple().textContent('Its past 3 PM today').hideDelay(2000) );    
                        }
                    }else{
                        vmCalender.nvegRem--
                        vmCalender.dayNonvegCount++

                        if(objIndexNonveg!=-1){
                            vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount = vmCalender.dayNonvegCount
                        }else{
                            vmCalender.allDatesNonveg.push({date:selectedDate, nonvegCount:1})
                        }
                        currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                    }


                }
            }
            // minus nonveg
            $scope.caldnveg = function(){
                let currSpan = document.getElementById(`md-0-month-${currDate}`).childNodes[0]

                objIndexVeg = vmCalender.allDatesVeg.findIndex(obj => obj.date == selectedDate);
                objIndexNonveg = vmCalender.allDatesNonveg.findIndex(obj => obj.date == selectedDate);

                let timeCheck = vmCalender.currDate
                timeCheck = timeCheck.setHours(new Date().getHours(),new Date().getMinutes())
                timeCheck = new Date(timeCheck)                

                if(vmCalender.dayNonvegCount == 0){
                    if(vmCalender.dayVegCount == 0){
                        currSpan.innerHTML = vmCalender.currDate.getDate()
                    }
                }else{
                    if(new Date(timeCheck).toString().slice(4,15) == new Date(setTime.setDate(setTime.getDate() )).toString().slice(4,15)){
                        if(timeCheck < setTime ){
                            vmCalender.dayNonvegCount--
                            vmCalender.nvegRem++
                            
                            if(vmCalender.dayNonvegCount == 0){
                                if(vmCalender.dayVegCount == 0){
                                    currSpan.innerHTML = vmCalender.currDate.getDate()
                                }else{
                                    currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                                }
                            }else{
                                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`    
                            }
                            if(objIndexNonveg!=-1){
                                if(vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount>1){
                                    vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount = vmCalender.dayNonvegCount 
                                }else{
                                    vmCalender.allDatesNonveg.splice(objIndexNonveg,1)
                                }
                            }
                                                                            
                        }else{
                            $mdToast.show( $mdToast.simple().textContent('Its past 3 PM today').hideDelay(2000) );    
                        }
                    }else{
                        vmCalender.dayNonvegCount--
                        vmCalender.nvegRem++
                        
                        if(vmCalender.dayNonvegCount == 0){
                            if(vmCalender.dayVegCount == 0){
                                currSpan.innerHTML = vmCalender.currDate.getDate()
                            }else{
                                currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                            }
                        }else{
                            currSpan.innerHTML = `${vmCalender.currDate.getDate()} <span class="material-label mdl-badge veg" data-badge="${vmCalender.dayVegCount}"></span><span class="material-label mdl-badge nonveg" data-badge="${vmCalender.dayNonvegCount}"></span>`
                        }
                        if(objIndexNonveg!=-1){
                            if(vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount>1){
                                vmCalender.allDatesNonveg[objIndexNonveg].nonvegCount = vmCalender.dayNonvegCount 
                            }else{
                                vmCalender.allDatesNonveg.splice(objIndexNonveg,1)
                            }
                        }

                    }
                }
            }

        // updateCal
        vmCalender.isProfileEnabled = true
        vmCalender.isAddEnabled = true
        vmCalender.djLinkOn = true
        vmCalender.menuBtn = false

        $scope.finalSave = function(){
            if(countBtnArr.indexOf('disableDiv')==-1){
                let finalObj = []
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                      .title('Are you sure you want to update calendar?')
                      .ariaLabel('Lucky day')
                      .ok('Update')
                      .cancel('Cancel');

                $mdDialog.show(confirm).then(function() {

                    vmCalender.allDatesVeg.map((x, index)=>{
                        let finalIndexVeg = finalObj.findIndex(obj=> obj.date == x.date) 
                        if(finalIndexVeg!=-1){
                            finalObj[finalIndexVeg].vegCount = x.vegCount
                        }else{
                            finalObj.push({
                                date:x.date, 
                                vegCount:x.vegCount, 
                                nonVegcount:0, 
                                subscriptionId:$routeParams.subId,
                                apartment_id:subscription.apartment_id,
                                user_id:subscription.user_id._id,
                                caterer_veg_id:cookies.catererVegId,
                                caterer_nonveg_id:cookies.catererNvegId
                            })
                        }
                    })
                    vmCalender.allDatesNonveg.map((y, index)=>{
                        let finalIndexNonveg = finalObj.findIndex(obj=> obj.date == y.date)
                        if(finalIndexNonveg!=-1){
                            finalObj[finalIndexNonveg].nonVegcount = y.nonvegCount
                        }else{
                            finalObj.push({
                                date:y.date, 
                                vegCount:0, 
                                nonVegcount:y.nonvegCount, 
                                subscriptionId:$routeParams.subId,
                                apartment_id:subscription.apartment_id,
                                user_id:subscription.user_id._id,
                                caterer_veg_id:cookies.catererVegId,
                                caterer_nonveg_id:cookies.catererNvegId
                            })
                        }
                    }) 

                    if(finalObj.length==0){
                        finalObj.push({subId : subscription._id,
                            userId : subscription.user_id._id,
                            apartment_id:subscription.apartment_id,
                            selected_data:'noData'
                        }) 
                    }
                    // //console.log(finalObj, 'finalObjfist')
                    fullVegRem = vmCalender.vegRem
                    fullNvegRem = vmCalender.nvegRem
                    let remObj = {vegRemFinal : vmCalender.vegRem, nvegRemFinal : vmCalender.nvegRem }  
                    $http.post(`/updateCal`,finalObj).then(function(response){
                        $http.post(`/updateSubBro/${subId}`, remObj).then(function(response){
                            $mdToast.show( $mdToast.simple().textContent('Calendar has been Updated').hideDelay(2000) );
                            window.location.reload()
                        })
                    })
                    document.getElementById('countBtn').classList.add("disableDiv");
                    countBtnArr = []
                    countBtnClass.forEach( function(value, key, listObj) { countBtnArr.push(value) }, "arg" );
                    
                    vmCalender.updateBtn = 'Edit'
                    vmCalender.menuBtn = false
                    vmCalender.isProfileEnabled = true
                    vmCalender.djLinkOn = true
                    vmCalender.isAddEnabled = true
                }, function() {
                    // //console.log('Ok cool')
                    document.getElementById('countBtn').classList.add("disableDiv");
                    countBtnArr = []
                    countBtnClass.forEach( function(value, key, listObj) { countBtnArr.push(value) }, "arg" );
                    
                    vmCalender.updateBtn = 'Edit'
                    vmCalender.menuBtn = false
                    vmCalender.isProfileEnabled = true
                    vmCalender.djLinkOn = true
                    vmCalender.isAddEnabled = true
                });
            }else{
                document.getElementById('countBtn').classList.remove("disableDiv");
                countBtnArr = []
                countBtnClass.forEach( function(value, key, listObj) { countBtnArr.push(value) }, "arg" );
                // //console.log(countBtnArr, 'countBtnArr aftererrrrasdfasdf')

                vmCalender.updateBtn = 'Update'
                vmCalender.menuBtn = true
                vmCalender.isProfileEnabled = false
                vmCalender.djLinkOn = false
                vmCalender.isAddEnabled = false
            }
        }
        $scope.pause = function(){
            if(vmCalender.subscription.account_status == false){
                // //console.log('resuming')
                $http.post(`/resumeSub/${vmCalender.subscription._id}`).then(function(response){if(response.data){
                    // //console.log(response.data,'sub aft resume')
                    vmCalender.pauseBtn = 'Pause Subscription'
                    window.location.reload()
                    vmCalender.subscription.account_status = true
                    // $mdToast.show( $mdToast.simple().textContent('Subscription has been resumed').hideDelay(2000) );
                }})
                document.getElementById('finalSubmit').className = 'cal-btn-div'
            }else{
                // //console.log('pausing')
                let dataToBeRemoved = []
                // //console.log(vmCalender.cal,'<vmCalender></vmCalender>')
                let border = new Date()
                border.setHours(15,0,0,0)
                let rightNow = new Date() 
                vmCalender.cal.map((x,i)=>{
                    let calDate = new Date(x.selected_data)
                    // //console.log(calDate, 'calDate')
                    // //console.log(border, 'border')
                    if(rightNow < border){
                        // //console.log('its before border')
                        dataToBeRemoved.push(x)
                    }else{
                        // //console.log('its past border')
                    }
                })
                // //console.log(dataToBeRemoved,'datarem')

                //console.log(vmCalender.currDate,'currDate')

                // var confirm2 = $mdDialog.confirm()
                //           .title(`Attention`)
                //           .textContent(`Meal distribution on your calendar will be erased. Are you sure you want to pause subscription from 
                //             ${today.toString().slice(4,15)}?`)
                //           .ariaLabel('Lucky day')
                //           .ok('Yes')
                //           .cancel('No');

                var confirm2 = $mdDialog.confirm()
                          .title(`Attention`)
                          .textContent(`Meal distribution on your calendar will be erased and stored. Are you sure you want to pause subscription ?`)
                          .ariaLabel('Lucky day')
                          .ok('Yes')
                          .cancel('No');

                $mdDialog.show(confirm2).then(function() {
                    // //console.log('asdf')
                    $http.post(`/pauseSub/${vmCalender.subscription._id}`,dataToBeRemoved).then(function(response){if(response.data){
                        // //console.log(response.data,'pauseSub')
                        if(response.data == 'done'){
                            window.location.reload()
                        }else{
                            // //console.log('something went wrong')
                        }
                    }})

                },function(){
                    // //console.log('asdfasfg')
                })
            }
        }
        $scope.resume = function(){
            document.getElementById('finalSubmit').style.display = "none"
            // //console.log(existingDateVeg,'existingDatesVeg')
            // //console.log(existingDateNonveg,'existingDatesNonveg')
            let cancelObj = [{date:new Date(), vegCount:1, nonvegCount:1}]
            // //console.log(cancelObj,'')
        }
        $scope.addMore = function(){
            // //console.log('add')
            //console.log(vmCalender,'vmCalender')
            if(vmCalender.isAddEnabled == true){
                $location.path(`/subscribe/${$routeParams.subId}`).search({
                    vegCount:vmCalender.totalVegCount, 
                    nonvegCount:vmCalender.totalNvegCount, 
                    vegRem:fullVegRem,
                    nvegRem:fullNvegRem
                });
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please update Calender first').hideDelay(2000) );
            }
        }
        $scope.showMenu = function(){
            // //console.log(vmCalender.menuBtn)
            if(vmCalender.menuBtn == false){
                $location.path(`/menu`).search({date:vmCalender.currDate.toString().slice(4,15)})
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please update Calender first').hideDelay(2000) );
            }
        }
        $scope.goProfile = function(){ 
            if(vmCalender.isProfileEnabled == true){
                $location.path(`/profile/${$routeParams.subId}`) 
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please update Calender first').hideDelay(2000) );
            }
        }
        $scope.djLink = function(){
            // //console.log(vmCalender.djLinkOn,'vmCalender.djLinkOn ')
            if(vmCalender.djLinkOn == true){
                // window.location.href = 'https://www.dialjordan.com'
                window.open('https://www.dialjordan.com', '_blank');
            }else{
                $mdToast.show( $mdToast.simple().textContent('Please update Calender first').hideDelay(2000) );
            }
        }
	}
}
