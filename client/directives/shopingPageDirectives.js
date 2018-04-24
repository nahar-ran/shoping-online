
// spreads the products into the main view

superMarketApp.directive('productsDir',['$location',function($location){
    
    return {
        restrict :'EA',

        link:(scope,element,attrs)=>{
            scope.productAction = $location.path() == '/adminPage'? 'edit product' : 'add to cart!';
    },
        template:"<ul id = 'selectedProducts'><li ng-repeat = 'item in productsSpread' id = {{item.name}}>  <img ng-src = {{item.picturePath}} /> <span class = 'price'> {{item.price | currency:'&#8362;'}} </span> <span class = 'name'> {{item.name}} </span> <button class = 'btn btn-primary' ng-click = 'productActionFunk(item)'> {{productAction}} </button> </li></ul>"

}}])


// adding products pop up

superMarketApp.directive('cartModal',function(){

    return {
        restrict:'EA',
        
        scope:{
            cartItem:'=',
            showModal:'=',
            curCart:'='
        },

        
        link:(scope,element,attrs)=>{

            /*
                watcher that toggles the display 
                property of the add product modal pop up
            */    
            
            scope.$watch('showModal',function(newval,oldval){
            scope.invalidQuantity = false;

            if (newval==true)
                angular.element(element).css('display','block');

            if (newval==false)
                angular.element(element).css('display','none');
            })


            /* 
                canceling the product adding 
                and closing the pop up
            */

            scope.cancelItem = ()=>{

                scope.showModal=false;
                scope.quantity = 0;

            }
            
            
            //ading the product to the cart view and cart array
            scope.addToCart = (item,quantity) =>{

                if (quantity==0||quantity==undefined){
                    
                    scope.invalidQuantity = true;
                    return;
                }
                
                item.quantity=quantity;
                scope.curCart.push(item);

                scope.showModal=false;
                scope.quantity = 0;


            }  
                
        },

        template:"<div id = 'cartItem'> you have selected the {{cartItem.name}} to be added to your purchase cart, how many items would you like to add to cart <input ng-model = 'quantity' type='number' /> <button ng-click = 'quantity = quantity+1'> + </button> <button class = 'cancelCartAddition' ng-click = 'cancelItem()'> cancel </button> <button ng-click = 'addToCart(cartItem,quantity)' class = 'addToCart'> add to cart </button> <span id='invalidQuantity' ng-show = 'invalidQuantity'> please add quantity </span>  </div>"
    }

})

// spreads the products to the receipt
superMarketApp.directive('receiptItem',function(){

        return {
            restrict:'EA',
            scope:{name:'@',price:'@',quantity:'@'},

            link:(scope,element,attributes) =>{

                scope.words = scope.name.split(' ');
            },

            template:"<span id = {{word}} class = 'receiptWords'  ng-repeat = 'word in words'> {{word}} </span> <span class = 'prices' id = {{price}}> {{price | currency:'&#8362;'}} </span> * <span class = 'quantities'> {{quantity}} </span> "

            
        }
})

// creates a form for adding new products
superMarketApp.directive ('addItem',function(){


    return {
        restrict:'EA',
        template :" <button class = 'btn btn-primary' id ='addNewProduct' ng-init = 'addNewProduct = false' title = 'add new product' ng-click = 'addNewProduct = true; edit =false'> + </button>  <form name = 'ProductForm' ng-submit='addProduct(ProductData)' ng-show = 'addNewProduct&&!edit'> <h3> new product data </h3> <ul id ='addItem'> <li> <input ng-model = 'ProductData.name' required custom-lable name = 'name'/> </li> <li> <input type = 'number' step='0.01' required custom-lable ng-model = 'ProductData.price' name = 'price'/> </li> <li> <input required file-model file-model-name = 'ProductData.picturePath' custom-lable ng-model = 'ProductData.picturePath'  name = 'picture' type = 'file' /> </li>  <li> <select required custom-lable ng-model = 'ProductData.categoryId' name = 'category'> <option value = {{item._id}} ng-repeat = 'item in categories'> {{item.name}} </option> </select> </li> <li> <input required type='submit' class = 'btn btn-success' value = 'save' name = 'save' /> </li> </ul> </form>"
    }

})

// creates a form for editing existing products

superMarketApp.directive ('editItem',function(){
    
    return {
        
        scope:{
            details:'=',
            editProduct:'='
        },


        link:function(scope,element,attributes){


            scope.categories = scope.$parent.categories;
            
            /*
            monitoring the edit data, 
            to create a static name display
            */
            
            scope.$parent.$watch('editData',function(newval,oldval){
                scope.itemName = newval.name;
            })


            //taking the categories from parrent scope
            scope.$parent.$watchCollection('categories',function(newval,oldval){
                scope.categories = newval;
            })
            
            scope.sendEditedContent = scope.$parent.sendEditedContent;

            scope.$watch('imageChanged',function(newval,oldval){

                    scope.$parent.imageChanged=newval;
            })



        },
        restrict:'EA',
        template :" <form name = 'ProductForm' ng-submit='sendEditedContent(details)' ng-show = 'editProduct'> <h3> edit  {{itemName}}  </h3> <ul id = 'editProduct'> <li> <input ng-model = 'details.name' custom-lable name = 'name'/> </li> <li> <input type = 'number' step='0.01' custom-lable ng-model = 'details.price' name = 'price'/> </li> <li> <input  file-model file-model-name = 'details.picturePath' custom-lable ng-model = 'details.picturePath'  name = 'picture' type = 'file' /> </li> <li> <select custom-lable ng-model = 'details.categoryId' name = 'category'> <option value = {{item._id}} ng-repeat = 'item in categories'> {{item.name}} </option> </select> </li> <li> <input type='submit' class = 'btn btn-success' value = 'save' name = 'save'/> </li> </ul> </form>"
    }

})

/* 
     creates a model for picture file data
*/

superMarketApp.directive('fileModel',['$parse',function($parse){
    
    return {
        
        restrict:'A',
        
        link:(scope,element,attrs)=>{
            var model = $parse(attrs.fileModelName)
            var setter = model.assign;

            element.bind('change',function(){
                scope.$apply(setter(scope,element[0].files[0]));
                scope.imageChanged = true;
                scope.$parent.imageChanged = true;

            })
        }
    }

    
}])


    /* 
            gets the current use data by field model
            and injects it to the input field 
    */


superMarketApp.directive('getCur',['$parse',function($parse){
    
    return {
        
        restrict:'A',
        
        require:'ngModel',
        
        link:(scope,element,attrs,modelController)=>{
            
            element.bind('dblclick',function(){
            
                scope.order[modelController.$name] = scope.curUser[modelController.$name];
                modelController.$setViewValue(scope.curUser[modelController.$name]);
                modelController.$render();
            

            })
        }
    }

    
}])