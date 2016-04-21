var amazonfresh = angular.module('amazonfresh', [ 'ui.router' ]);
amazonfresh.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$stateProvider.state('login', {	
		url : '/',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'content': {
                templateUrl : 'templates/login.html',
            },
		}
	})
	.state('adminlogin',{
		url:'/adminLogin',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'content': {
                templateUrl : 'templates/adminlogin.html',
            },
		}
	})
	.state('successful',{
		url:'/afterLogin',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'content': {
            	template: '<h1>Successfullogin</h1>'
            },
		}
	})
	.state('signup', {
		url:'/createAccount',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'content': {
                templateUrl : 'templates/createaccount.ejs'
            }
		}
	})
	.state('addressDetails',{
		url:'/saveAddress',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'content': {
            	templateUrl : 'templates/splashdelivery.ejs'
            }
		}
	})
	.state('cardDetails',{
		url:'/saveCardDetails',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'content': {
            	templateUrl : 'templates/carddetails.ejs'
            }
		}
		
	})
	.state('customerHomepage',{
		url:'/home',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'content': {
            	templateUrl : 'templates/userhomepage.ejs'
            }
		}
	});
	$urlRouterProvider.otherwise('/');
});