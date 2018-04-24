
superMarketApp.service('signUpService',function($http){


    this.sendData= (params)=>{
        
        return $http({
            method:'post',
            url:'/addCustomer',
            data:{params:params}
        })
    }

    //sending input id to server for availability check
    this.checkIdExist = (id)=>{
        return $http({method:'get',url:'/checkIdExist?id='+id,data:{params:{id:id}}})
    }

    //getting country list from external api
    this.getCountries = ()=>{
        return $http({method:'get',url:'https://restcountries.eu/rest/v2/all'})
    }
})