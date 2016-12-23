'use strict';

describe('Component: EditProjectComponent', function () {

  // load the controller's module
  beforeEach(module('imgApp'));

  var EditProjectComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EditProjectComponent = $componentController('EditProjectComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
