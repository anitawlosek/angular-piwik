(function(angular) {
    'use strict';

    angular
        .module('myApp')
        .controller('MyCtrl', ['clearcode.components.ngPiwik.Piwik', '$scope', '$q', function(Piwik, $scope, $q) {

            var TranformClass = function(object) {
                var $this = this;

                $this.countryCode = object.countryCode;
                $this.city = object.city;
                $this.datetimeObject = new Date(object.lastActionDateTime);
            };

            Piwik.getStatistic('getLastVisitsDetails', {}, TranformClass)
                .then(function(response) {
                    $scope.results = response;
                }, function(error) {
                    $scope.results = 'error: ' + error;
                });
        }]);

})(angular);