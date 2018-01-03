angular.module('Angello.Login')
    .controller('LoginCtrl',['$scope','authService','$location',function($scope,authService,$location){

        $scope.buttonText="Login";

        $scope.signin=function(){

            $scope.buttonText="Logging in. . .";

            authService.login($scope.credentials.username,$scope.credentials.password).then(function(data){
                $location.path('/');
            },function(err){
                $scope.invalidLogin=true;
            }).finally(function(){
                $scope.buttonText="Login";
            });
        }
    }]);



angular.module('Angello.Login').value('API_ENDPOINT','http://localhost:8080/api/posts/:id');
angular.module('Angello.Login').value('AUTH_ENDPOINT','http://localhost:8080/authenticate');
angular.module('Angello.Login').value('LOGOUT_ENDPOINT','http://localhost:8080/logout');

