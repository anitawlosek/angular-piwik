(function(angular){
    'use strict';

    /**
     * @ngDoc provider
     * @name clearcode.components.ngPiwik.$piwik
     */
    angular
        .module('clearcode.components.ngPiwik')
        .provider('$piwik', PiwikProvider);

    /**
     * Piwik provider includes:
     *
     * requests - table of requests to Piwik's API
     * when - method that added to request to requests table
     * setBaseUrl - baseUrl setter
     * getBaseUrl - baseUrl getter
     * setAuthToken - auth_token setter
     * getAuthToken - auth_token getter
     *
     * @constructor
     */
    function PiwikProvider() {

        var $this = this,
            baseUrl = 'http://demo.piwik.org/';
        $this.when = when;
        $this.requests = {};
        $this.setBaseUrl = setBaseUrl;
        $this.getBaseUrl = getBaseUrl;
        $this.setAuthToken = setAuthToken;
        $this.getAuthToken = getAuthToken;

        $this.requests.defaultParams = {
            module: 'API',
            format: 'JSON',
            token_auth: 'anonymous'
        };

        /**
         * Function $get of provider
         *
         * @returns {PiwikProvider}
         */
        $this.$get = function() {
            return $this;
        };

         /**
         * Function when that added settings to requests table
         *
         * @param {string} id
         * @param {Object} params
         * @returns {PiwikProvider}
         */
        function when(id, params) {
             var extendedParams = angular.extend($this.requests.defaultParams, params);

             if(isString(id) && isValid(extendedParams)) {
                 $this.requests[id] = extendedParams;
             }

             return $this;
        }

        /**
         * Function idIsString
         *
         * @param id
         * @returns {boolean}
         */
        function isString(id) {
            return typeof(id) === 'string';
        }

        /**
         * Function isValid
         *
         * @param extendedParams
         * @returns {boolean}
         */
        function isValid(extendedParams) {
            return typeof(extendedParams.module) === 'string' &&
                   typeof(extendedParams.method) === 'string' &&
                   typeof(extendedParams.idSite) === 'number' &&
                   typeof(extendedParams.format) === 'string' &&
                   typeof(extendedParams.token_auth) === 'string';
        }

        /**
         * Function setBaseUrl
         *
         * @param {string} url
         */
        function setBaseUrl(url) {
            baseUrl = url + '?';
        }

        /**
         * Function getBaseUrl
         *
         * @returns {string} url
         */
        function getBaseUrl() {
            return baseUrl;
        }

        /**
         * Function setAuthToken
         *
         * @param {string} token
         */
        function setAuthToken(token) {
            $this.requests.defaultParams.token_auth = token;
        }

        /**
         * Function getAuthToken
         *
         * @returns {string}
         */
        function getAuthToken() {
            return $this.requests.defaultParams.token_auth;
        }
    }

})(angular);