
superMarketApp.controller('userSignUpController',['$scope','$location','$window','$rootScope','$cookies','signUpService',function($scope,$location,$window,$rootScope,$cookies,signUpService){

    /* 
        init signup info objects for both of the sign up view routes,
        error presentation and log in presentation boolean values
        are both assigned to false at this point,
    */

    $scope.signUpInfo = {};
    $scope.signUpInfo2 = {};
    $scope.errorsOn=false;
    $scope.showLogin = false;
    $scope.usedId=" ";

    // error massages by types object
    
    $scope.errs = {

        id:{
            required:"this filed is required",
            unavailable:"this is id is allready registerd to system",
            minlength:"this filed reqiuers a minimum length of 9 characters",
            pattern:"id has to include 9 digits"
        },

        
        email:{
            required:"this filed is required",
            invalid:"please enter a valid email adress"
        },

        
        password:{
            minlength:'password must contain at least 5 characters',
            pattern:'password must contain a digit and a letter',
            required:'this field is required'
        },

        
        confirmPassword:{

            match:'passwords dont match',
            required:'password match is required'

        },

       
        name:{

            required:'name is required',
            minlength:'name must be at least 2 characters'
        },


       famillyName:{
            required:'familly name is required',
            minlength:'famillyName must be at least 2 characters'
        },



    },


    /* 
        getting the countries list
    */
    $scope.countries = ()=>{

        signUpService.getCountries().then(function(data){
        $scope.countries = data.data.map(x=>x.name);
            $scope.countries;
        })

    }

    angular.element(document.querySelector('body')).ready($scope.countries)


    
    /*
        Form route 1 validation of id, if data is
        valid it will be assigned to rootscope  
        and form route2 view will load
    */
    

    $scope.form1Func = (formData,formE) =>{

        $rootScope.formData1 = formData;
        
        signUpService.checkIdExist(formData.id).then(
            function(data){
                if (typeof data.data=='string'&&formE.$valid==true)
                    $location.path('/signUp2')

                
                else{
                    $scope.errorsOn=true;
                    $scope.usedId=data.data.id;
                }

            }
        );
                    
    }

      /*
        
        Form route 2 validation, if data is
        valid it will be assigned to rootscope  
        and user will be loged in to system with
        the 'valid' cookie object
    */

    $scope.form2Func = (formData) =>{
        
        $rootScope.formData2 = formData

        $scope.fullSingupInfo = Object.assign({},$rootScope.formData1,$rootScope.formData2);

        $scope.fullSingupInfo;

        $scope.fullSingupInfo.role = 'client'

        signUpService.sendData($scope.fullSingupInfo).then(function suc(data){

            if(typeof data.data == "object"){
                
                $cookies.putObject('valid',data.data,{path:'/'});
                $scope.showLogin=false;
                $rootScope.UserLogedIn = true;
                $rootScope.user = Object.assign({},$cookies.getObject('valid'));
                $window.location.href='/';
                
            }

            else{
                $scope.showErr=true
            }
        }
    )

            
    }


}])


