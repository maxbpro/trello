angular.module('Angello.Common')
    .controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $location, authService, $localStorage) {
    var main = this;
    main.currentUser = $localStorage.currentUser;;

    $scope.$on('onCurrentUser', function (ctx, id, $localStorage) {
        main.currentUser = $localStorage.currentUser;
    });

    main.logout = function() {
        main.currentUser = null;
        authService.logout();
    };
};
