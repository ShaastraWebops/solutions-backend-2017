'use strict';

angular.module('imgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projectStatus', {
        url: '/projectStatus',
        templateUrl: 'app/projectStatus/projectStatus.html',
        controller: 'ProjectStatusCtrl',
        access: {
          allow: ['company']
        } 
      });
  });