var testingAngularApp = angular.module('testingAngularApp', []);

testingAngularApp.controller('testingAngularCtrl', ['$rootScope', '$scope', '$http','$timeout', function ($rootScope, $scope, $http,$timeout) {
    $scope.title = "Testing AngularJS Applications";

    $scope.destinations = [];
    $scope.newDestination = {
        city: undefined,
        country: undefined
    };

    $scope.apiKey = '18c73359071836f6e4e7409ab9357424';

    $scope.addDestination = function () {
        $scope.destinations.push({
            city: $scope.newDestination.city,
            country: $scope.newDestination.country
        });
    };

    $scope.removeDestination = function (index) {
        $scope.destinations.splice(index, 1);
    };

    $scope.getWeather = function (destination) {
        $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + destination.city + "&appid=" + $scope.apiKey)
            .then(function (res) {
                if (res.data.weather) {
                    destination.weather = {};
                    destination.weather.main = res.data.weather[0].main;
                    destination.weather.temp = $scope.convertKelvinToCelcius(res.data.main.temp);
                } else{
                    $scope.message="City not found!!";
                }
            }, function (err) {
                $scope.message="Server error";
            });
    };

    $scope.convertKelvinToCelcius=function(temp){
        return Math.round(temp-273);
    }

    $scope.messageWatcher=$scope.$watch('message',function(){
        if($scope.message){
            $timeout(function(){
                $scope.message=null;
            },3000);
        }
    });
}]);