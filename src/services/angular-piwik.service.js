(function (angular) {
    'use strict';

    /**
     * @ngdoc service
     * @name clearcode.components.ngPiwik.AngularPiwik
     */
    angular
        .module('clearcode.components.ngPiwik')
        .service('AngularPiwik', AngularPiwik);

    /**
     * Service for piwik statistics
     *
     * @param $http
     * @param $q
     * @param $piwikProvider
     *
     * @ngInject
     */
    function AngularPiwik($http, $q, $piwikProvider) {

        var self = this;
        self.getStatistic = getStatistic;

        /**
         * Get last visit metric information
         *
         * @param {string} paramsId
         * @param {Object} [otherParams]
         *
         * @returns {Promise}
         */
        function getStatistic(paramsId, otherParams) {
            var params = getParamsObject(paramsId, otherParams),
                deferred = $q.defer(),
                baseUrl = $piwikProvider.getBaseUrl();

            $http.get(baseUrl + serialize(params, '?'))
                .success(function (resp) {
                        deferred.resolve(resp);
                })
                .error(function (err) {
                    deferred.resolve(err);
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
            var params = angular.extend($piwikProvider.requests.defaultParams, $piwikProvider.requests[paramsId]);

            if(otherParams) {
                params = angular.extend(params, otherParams);
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