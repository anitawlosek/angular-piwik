(function(angular){
    'use strict';

    /**
     * @ngDoc module
     * @name clearcode.components.ngPiwik
     */
    angular
        .module('clearcode.components.ngPiwik', []);

})(angular);
(function(angular){
    'use strict';

    /**
     * @ngDoc provider
     * @name clearcode.components.ngPiwik.$piwik
     */
    angular
        .module('clearcode.components.ngPiwik')
        .provider('clearcode.components.ngPiwik.$piwik', PiwikProvider);

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
             var extendedParams = JSON.parse(JSON.stringify($this.requests.defaultParams));
             angular.extend(extendedParams, params);

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
(function (angular) {
    'use strict';

    /**
     * @ngdoc service
     * @name clearcode.components.ngPiwik.Piwik
     */
    angular
        .module('clearcode.components.ngPiwik')
        .service('clearcode.components.ngPiwik.Piwik', Piwik);

    Piwik.$inject = [
        '$http',
        '$q',
        'clearcode.components.ngPiwik.$piwik',
        'clearcode.components.ngPiwik.DataTransformer'
    ];

    /**
     * Service for piwik statistics
     *
     * @param $http
     * @param $q
     * @param $piwik
     * @param DataTransformer
     *
     * @ngInject
     */
    function Piwik($http, $q, $piwik, DataTransformer) {

        var self = this;
        self.getStatistic = getStatistic;

        /**
         * Get last visit metric information
         *
         * @param {string} paramsId
         * @param {Object} [otherParams]
         * @param {function} [TransformClass]
         *
         * @returns {Promise}
         */
        function getStatistic(paramsId, otherParams, TransformClass) {

            var params = getParamsObject(paramsId, otherParams),
                deferred = $q.defer(),
                baseUrl = $piwik.getBaseUrl(),
                dataTransformer = new DataTransformer(TransformClass),

                httpConfig = {
                    method: 'GET',
                    url: baseUrl + '?' + serialize(params),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    transformResponse: dataTransformer.transform
                };

            $http(httpConfig)
                .success(function (resp) {
                    deferred.resolve(resp);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        /**
         *
         * @param paramsId
         * @param otherParams
         * @returns {Object}
         */
        function getParamsObject(paramsId, otherParams) {
            var params = JSON.parse(JSON.stringify($piwik.requests.defaultParams));
            angular.extend(params, $piwik.requests[paramsId]);

            if(otherParams) {
                angular.extend(params, otherParams);
            }

            return params;
        }

        /**
         *
         * @param obj
         * @param [prefix]
         * @returns {string}
         */
        function serialize(obj, prefix) {
            var str = [];
            for(var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                    str.push(typeof v === 'object' ?
                        serialize(v, k) :
                    encodeURIComponent(k) + '=' + encodeURIComponent(v));
                }
            }
            return str.join('&');
        }
    }

})(angular);