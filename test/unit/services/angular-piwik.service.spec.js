(function() {
    'use strict';

    describe('ngPiwik module\n', function() {

        beforeEach(function(){
            module('clearcode.components.ngPiwik');
        });

        describe('AngularPiwik service\n', function() {

            var angularPiwikService;

            beforeEach(inject(function($injector){
                angularPiwikService = $injector.get('AngularPiwik');
            }));

            it('should exits\n', serviceShouldExist);

            describe('function getStatistic', function() {
                var returnedObject;
                var deferred;

                beforeEach(inject(function($q, $injector) {
                    var $piwikProvider = $injector.get('$piwik');
                    $piwikProvider.when('name', {method: 'someMethod', idSite: 7});
                    deferred = $q.defer();
                    returnedObject = angularPiwikService.getStatistic('someMethod');
                }));

                it('should return object', shouldReturnPromise);

                function shouldReturnPromise() {
                    expect(returnedObject).toBeDefined();
                    expect(returnedObject).toEqual(jasmine.any(Object));
                    expect(returnedObject).toEqual(deferred.promise);
                }

            });

            function serviceShouldExist() {
                expect(angularPiwikService).toBeDefined();
            }
        });
    });

})();