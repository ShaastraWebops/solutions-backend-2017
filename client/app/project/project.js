'use strict';

angular.module('imgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      });
  });