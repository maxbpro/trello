angular.module('Angello.Common')
    .service('UsersModel',
    function ($http, EndpointConfigService, UtilsService) {
        var service = this;
        var MODEL = 'api/users';

        service.all = function () {
            return $http.get(EndpointConfigService.getCurrentURI() + MODEL)
                    .then(
                        function(result) {
                            return UtilsService.objectToArray(result);
                        }
                    );
        };

        service.fetch = function (user_id) {
            return $http.get(EndpointConfigService.getCurrentURI() + MODEL + "/" + user_id);
        };

        service.create = function (user) {
            return $http.post(EndpointConfigService.getUrl(MODEL), user);
        };

        service.update = function (user_id, user) {
            return $http.put(EndpointConfigService.getCurrentURI() + MODEL + "/" + user_id, user);
        };

        service.destroy = function (user_id) {
            return $http.delete(EndpointConfigService.getCurrentURI() + MODEL + "/" + user_id);
        };
    });