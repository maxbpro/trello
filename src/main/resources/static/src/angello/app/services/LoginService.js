angular.module('Angello.Common')
    .factory('authService',['AUTH_ENDPOINT','LOGOUT_ENDPOINT','$http','$localStorage','$rootScope', '$location',
    function(AUTH_ENDPOINT,LOGOUT_ENDPOINT,$http, $localStorage, $rootScope, $location){

        var auth={};

        auth.login=function(username,password){

            var params = $.param({username:username,password:password});
            return $http({
                method: 'POST',
                url: AUTH_ENDPOINT,
                data: params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            }).then(function(response,status){

                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = { user: response.data.user, token: response.data.token };

                $rootScope.$broadcast('onCurrentUser', $localStorage.currentUser.user);
                $rootScope.$broadcast('onCurrentUserId', $localStorage.currentUser.user.id);

                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + auth.token;

                return auth.user;
            });

        }

        auth.logout=function(){
            return $http.post(LOGOUT_ENDPOINT).then(function(response){

                delete $localStorage.currentUser;
                $http.defaults.headers.common.Authorization = '';
                $location.path('/login');
            });
        }

        return auth;

    }]);

