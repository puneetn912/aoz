export default function menuController() {
    angular.module('cmsApp')
    .controller('menuController', menuController);

    menuController.$inject = ['$scope','$timeout', '$q', '$log','$location','$routeParams','$http'];
    function menuController($scope,$timeout, $q, $log,$location,$routeParams,$http) {
        var vmMenu = this;
        var urlParams = $location.search();
        
        let date = ''
        if(urlParams){
            date = {date: new Date(urlParams.date)}
        }
        console.log(new Date().toISOString().slice(0,10), 'data br')
        console.log(new Date(), 'data br')
        let a = new Date() 
        a.setMonth(8)
        console.log(a.toISOString().slice(0,10),'a')

        $http.post(`/getMenuByDate`, date).then(function(response){if(response.data){
            console.log(response.data, 'getMenuByDate')
            var menu = response.data
            console.log(menu,'menu')
            var nonveg = menu.nonvegmeals
            var veg = menu.vegmeals

            var nonveg_object = nonveg[0];
            var veg_object = veg[0];

            let non_array = []
            console.log(non_array,'non_array')

            let veg_array = []
            console.log(veg_array,'veg_array')
            
            // non veg
            if(nonveg_object){
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
            vmMenu.nonveg = non_array 
        }})            


    }
}