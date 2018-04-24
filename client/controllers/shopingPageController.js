

superMarketApp.controller('shopingPageController',['$scope','$rootScope','shopingPageService','$cookies','$window','$location',function($scope,$rootScope,shopingPageService,$cookies,$window,$location){


    /*
        getting users current cart form server
    */
    shopingPageService.getCurCart($cookies.getObject('valid')._id).then(function(response){
    $scope.curCart = response.data.cartObj ? response.data.cartObj: [];
   
});
    

    // init carts total price
    $scope.totalPrice = 0;



    //getting categories from server
    shopingPageService.getCategories().then(function(response){

        $scope.categories = response.data;

    })


    /*
        monitoring cart object, 
        updatind total price and the carts collection acordingly 
    */
    
    $scope.$watchCollection('curCart',function(newval,oldval){
        
        $scope.totalPrice=0;
        
        if (newval.length>0){
            
            newval.forEach(element => {
                $scope.totalPrice+=element.price*element.quantity;
            });

        }

        shopingPageService.updateCart($cookies.getObject('valid')._id,newval).then(function(response){
        })
    })




    
    //removes item form cart
    
    $scope.removeFromCart = (item)=>{

        var index = $scope.curCart.indexOf(item);
        $scope.curCart.splice(index,1);

    }

    //removes all items form cart

    $scope.removeAllProducts = ()=>{

        $scope.curCart =[];

    }


    /* 
        spreads the products that belong to the
        clicked category, on main view
    */
    
    $scope.spreadCategory = (category)=>{

        angular.element(document.querySelectorAll( 'ul#categories li')).removeClass('active');
        
        angular.element(document.getElementById(category.name)).addClass('active');

        shopingPageService.getProductsByCategory(category._id).then(function(response){

                $scope.productsSpread = response.data;
        });
    }


    /* 
        product search function, sends the search 
        query to server and updates the productsSpread object
        with matching products
    */

    $scope.search = (value)=>{

        shopingPageService.search(value).then(function(response){
            $scope.productsSpread = response.data;
        })
    }



    /* 
        allows either editing or adding of a product 
        to the sidebar, according to the user type,
        which is determined by the $locations path function.
    */
    
    $scope.productActionFunk = (item) =>{ 
        $location.path() == '/adminPage'? $scope.editProduct(item) : $scope.addProductToCart(item);}

     
    //add product to cart 
    $scope.addProductToCart = (item)=>{
        $scope.curCartItem = item;
        $scope.showModal = true;
    }


    //add new product (for admin users only)
    $scope.addProduct = (productData) =>{
        
        var fdata = new FormData();
        
        for (x in productData){
            fdata.append(x,productData[x]);
        }

        // uploading image to project folder and geting new image path
        
        shopingPageService.getImagePath(fdata).then(
            function(response){
                productData.picturePath = response.data;
                shopingPageService.addProduct(productData).then(
                    function(reponse){
                        $scope.addNewProduct = false;
                    }
                );

            }
        )
    }

   //allowing product editing (for admins users only)
    $scope.editProduct = (item)=>{

            $scope.imageChanged = false;
            $scope.edit = true;
            $scope.editData = item;
    }

    // sends edited product to server
    $scope.sendEditedContent = (data)=>{

        var fdata = new FormData();
        for (x in data)
            {fdata.append(x,data[x]);}

        if($scope.imageChanged == true)
            shopingPageService.getImagePath(fdata).then(
                function(response){
                    data.picturePath = response.data;
                    shopingPageService.sendEditedContent(data).then(
                        function(response){
                            $scope.edit = false;
                            scope.editData ={};
                        }
                    );

                }
            )

        else{
            shopingPageService.sendEditedContent(data).then(
                function(response){
                    $scope.edit = false;
                    $scope.editData={};

                }
            );
        }
    }

    /* 
        opening the checkout view, 
        assining cart and total price to $rootScope,
        so that those will be available for the checkout contorller
    */
    $scope.proceedToCheckOut = ()=>{

        $rootScope.curCart = $scope.curCart;
        $rootScope.totalPrice = $scope.totalPrice
        
        if ($scope.curCart.length>0)    
            $window.location.href = '/#/checkOutPage'
        
        else 
            alert('cart is empty! please add at least one product to your cart to order');
    }

}])


