(function() {
    'use strict';

    describe('ngPiwik module\n', function() {

        beforeEach(function(){
            module('clearcode.components.ngPiwik');
        });

        describe('Piwik service\n', function() {

            var PiwikService;

            beforeEach(inject(function($injector){
                PiwikService = $injector.get('Piwik');
            }));

            it('should exits\n', serviceShouldExist);

            describe('function getStatistic', function() {
                var returnedObject;
                var deferred;

                beforeEach(inject(function($q, $injector) {

                    function TransformeClass(object) {
                        return {
                            value1: object.value1
                        }
                    }

                    var $piwikProvider = $injector.get('$piwik');
                    $piwikProvider.when('name', {method: 'someMethod', idSite: 7});
                    deferred = $q.defer();
                    returnedObject = PiwikService.getStatistic('someMethod', {}, TransformeClass);
                }));

                it('should return object', shouldReturnPromise);

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