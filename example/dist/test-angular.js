var app = angular.module('test', []);

app.controller('TestCtrl', ['$location', function($location) {
}]);

(function(angular) {
    angular.module('test')
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('/test.html', '<p class=test ng-class="{ test: \'test\' }">test</p><h3>test</h3>');
        }]);
}(angular));
