(function(angular){
    'use strict';

    angular
        .module('angularPiwik')
        .provider('$angularPiwik', angularPiwikProvider);

    /**
     *
     * @returns {{when: when, $get: get}}
     */
    function angularPiwikProvider(){

        var provider,
            defaultParams = {
                module: 'API',
                method: 'Live.getLastVisitsDetails',
                idSite: 7,
                period: 'day',
                date: 'today',
                format: 'JSON',
                token_auth: 'anonymous'
            };

        provider = {
            when: when,
            $get: $get
        };

        /**
         *
         * @param id
         * @param params
         * @returns {{when: when, $get: get}}
         */
        function when(id, params){
            provider.$get[id] = angular.extend(defaultParams, params);

            return provider;
        }

        /**
         *
         * @returns {{default: {
         * module: string,
         * method: string,
         * idSite: number,
         * period: string,
         * date: string,
         * format: string,
         * token_auth: string}}}
         */
        function $get() {
            return {
                default: defaultParams
            };
        }

        return provider;

    }

})(angular);