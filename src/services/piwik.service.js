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