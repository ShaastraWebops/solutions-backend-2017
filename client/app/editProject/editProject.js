'use strict';

angular.module('imgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editProject', {
        url: '/editProject/:projid',
        template: '<edit-project></edit-project>'
      });
  });
