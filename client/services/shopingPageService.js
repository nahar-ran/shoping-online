
// interacting with server, the function names are self explanatory

superMarketApp.service('shopingPageService',function($http){

    this.getCategories = ()=>{return $http({method:'GET',url:'/getCategories'})};

    this.getProductsByCategory = (categoryId) => {return $http({method:'GET',url:'/getProductsByCategory',params:{categoryId:categoryId}})};

    this.search = (value) => {return $http ({method:'GET',url:'/searchProducts',params:{value:value}})};

    this.updateCart = (userId,cartObj) => {return $http ({method:'POST',url:'/updateCart',data:{userId:userId,cartObj:cartObj}})};

    this.orderSubmit = (obj) => {return $http ({method:'POST',url:'/orderSubmit',data:{order:obj}})};

    this.getCurCart = (customerId) => {return $http ({method:'GET',url:'/getCurCart',params:{userId:customerId}})};    

    this.getImagePath = (imageData) => {return $http.post('/newProductImage', imageData, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })}

    this.addProduct = (productData) => {return $http ({method:'POST',url:'/newProduct',data:{productData:productData}})};

    this.validateDate = (dateStr) => {return $http({method:'GET',url:'/getOrdersByDate',params:{dateStr:dateStr}})};
  
    this.sendEditedContent = (productData) => {return $http ({method:'POST',url:'/editProduct',data:{productData:productData}})};
 
})