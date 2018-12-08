export default function menuController() {
    angular.module('cmsApp')
    .controller('menuController', menuController);

    menuController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http'];
    function menuController($scope,$timeout, $q, $log,$location,$routeParams,$http) {
        var vmMenu = this;
        var urlParams = $location.search();
        
        let date = ''
        if(urlParams){
            let urlDate = new Date(urlParams.date)
            urlDate = urlDate.setDate(urlDate.getDate()+1)
            date = {date: new Date(urlDate)}
        }
        console.log(date, 'date')

        $http.post(`/getMenuByDate`, date).then(function(response){if(response.data){
            console.log(response.data, 'getMenuByDate')
            var menu = response.data
            console.log(menu,'menu')
            var nonveg = menu.nonvegmeals
            var veg = menu.vegmeals
            console.log(veg,'veg')

            var nonveg_object = nonveg[0];
            var veg_object = veg[0];
            console.log(veg_object,'veg_object')

            let non_array = []
            console.log(non_array,'non_array')

            let veg_array = []
            console.log(veg_array,'veg_array')
        
            var nheader = "Our Menu";
            var vheader = "Our Menu";


            // var vdesclaimer = veg_object.disclaimer;
            // console.log(vdesclaimer,'vdesclaimer')

            // var ndesclaimer = nonveg_object.disclaimer;
            // console.log(ndesclaimer,'ndesclaimer')

            var ndesclaimer = "Disclaimer";
            var vdesclaimer = "Disclaimer";

            // non veg
            if(nonveg_object){
                ndesclaimer = nonveg_object.disclaimer;
                nheader = nonveg_object.menu_header;
                console.log(nheader,'nveg_headerheader')
                if(nonveg_object.item_one && nonveg_object.description_one)
                {non_array.push({[nonveg_object.item_one]:nonveg_object.description_one})}

                if(nonveg_object.item_two && nonveg_object.description_two)
                    {non_array.push({[nonveg_object.item_two]:nonveg_object.description_two})}

                if(nonveg_object.item_three && nonveg_object.description_three)
                    {non_array.push({[nonveg_object.item_three]:nonveg_object.description_three})}

                if(nonveg_object.item_four && nonveg_object.description_four)
                    {non_array.push({[nonveg_object.item_four]:nonveg_object.description_four})}

                if(nonveg_object.item_five && nonveg_object.description_five)
                    {non_array.push({[nonveg_object.item_five]:nonveg_object.description_five})}

                if(nonveg_object.item_six && nonveg_object.description_six)
                    {non_array.push({[nonveg_object.item_six]:nonveg_object.description_six})}

                if(nonveg_object.item_seven && nonveg_object.description_seven)
                    {non_array.push({[nonveg_object.item_seven]:nonveg_object.description_seven})}

                if(nonveg_object.item_eight && nonveg_object.description_eight)
                    {non_array.push({[nonveg_object.item_eight]:nonveg_object.description_eight})}

                if(nonveg_object.item_nine && nonveg_object.description_nine)
                    {non_array.push({[nonveg_object.item_nine]:nonveg_object.description_nine})}

                if(nonveg_object.item_ten && nonveg_object.description_ten)
                    {non_array.push({[nonveg_object.item_ten]:nonveg_object.description_ten})}    
            }
        
            // veg
            if(veg_object){
                vdesclaimer = veg_object.disclaimer;
                vheader = veg_object.menu_header;
                console.log(vheader,'veg_headerheader')
                if(veg_object.item_one && veg_object.description_one)
                    {veg_array.push({[veg_object.item_one]:veg_object.description_one})}

                if(veg_object.item_two && veg_object.description_two)
                    {veg_array.push({[veg_object.item_two]:veg_object.description_two})}

                if(veg_object.item_three && veg_object.description_three)
                    {veg_array.push({[veg_object.item_three]:veg_object.description_three})}

                if(veg_object.item_four && veg_object.description_four)
                    {veg_array.push({[veg_object.item_four]:veg_object.description_four})}

                if(veg_object.item_five && veg_object.description_five)
                    {veg_array.push({[veg_object.item_five]:veg_object.description_five})}

                if(veg_object.item_six && veg_object.description_six)
                    {veg_array.push({[veg_object.item_six]:veg_object.description_six})}

                if(veg_object.item_seven && veg_object.description_seven)
                    {veg_array.push({[veg_object.item_seven]:veg_object.description_seven})}

                if(veg_object.item_eight && veg_object.description_eight)
                    {veg_array.push({[veg_object.item_eight]:veg_object.description_eight})}

                if(veg_object.item_nine && veg_object.description_nine)
                    {veg_array.push({[veg_object.item_nine]:veg_object.description_nine})}

                if(veg_object.item_ten && veg_object.description_ten)
                    {veg_array.push({[veg_object.item_ten]:veg_object.description_ten})}      
            }

            vmMenu.veg = veg_array 
            // console.log(vmMenu.veg,'vmMenu.veg')
            vmMenu.nonveg = non_array

            vmMenu.vheader = vheader
            // console.log(vmMenu.vheader,'vmMenu.vheader')

            vmMenu.nheader = nheader


            vmMenu.ndesclaimer = ndesclaimer
            vmMenu.vdesclaimer = vdesclaimer

            // vmMenu
        }else{
            var confirm = $mdDialog.confirm().title('Hey Bro').textContent('Something went wrong, Please login again').ariaLabel('Lucky day').ok('Login')
            $mdDialog.show(confirm).then(function() {
                // let cookiesRem = $cookies.getAll()
                // angular.forEach(cookiesRem, function (cookie, key) {
                //     $cookies.remove(key)
                // });
                $location.path(`/`)       
            });
        }})            


    }
}