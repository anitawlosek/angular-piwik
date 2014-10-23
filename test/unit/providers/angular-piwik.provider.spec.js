(function() {
    'use strict';

    describe('angularPiwik module\n', function() {

        beforeEach(function(){
            module('angularPiwik');
        });

        describe('$piwik provider\n', function() {
            var $piwikProvider;

            beforeEach(inject(function($injector) {
                $piwikProvider = $injector.get('$piwik');
            }));

            it('should exist\n', providerShouldExist);

            function providerShouldExist() {
                expect($piwikProvider).toBeDefined();
            }
        });
    });
})();