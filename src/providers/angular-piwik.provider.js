(function(angular){
    'use strict';

    angular
        .module('clearcode.components.ngPiwik')
        .provider('$piwik', piwikProvider);

    /**
     *
     * @returns {{when: when, $get: $get}}
     */
    function piwikProvider() {

        var provider,
            requests,
            defaultParams;

        provider = {
            when: when,
            $get: $get
        };

        defaultParams = {
            module: 'API',
            method: 'Live.getLastVisitsDetails',
            format: 'JSON',
            token_auth: 'anonymous'
        };

        requests = {
            defaultParams: defaultParams
        };

        function when(id, params) {
            provider.$get.requests[id] = angular.extend(requests.defaultParams, params);

            return provider;
        }

        function $get() {
            return {
                requests: requests
            };
        }

        return provider;

    }

})(angular);