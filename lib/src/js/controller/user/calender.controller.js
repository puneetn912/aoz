export default function calenderController() {
	angular.module('cmsApp')
	.controller('calenderController', calenderController);
	calenderController.$inject = ['$scope','$timeout', '$q', '$log','$http','$routeParams','$location','$mdDialog','$mdToast','$cookies'];
	function calenderController($scope,$timeout, $q,$log,$http,$routeParams,$location,$mdDialog,$mdToast,$cookies) {
		var vmCalender = this;

        let cookies = $cookies.getAll()
        console.log(cookies,'cookiesCal')

        // if(cookies.catererVegId){
        //     console.log('asdf')
        // }else{
        //     console.log('asd')
        // }

        // document.getElementById('calContent').classList.add("disableDiv");
        vmCalender.updateBtn = 'Edit'
        document.getElementById('countBtn').classList.add("disableDiv");
        let editBtnClass = document.getElementById('countBtn').classList 
        let editBtnArr = []
        editBtnClass.forEach( function(value, key, listObj) { editBtnArr.push(value) }, "arg" );
        console.log(editBtnArr,'editBtnArr')

        let vegCount =0, nonvegCount =0, subscription = '', subId = $routeParams.subId, vegRemaining = 0, nvegRemaining = 0

        let fullVegRem = ''
        let fullNvegRem = ''
        
        $http.post(`/getSub/${$routeParams.subId}`).then(function(response){if(response.data){
            console.log(response.data,'subs get')
            subscription = response.data

            $cookies.put('apt_id',response.data.apartment_id)
            $cookies.put('apartment_name',response.data.apartment_name)
            $cookies.put('tower_name',response.data.tower_name)
            $cookies.put('subStatus',response.data.status)
            // $cookies.put('name',response.data.user_id.name)
            // $cookies.put('email',response.data.user_id.email)
            // $cookies.put('doorNo',response.data.user_id.door_no)
            
            vmCalender.userData = response.data.user_id
            vmCalender.subscription = response.data
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
            // var confirm = $mdDialog.confirm().title('Attention').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
            // $mdDialog.show(confirm).then(function() {
            //     $location.path(`/`) 
            // });
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
        setTime.setHours(9,30)

        $http.post(`/getCal/${$routeParams.subId}`).then(function(response){if(response.data){
            console.log(response.data,'getCal')
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
                            if(setTime<=nextDay){
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
                var confirm = $mdDialog.confirm().title('Attention').textContent('Something went wrong, Please ogin again').ariaLabel('Lucky day').ok('Login')
                $mdDialog.show(confirm).then(function() {
                    // angular.forEach(cookies, function (cookie, key) {
                    //     $cookies.remove(key)
                    // });
                    $location.path(`/`)       
                });                
            }
        }})

        $scope.some= function(ev){
            console.log(fullVegRem,'fullVegRem')
            console.log(fullNvegRem,'fullNvegRem')

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

            console.log(vmCalender.allDatesVeg,'vmCalender.allDatesVeg')
            console.log(vmCalender.allDatesNonveg,'vmCalender.allDatesNonveg')
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
                            $mdToast.show( $mdToast.simple().textContent(`Its past 9:30 today, You can't edit today's date`).hideDelay(2000) );    
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
                            $mdToast.show( $mdToast.simple().textContent('Its past 9:30 today').hideDelay(2000) );    
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
                            $mdToast.show( $mdToast.simple().textContent('Its past 9:30 today').hideDelay(2000) );    
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
                            $mdToast.show( $mdToast.simple().textContent('Its past 9:30 today').hideDelay(2000) );    
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
        $scope.finalSave = function(){
            console.log(editBtnArr,'editBtnArr')
            console.log(editBtnArr.indexOf('disableDiv'),'check')
            if(editBtnArr.indexOf('disableDiv')==-1){
            // if(document.getElementById('countBtn').className==''){
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
                    console.log(finalObj, 'finalObjfist')
                    fullVegRem = vmCalender.vegRem
                    fullNvegRem = vmCalender.nvegRem
                    let remObj = {vegRemFinal : vmCalender.vegRem, nvegRemFinal : vmCalender.nvegRem }  
                    $http.post(`/updateCal`,finalObj).then(function(response){
                        $http.post(`/updateSubBro/${subId}`, remObj).then(function(response){
                            $mdToast.show( $mdToast.simple().textContent('Calendar has been Updated').hideDelay(2000) );
                        })
                    })
                    document.getElementById('goDJ').setAttribute("href", "www.dialjordan.com");
                    document.getElementById('countBtn').classList.add("disableDiv");
                    editBtnArr = []
                    editBtnClass.forEach( function(value, key, listObj) { editBtnArr.push(value) }, "arg" );
                    
                    vmCalender.updateBtn = 'Edit'
                    vmCalender.menuBtn = false
                    vmCalender.isProfileEnabled = true
                    vmCalender.isAddEnabled = true
                }, function() {
                    console.log('Ok cool')
                    document.getElementById('goDJ').setAttribute("href", "www.dialjordan.com");
                    document.getElementById('countBtn').classList.add("disableDiv");
                    editBtnArr = []
                    editBtnClass.forEach( function(value, key, listObj) { editBtnArr.push(value) }, "arg" );
                    
                    vmCalender.updateBtn = 'Edit'
                    vmCalender.menuBtn = false
                    vmCalender.isProfileEnabled = true
                    vmCalender.isAddEnabled = true
                });
            }else{
                console.log('else')
                console.log(document.getElementById('countBtn').classList,'d')
                document.getElementById('countBtn').classList.remove("disableDiv");
                editBtnArr = []
                editBtnClass.forEach( function(value, key, listObj) { editBtnArr.push(value) }, "arg" );
                console.log(editBtnArr, 'editBtnArr aftererrrrasdfasdf')

                vmCalender.updateBtn = 'Update'
                vmCalender.menuBtn = true
                vmCalender.isProfileEnabled = false
                vmCalender.isAddEnabled = false
                document.getElementById('goDJ').removeAttribute("href")
            }
        }
        $scope.pause = function(){
            document.getElementById('pauseSub').style.display = "none"
            document.getElementById('resume').style.display = "block"
        }
        $scope.resume = function(){
            document.getElementById('finalSubmit').style.display = "none"
            console.log(existingDateVeg,'existingDatesVeg')
            console.log(existingDateNonveg,'existingDatesNonveg')
            let cancelObj = [{date:new Date(), vegCount:1, nonvegCount:1}]
            console.log(cancelObj,'')
        }
        $scope.addMore = function(){
            console.log('add')
            // console.log(vmCalender,'vmCalender')
            $location.path(`/subscribe/${$routeParams.subId}`).search({
                vegCount:vmCalender.totalVegCount, 
                nonvegCount:vmCalender.totalNvegCount, 
                vegRem:fullVegRem,
                nvegRem:fullNvegRem
            });
        }
        $scope.showMenu = function(){
            console.log(vmCalender.currDate.toString().slice(4,15),'vmCalender.currDate')
            $location.path(`/menu`).search({date:vmCalender.currDate.toString().slice(4,15)})
        }
        $scope.goProfile = function(){ 
            $location.path(`/profile/${$routeParams.subId}`) 
        }
	}
}
