var angular = {
    module: function module() {
        return {
            controller: function controller() {}
        };
    }
};

var app = angular.module('test', []);

app.controller('TestCtrl', function ($location) {
    return $location;
});

(function (angular) {
    angular.module('lentil.test').run(['$templateCache', function ($templateCache) {
        $templateCache.put('/test.html', '<p class=test ng-class="{ test: \'test\' }">test</p> <h3>test</h3> ');
    }]);
})(angular);