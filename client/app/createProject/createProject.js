'use strict';

angular.module('imgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createProject', {
        url: '/createProject',
        templateUrl: 'app/createProject/createProject.html',
        controller: 'CreateProjectCtrl'
      });
  });