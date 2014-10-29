(function(angular) {
    'use strict';

    angular
        .module('clearcode.components.ngPiwik')
        .service('DataTransformer', DataTransformerService);

    function DataTransformerService() {
        return function(TransformClass) {
            return function(response){
                if(response.length && typeof(TransformClass) === 'function') {
                    for(var i = 0; i < response.length; i++) {
                        response[i] = new TransformClass(response[i]);
                    }
                }

                return response;
            };
        };
    }

})(angular);