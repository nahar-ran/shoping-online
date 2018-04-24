
/* 
     binds the password and 
     the password confirm input models,
     by setting the 'match' validty creates the 
     password match functionality
*/

superMarketApp.directive('passwordConfirm',function(){

    elementObj = {};
    elementObj.restrict = 'A';
    elementObj.require = 'ngModel';
    elementObj.scope = {target:'='}
    elementObj.link = (scope,elements,attributes,ngModelController)=>{
        
        
    function validator(value){
           
        ngModelController.$setValidity('match',value==scope.target);
        return value;
            
    } 

    ngModelController.$formatters.push(validator);
    ngModelController.$parsers.push(validator); 
    scope.$watch('target',function(){validator(ngModelController.$viewValue)}) 
              
        
    }
return elementObj

})


// checks id abaiabillity

superMarketApp.directive('checkAvailable',function(){
    
    return{
    
        require:'ngModel',
        
        scope:{
            
            target:'='
        },
        
        restrict:'A',
        
        link:(scope,element,attr,cntrl)=>{
            cntrl.$parsers.push(validator)
            cntrl.$formatters.push(validator)

            function validator(value){
                cntrl.$setValidity('unavailable',value!=scope.target)
                return value
            }
    
            scope.$watch('target',function(){validator(cntrl.$viewValue)});
    
        }

    }


    })

// creates custom lable template based on name property

superMarketApp.directive('customLable',function(){

    return function(scope,element,attributes){

                var lable = angular.element(document.createElement('lable'));
                var elName = attributes.name.split('');
                var isCap = elName.map(x=>/[A-Z]/.test(x));
                var capitalIndx = isCap.indexOf(true);
                
                if(capitalIndx>=0){
                    elName.splice(capitalIndx,0,' ');
                }

                elName = elName.join('');

                lable.html(elName + ": ")

                lable.addClass('inputLables');

                element.parent()[0].insertBefore(lable[0],element[0]);

        }
    })

    /*
        creates a custom error template for form
        inputs based on given errMassage and condition
    */

superMarketApp.directive("customError",function(){

    return{
    
        restrict:'EA',

        scope:{
            errMassage:'=',
            condition:'='},

        link:function(scope,element,attributes){},

        template:"<span class = 'errorSpans' ng-show = 'condition'> {{errMassage}} </span>"
    }

})

