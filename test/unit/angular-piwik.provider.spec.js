(function() {
    'use strict';

    describe('angular-piwik module\n', function(){
        var $angularPiwikProvider;

        beforeEach(function(){
            module('angularPiwik');
        });

        describe('$angular-piwik provider\n', function(){

            beforeEach(inject(function($injector) {
                $angularPiwikProvider = $injector.get('$angularPiwik');
            }));

            it('should exist\n', function () {
                expect($angularPiwikProvider).toBeDefined();
            });

        });

    });

})();