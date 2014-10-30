(function() {
    'use strict';

    describe('ngPiwik module\n', function() {

        beforeEach(function(){
            module('clearcode.components.ngPiwik');
        });

        describe('Piwik service\n', function() {

            var PiwikService;

            beforeEach(inject(function($injector){
                PiwikService = $injector.get('clearcode.components.ngPiwik.Piwik');
            }));

            it('should exits\n', serviceShouldExist);

            describe('function getStatistic', function() {
                var returnedObject,
                    deferred;

                beforeEach(inject(function($q, $injector) {

                    var $piwikProvider = $injector.get('clearcode.components.ngPiwik.$piwik');
                    $piwikProvider.when('name', {method: 'someMethod', idSite: 7});
                    deferred = $q.defer();
                    returnedObject = PiwikService.getStatistic('someMethod');
                }));

                it('should return promise', shouldReturnPromise);

                function shouldReturnPromise() {
                    expect(returnedObject).toBeDefined();
                    expect(returnedObject).toEqual(jasmine.any(Object));
                    expect(returnedObject).toEqual(deferred.promise);
                }

            });

            function serviceShouldExist() {
                expect(PiwikService).toBeDefined();
            }
        });
    });

})();