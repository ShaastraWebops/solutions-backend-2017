'use strict';

angular.module('imgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('img', {
        url: '/img',
        templateUrl: 'app/img/img.html',
        controller: 'ImgCtrl'
      });
  });