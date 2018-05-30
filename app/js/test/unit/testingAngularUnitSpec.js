describe('Testing AngularJS Test Suite', function () {

    beforeEach(module('testingAngularApp'));

    describe('Testing AngularJS Controller', function () {

        var scope, ctrl, httpBackend,timeout;

        beforeEach(inject(function ($controller,$rootScope, $httpBackend,$timeout) {
            scope=$rootScope.$new();
            ctrl = $controller('testingAngularCtrl', { $scope: scope });
            httpBackend = $httpBackend;
            timeout=$timeout;
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should initialize the title in the scope', function () {
            expect(scope.title).toBeDefined();
            expect(scope.title).toBe("Testing AngularJS Applications");
        });


        // Testing a function
        it('should add 2 destinations to destinations list', function () {
            expect(scope.destinations).toBeDefined();
            expect(scope.destinations.length).toBe(0);
            scope.newDestination = {
                city: 'London',
                country: 'England'
            };

            scope.addDestination();

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe('London');
            expect(scope.destinations[0].country).toBe('England');

            scope.newDestination = {
                city: 'Bengaluru',
                country: 'India'
            };

            scope.addDestination();

            expect(scope.destinations.length).toBe(2);
            expect(scope.destinations[1].city).toBe('Bengaluru');
            expect(scope.destinations[1].country).toBe('India');
        });


        //Testing another function
        it('remove a destination from the destination list', function () {
            scope.destinations = [scope.newDestination = {
                city: 'London',
                country: 'England'
            }, scope.newDestination = {
                city: 'Bengaluru',
                country: 'India'
            }];

            expect(scope.destinations.length).toBe(2);

            scope.removeDestination(0);

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe('Bengaluru');
            expect(scope.destinations[0].country).toBe('India');
        });

        //Testing getWeather function which is using $http service
        it('should update the weather for specific destination', function () {
            scope.destination = {
                city: "Gorakhpur",
                country: "India"
            };

            httpBackend.expectGET("http://api.openweathermap.org/data/2.5/weather?q=" 
                + scope.destination.city + "&appid=" + scope.apiKey)
                .respond({
                    weather:[{main: 'Rain', detail:'Light Rain'}],
                    main:{temp:288}
                });

            scope.getWeather(scope.destination);

            httpBackend.flush();

            expect(scope.destination.weather.main).toBe('Rain');
            expect(scope.destination.weather.temp).toBe(15);

        });

        // Testing $timeout service.
        it('should remove the error message after a fixed period of time',function(){
            scope.message="Error";
            expect(scope.message).toBe('Error');

            scope.$apply();  // Since digest cycle must be started because $timeout is being set in a watcher which can only be triggered by a digest cycle
            timeout.flush();
            expect(scope.message).toBeNull();
        });
    });
});