#ngPiwik
Module ngPiwik helps with using Piwik API in your Angular project.

##Dependencies
To use ngPiwik you need to install also:
* AngularJS ~1.3.0
* angular-mocks ~1.3.0

##Installation
Install with [bower](http://bower.io/):
```
bower install ngPiwik --save
```

##Usage
Add ngPiwik to your angular app:
```
angular.module('myApp', ['clearcode.components.ngPiwik']);
```
Then create a config file to set API methods using requests params from [piwik API side](http://developer.piwik.org/api-reference/reporting-api)
```
angular
    .module('myApp')
    .config(['clearcode.components.ngPiwik.$piwikProvider', function($piwikProvider) {
        $piwikProvider
            .when('yourRequestId', {
                //request params
            })
            .when(...);
    }];
```
Now you can use your request id to get statistics from servis:
```
angular
    .module('myApp')
    .controller('MyCtrl', ['clearcode.components.ngPiwik.Piwik', function(Piwik) {
    
        var TranformClass = function(object){
            var $this = this;
            
            $this.value1 = object.value1;
            $this.value2 = object.value2;
            $this.value4 = object.value4;
        }
    
        var results = Piwik.getStatistic('yourRequestId', {}, TranformClass);
    }]);
```

##Example

Config:

```
angular
    .module('myApp')
    .config(['clearcode.components.ngPiwik.$piwikProvider', function($piwikProvider) {
        $piwikProvider
            .when('getLastVisitsDetails', {
               method: 'Live.getLastVisitsDetails',
               idSite: 7,
               period: 'day',
               date: 'today',
               format: 'JSON',
               token_auth: 'anonymous'
            })
            .when('getMostRecentVisitorId', {
               method: 'Live.getMostRecentVisitorId',
               idSite: 7,
               format: 'JSON',
               token_auth: 'anonymous'
            });
    }];
```
Using service:
```
angular
    .module('myApp')
    .controller('MyCtrl', ['clearcode.components.ngPiwik.Piwik', function(Piwik) {
    
        var TranformClass = function(object) {
            var $this = this;
            
            $this.countryCode = object.countryCode;
            $this.city = object.city;
            $this.datetimeObject = new Date(object.lastActionDateTime);
        }
    
        var results = Piwik.getStatistic('getLastVisitsDetails', {}, TranformClass);
    }]);
```
