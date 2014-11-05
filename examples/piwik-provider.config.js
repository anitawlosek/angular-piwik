(function(angular) {
    'use strict';

    angular
        .module('myApp')
        .config(['clearcode.components.ngPiwik.$piwikProvider', function($piwikProvider) {
            $piwikProvider
                .when('getLastVisitsDetails', {
                    method: 'Live.getLastVisitsDetails',
                    idSite: 7,
                    period: 'day',
                    date: 'today'
                })
                .when('getMostRecentVisitorId', {
                    method: 'Live.getMostRecentVisitorId',
                    idSite: 7
                });
        }]);
    
})(angular);