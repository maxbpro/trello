var myModule = angular.module('Angello',
    [
        'ngRoute',
        'ngAnimate',
        'ngMessages',
        'ngStorage',
        'Angello.Common',
        'Angello.Dashboard',
        'Angello.Login',
        'Angello.Storyboard',
        'Angello.User',
        'angular-storage'
    ]);

myModule.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'src/angello/storyboard/tmpl/storyboard.html',
            controller: 'StoryboardCtrl',
            controllerAs: 'storyboard',
            resolve:{
                user:['$localStorage','$q',function($localStorage,$q){
                    if($localStorage.currentUser.token){
                        return $localStorage.currentUser.user || $q.reject({unAuthorized:true});
                    }
                    return false;
                }]
            }
        })
        .when('/dashboard', {
            templateUrl: 'src/angello/dashboard/tmpl/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard',
            resolve:{
                user:['$localStorage','$q',function($localStorage,$q){
                    if($localStorage.currentUser.token){
                        return $localStorage.currentUser.user || $q.reject({unAuthorized:true});
                    }
                    return false;
                }]
            }
        })
        .when('/users', {
            templateUrl: 'src/angello/user/tmpl/users.html',
            controller: 'UsersCtrl',
            controllerAs: 'users',
            resolve:{
                user:['$localStorage','$q',function($localStorage,$q){
                    if($localStorage.currentUser.token){
                        return $localStorage.currentUser.user || $q.reject({unAuthorized:true});
                    }
                    return false;
                }]
            }
        })
        .when('/users/:userId', {
            templateUrl: 'src/angello/user/tmpl/user.html',
            controller: 'UserCtrl',
            controllerAs: 'myUser',
            resolve:{
                user:['$localStorage','$q','$route','$routeParams','UsersModel',function($localStorage,$q, $route, $routeParams, UsersModel){
                    if($localStorage.currentUser.token){

                        var userId = $route.current.params['userId']
                            ? $route.current.params['userId']
                            : $routeParams['userId'];
                        var selectedUser = UsersModel.fetch(userId);

                        return selectedUser || $q.reject({unAuthorized:true});
                    }
                    return false;
                }],
                stories: function ($rootScope, StoriesModel) {
                    return StoriesModel.all();
                }
            }

        })
        .when('/login', {
            templateUrl: 'src/angello/login/tmpl/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
});

myModule.factory('loadingInterceptor', function (LoadingService) {
    var loadingInterceptor = {
        request: function (config) {
            LoadingService.setLoading(true);
            return config;
        },
        response: function (response) {
            LoadingService.setLoading(false);
            return response;
        }
    };
    return loadingInterceptor;
});

myModule.run(function ($rootScope, LoadingService, $localStorage, $location, $http) {
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
        LoadingService.setLoading(true);
    });

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        LoadingService.setLoading(false);
    });

    $rootScope.$on('$locationChangeStart', function(event, newUrl) {

        if($localStorage.currentUser && $localStorage.currentUser.token){
            //$location.path('/');
        }else{
            $location.path('/login');
        }

    });

    // keep user logged in after page refresh
    if ($localStorage.currentUser && $localStorage.currentUser.token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;

        $rootScope.$broadcast('onCurrentUser', $localStorage.currentUser.user);
        $rootScope.$broadcast('onCurrentUserId', $localStorage.currentUser.user.id);
    }
});

myModule.value('STORY_STATUSES', [
    {name: 'To Do'},
    {name: 'In Progress'},
    {name: 'Code Review'},
    {name: 'QA Review'},
    {name: 'Verified'}
]);

myModule.value('STORY_TYPES', [
    {name: 'Feature'},
    {name: 'Enhancement'},
    {name: 'Bug'},
    {name: 'Spike'}
]);

