'use strict';

angular.module('imgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allProjects', {
        url: '/allProjects',
        templateUrl: 'app/allProject/allProject.html',
        controller: 'AllProjectCtrl'
      });
  });