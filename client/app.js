var superMarketApp = angular.module('superMarketApp',['ngRoute','ngCookies','routeStyles']);

//routing set up
superMarketApp.config(function($routeProvider){
    $routeProvider

    .when('/',{
        templateUrl:'/templates/home.html',
        controller:'mainPController',
        css:'/styles/shopingLanding.css'
    })
    .when('/signUp2',{
        templateUrl:'/templates/userSignUp2.html',
        controller:'userSignUpController',
        css:['/styles/shopingLanding.css','/styles/signUpStyles.css']
    })


    .when('/signUp1',{

        templateUrl:'/templates/userSignUp.html',
        controller:'userSignUpController',
        css:['/styles/shopingLanding.css','/styles/signUpStyles.css']

    })

    .when('/login',{
        
        templateUrl:'/templates/log-in.html',
        controller:'loginController',
        css:'/styles/shopingLanding.css',


    })
    .when('/shopingPage',{
        templateUrl:'/templates/shopingPage.html',
        controller:'shopingPageController',
        css:'/styles/shopingLanding.css',


    })

    .when('/adminPage',{
        
        templateUrl:'/templates/adminPage.html',
        controller:'shopingPageController',
        css:'/styles/shopingLanding.css',


    })
    
    

    .when('/checkOutPage',{
        templateUrl:'/templates/checkOutPage.html',
        controller:'checkOutPageController',
        css:'/styles/shopingLanding.css',


    })


    .when('/orederConfirmation',{
        templateUrl:'/templates/orederConfirmation.html',
        controller:'checkOutPageController',
        css:'/styles/shopingLanding.css',


    })

    .otherwise({
        redirectTo: '/'
    });
})


//init $locationprovider hash prefix
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}])

//init cookie behaviour default domain

.config(function($cookiesProvider){
    $cookiesProvider.defaults.domain = 'localhost';
})