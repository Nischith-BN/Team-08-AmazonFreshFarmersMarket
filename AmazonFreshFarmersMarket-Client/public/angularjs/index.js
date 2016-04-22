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
	.state('adminsuccessful',{
		url:'/afterAdminLogin',
		views: {
            'header': {
                templateUrl : 'templates/header.ejs',
            },
            'adminhome': {
            	templateUrl: 'templates/adminhome.html'
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
amazonfresh
.directive(
		'modal',
		function() {
			return {
				template : '<div class="modal fade">'
						+ '<div class="modal-dialog">'
						+ '<div class="modal-content">'
						+ '<div class="modal-header">'
						+ '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ '<h3 class="modal-title">{{ title }}</h3>'
						+ '</div>'
						+ '<div class="modal-body" ng-transclude></div>'
						+ '</div>' + '</div>' + '</div>',
				restrict : 'E',
				transclude : true,
				replace : true,

				scope : true,
				link : function postLink(scope, element, attrs) {
					scope.title = attrs.title;

					scope.$watch(attrs.visible, function(value) {
						if (value == true)
							$(element).modal('show');
						else
							$(element).modal('hide');
					});

					$(element).on('shown.bs.modal', function() {
						scope.$apply(function() {
							scope.$parent[attrs.visible] = true;
						});
					});

					$(element).on('hidden.bs.modal', function() {
						scope.$apply(function() {
							scope.$parent[attrs.visible] = false;
						});
					});
				}
			};
		});