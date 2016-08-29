var angular = {
    module: function() {
        return {
            controller: function() {}
        }
    }
};

var app = angular.module('test', []);

app.controller('TestCtrl', $location => $location);
