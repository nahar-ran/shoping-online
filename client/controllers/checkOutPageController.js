

superMarketApp.controller('checkOutPageController',['$scope','$rootScope','$cookies','$window','shopingPageService','$parse',function($scope,$rootScope,$cookies,$window,shopingPageService,$parse){

    //get the current cart
    $scope.curCart =  $rootScope.curCart

    if($scope.curCart==undefined)
        $window.location.href='/#/shopingPage';

    
    //get the current total price
    $scope.totalPrice = $rootScope.totalPrice;

    //get the current active user data form cookie
    $scope.curUser = $cookies.getObject('valid');

    //init order data object
    $scope.order = {}

    //init order data validation var to true
    $scope.dateValid=true;




// function for searching the recipt based on product name, the results are yellow marked
    $scope.searchRecipt = (val)=>{
        
        if (val.length==0){
            var elementSearch = angular.element(document.getElementsByClassName('receiptWords'));
            angular.forEach(elementSearch, element => {element.classList.remove('yellowBackground')});
            return
        }
        
        val = val.split(' ');
        
        var elementSearch = angular.element(document.getElementsByClassName('receiptWords'));
        angular.forEach(elementSearch, element => {element.classList.remove('yellowBackground')});

        val.forEach(value => {
                        angular.forEach(elementSearch,element => {
                            var reg = new RegExp(value)
                            if(element.innerText.match(value)){
                                element.classList.add('yellowBackground');
                            }
                        })

                            var currentMarked = angular.element(document.getElementsByClassName('yellowBackground'));


        })
 
   

}

    //order submit function. validates the input date, if the date is not ocupied by 3 other orders, sends the order data to the server
    
    $scope.submitOrder = (orderObj)=>{

    $scope.dateValid=true;
    
    $scope.orderObj = {};
    
    // gets the curent user id
    orderObj.customerId = $scope.curUser._id;

    // gets the curent total price
    orderObj.price = $rootScope.totalPrice;

    //call to the date validation function that takes the input date to the server orders collection and returns other orders in that date
    
    shopingPageService.validateDate(orderObj.shippingDate).then(
        function(response){
            response.data.length>=3? $scope.dateValid=false : shopingPageService.orderSubmit(orderObj).then(
                function(response){
                    $rootScope.orderObj = Object.assign($scope.orderObj,orderObj);
                    $window.location.href = '/#/orederConfirmation'
                })
        


        })
    }


}])