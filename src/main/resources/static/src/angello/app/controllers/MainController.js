angular.module('Angello.Common')
    .controller('MainCtrl',['$scope','authService','$location', '$localStorage',
                    function($scope,authService,$location, $localStorage){

            var main = this;
            main.currentUser = $localStorage.currentUser;;

            $scope.$on('onCurrentUser', function (ctx, id) {
                main.currentUser = id;
                console.log(id);
                console.log(main.currentUser);
            });

            main.logout = function() {
                main.currentUser = null;
                authService.logout();
            };
    }]);