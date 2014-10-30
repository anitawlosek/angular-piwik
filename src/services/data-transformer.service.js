(function(angular) {
    'use strict';

    /**
     * @ngDoc service
     * @name clearcode.components.ngPiwik.DataTransformer
     */
    angular
        .module('clearcode.components.ngPiwik')
        .service('clearcode.components.ngPiwik.DataTransformer', DataTransformer);

    function DataTransformer() {
        return function(TransformClass) {
            this.transform = function(response){
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