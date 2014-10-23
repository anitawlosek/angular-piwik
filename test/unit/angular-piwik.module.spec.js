(function(angular){
    'use strict';

    describe('angularPiwik module\n', function() {
        var angularPiwikModule;
        var dependencies = [];

        var hasModule = function (module) {
            return dependencies.indexOf(module) >= 0;
        };

        beforeEach(function(){
            angularPiwikModule = angular.module('angularPiwik');
            dependencies = module.requires;
        });

        it('should exist', moduleShouldExist);

        function moduleShouldExist() {
            expect(angularPiwikModule).toBeDefined();
        }
    });
})(angular);