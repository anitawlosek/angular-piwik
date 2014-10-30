(function(angular){
    'use strict';

    describe('ngPiwik module\n', function() {
        var angularPiwikModule;
        var dependencies = [];

        var hasModule = function (module) {
            return dependencies.indexOf(module) >= 0;
        };

        beforeEach(function() {
            angularPiwikModule = angular.module('clearcode.components.ngPiwik');
            dependencies = module.requires;
        });

        it('should exist', moduleShouldExist);

        function moduleShouldExist() {
            expect(angularPiwikModule).toBeDefined();
        }
    });
})(angular);