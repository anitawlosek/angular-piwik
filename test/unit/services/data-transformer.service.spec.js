(function() {
    'use strict';

    describe('ngPiwik module\n', function() {

        beforeEach(function(){
            module('clearcode.components.ngPiwik');
        });

        describe('DataTransformer service\n', function() {
            var DataTransformerService;

            beforeEach(inject(function($injector){
                DataTransformerService = $injector.get('DataTransformer');
            }));

            it('should exits\n', serviceShouldExist);

            describe('function processResponse', function() {
                var response,
                    processData,
                    processedResponseData;

                beforeEach(function() {
                    response = [
                        {value1: 'a', value2: 'b', value3: 'c', value4: 'd', value5: 'e'},
                        {value1: 'f', value2: 'g', value3: 'h', value4: 'i', value5: 'j'},
                        {value1: 'k', value2: 'l', value3: 'm', value4: 'n', value5: 'o'},
                        {value1: 'p', value2: 'r', value3: 's', value4: 't', value5: 'u'}
                    ];

                    processData = DataTransformerService(TransformClass);
                    processedResponseData = processData(response);
                });

                it('should transform response', shouldTransformResponse);

                function shouldTransformResponse() {
                    expect(processedResponseData).toBeDefined();
                    expect(processedResponseData).toEqual(jasmine.any(Array));
                    expect(processedResponseData[0].value1).toBeDefined();
                    expect(processedResponseData[1].value2).toBeDefined();
                    expect(processedResponseData[2].value3).toBeUndefined();
                    expect(processedResponseData[3].value4).toBeDefined();
                    expect(processedResponseData[1].value5).toBeUndefined();
                }

                function TransformClass(object) {
                    this.value1 = object.value1;
                    this.value2 = object.value2;
                    this.value4 = object.value4;
                }
            });

            function serviceShouldExist() {
                expect(DataTransformerService).toBeDefined();
            }
        });
    });

})();