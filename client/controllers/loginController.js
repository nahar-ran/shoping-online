
superMarketApp.controller('loginController',['$scope','$rootScope','verifyLogin','$window','$cookies',function($scope,$rootScope,verifyLogin,$window,$cookies){

    $scope.verifiedUser = undefined; 

    //sends log in info to server

    $scope.sendInfo = (id,pass)=> {
        verifyLogin.verifyUser(id,pass).then(
            function success(response){
                if (angular.equals(response.data,'')) 
                    $scope.verifiedUser=false

                else{ 
                    $scope.verifiedUser=true;
                    $cookies.putObject('valid',response.data,{path:'/'});
                    $scope.showLogin=false;
                    $rootScope.UserLogedIn = true;
                    $window.location.href  = '/';
                }   
            },
        )
    }

  
}])