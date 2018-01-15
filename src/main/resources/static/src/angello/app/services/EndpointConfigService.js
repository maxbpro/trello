angular.module('Angello.Common')
    .constant('CURRENT_BACKEND', 'java')
    .service('EndpointConfigService', function($rootScope, CURRENT_BACKEND) {
        var service = this,
            endpointMap = {
                java: { URI: 'http://workcards.info/', root: '', format: ''}
                //java: { URI: 'http://localhost:8080/', root: '', format: ''}
            },
            currentEndpoint = endpointMap[CURRENT_BACKEND],
            userId = null,
            backend = CURRENT_BACKEND;

        service.getUrl = function(model) {
            return currentEndpoint.URI + model;
        };

        service.getUrlForId = function(model, id) {
            return service.getUrl(model) + id;
        };

        service.getCurrentBackend = function() {
            return backend;
        };

        service.getCurrentFormat = function() {
            return currentEndpoint.format;
        };

        service.getCurrentURI = function() {
            return currentEndpoint.URI;
        };

        $rootScope.$on('onCurrentUserId', function(event, id){
            userId = id;
        });
    });
