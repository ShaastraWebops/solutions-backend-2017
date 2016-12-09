'use strict';

angular.module('imgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editProfile', {
        url: '/editProfile',
        templateUrl: 'app/editProfile/editProfile.html',
        controller: 'EditProfileCtrl',
        access: {
          allow: ['user', 'company', 'admin']
        } 
      });
  });