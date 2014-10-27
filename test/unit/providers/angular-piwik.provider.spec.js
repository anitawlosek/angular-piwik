(function() {
    'use strict';

    describe('ngPiwik module\n', function() {

        beforeEach(function(){
            module('clearcode.components.ngPiwik');
        });

        describe('$piwik provider\n', function() {
            var $piwikProvider;

            beforeEach(inject(function($injector) {
                $piwikProvider = $injector.get('$piwik');
            }));

            it('should exist\n', providerShouldExist);
            it('should include requests table', shouldIncludeRequests);
            it('should include function when', shouldIncludeWhen);

            describe('function when', function() {
                var returnedObject;
                var id = 'name';
                var params = {method: 'someMethod', idSite: 7};

                beforeEach(function() {
                    returnedObject = $piwikProvider.when(id, params);
                });

                it('should add settings object to requests table', shouldAddToRequests);
                it('should return provider', shouldReturnProvider);

                function shouldAddToRequests() {
                    expect($piwikProvider.requests[id]).toBeDefined();
                    expect($piwikProvider.requests[id].method).toEqual(params.method);
                    expect($piwikProvider.requests[id].idSite).toEqual(params.idSite);
                }

                function shouldReturnProvider() {
                    expect(returnedObject).toBeDefined();
                    expect(returnedObject).toEqual($piwikProvider);
                }
            });

            function providerShouldExist() {
                expect($piwikProvider).toBeDefined();
            }

            function shouldIncludeRequests() {
                expect($piwikProvider.requests).toBeDefined();
            }

            function shouldIncludeWhen() {
                expect($piwikProvider.when).toBeDefined();
            }
        });
    });
})();