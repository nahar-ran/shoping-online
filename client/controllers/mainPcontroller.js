superMarketApp.controller('mainPController',['$scope','$rootScope','$window','$location','$cookies','verifyLogin',function($scope,$rootScope,$window,$location,$cookies,verifyLogin){
    
    //init showlogin var and user object var

    $scope.showLogin = true;
    $rootScope.user = {};

    /* 
        verify user login. if user is valid and 
        logged in routes to shoping page. 
    */

   $scope.startShoping = ()=>{
       
        if($cookies.getObject('valid')){
            $scope.showLogin = false;
            $window.location.href  = $cookies.getObject('valid').role == 'customer' ? '/#/shopingPage' : '/#/adminPage';
        }

       else 
            alert('please log in or sign up first');
    }
   
    //routes to home page

    $scope.home = ()=>{
        $window.location.href = '/';
    }
    
    /*
        functionality on every page reload.
        check user validity and assign boolean 
        presentation variables based on current path
    */    
      
    $rootScope.$on('$routeChangeStart',function(){

        if ($location.path()=='/shopingPage'||$location.path()=='/adminPage'||$location.path()=='/signUp1'||$location.path()=='/signUp2'||$location.path()=='/checkOutPage')    
            $scope.showLogin = false;
            
            $rootScope.user = {};
            if ($cookies.getObject('valid')){
                $rootScope.user =Object.assign({},$cookies.getObject('valid'));
                
                if ($rootScope.user._id&&$rootScope.user.name){
                    verifyLogin.verifyObjId($rootScope.user._id,$rootScope.user.name).then(
                        function(response){    
                            if(typeof response.data == 'string'){
                            $cookies.remove('valid');
                        }
                      
                            else{
                                $rootScope.userLogedIn = true;
                                $rootScope.user =Object.assign({},$cookies.getObject('valid'));

                            }
                        }
                    )
                }
                    
            }
            
        }
    )  

        $rootScope.$watchCollection('user',function(newval,oldval){
            $rootScope.user = newval;
        })

        /*
            removes 'valid' cookie object that stores current user,
            and logout of system
        */
        
        $scope.logOut = ()=>{
            $cookies.remove('valid');
            $window.location.href = '/'
        }   

}])