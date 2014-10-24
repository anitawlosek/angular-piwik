(function(angular){
    'use strict';

    angular
        .module('clearcode.components.ngPiwik')
        .provider('$piwik', PiwikProvider);

    /**
     *
     * @returns {{when: when, $get: $get}}
     */
    function PiwikProvider() {

        var $this = this;
        $this.when = when;
        $this.requests = {};

        $this.requests.defaultParams = {
            module: 'API',
            method: 'Live.getLastVisitsDetails',
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
         * @param id
         * @param params
         * @returns {PiwikProvider}
         */
        function when(id, params) {
            $this.requests[id] = angular.extend($this.requests.defaultParams, params);

            return $this;
        }

    }

})(angular);