angular.module('Angello.Common')
    .service('StoriesModel',
        function ($http, EndpointConfigService, UtilsService) {
            var service = this;
            var MODEL = 'stories';

            service.all = function () {
                return $http.get(EndpointConfigService.getCurrentURI() + MODEL)
                        .then(
                            function(result) {
                                return UtilsService.objectToArray(result);
                            }
                        );
            };

            service.fetch = function (story_id) {
                return $http.get(
                    EndpointConfigService.getCurrentURI() + MODEL + "/" + story_id
                );
            };

            service.create = function (story) {
                return $http.post(EndpointConfigService.getCurrentURI() + MODEL, story);
            };

            service.update = function (story_id, story) {
                return $http.put(
                    EndpointConfigService.getCurrentURI() + MODEL + "/" + story_id, story
                );
            };

            service.destroy = function (story_id) {
                return $http.delete(
                    EndpointConfigService.getCurrentURI() + MODEL + "/" + story_id
                );
            };
        });