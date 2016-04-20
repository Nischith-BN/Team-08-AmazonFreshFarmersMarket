var amazonfresh = angular.module('amazonfresh', [ 'ui.router' ]);
amazonfresh.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$stateProvider.state('login', {
		url : '/',
		templateUrl : 'templates/login.html'
	})
	.state('successful',{
		url:'/afterLogin',
		template: '<h1>Successfullogin</h1>'
	})
	.state('signup', {
		url:'/createAccount',
		templateUrl : 'templates/createaccount.ejs'
	})
	.state('addressDetails',{
		url:'/saveAddress',
		templateUrl : 'templates/splashdelivery.ejs'
	})
	.state('cardDetails',{
		url:'/saveCardDetails',
		templateUrl : 'templates/carddetails.ejs'
	})
	.state('customerHomepage',{
		url:'/home',
		templateUrl : 'templates/userhomepage.ejs'
	});
	$urlRouterProvider.otherwise('/');
});