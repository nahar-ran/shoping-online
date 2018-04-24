
superMarketApp.service('verifyLogin',function($http){

    this.verifyUser = (id,pass) => {
        return $http({url:'/verifyUser',method:'GET',params:{id:id,pass:pass}});
    }

    this.verifyObjId = (id,name) =>{
        return $http({url:'/verifyUserById',method:'GET',params:{id:id,name:name}});

    }
    
})
