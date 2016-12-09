'use strict';

angular.module('imgApp')
  .controller('AllProjectCtrl', function ($scope, $http, socket, Auth, $location, fileUpload) {
    
    $http.get('/api/imgs').then(function (response){
      $scope.allProjects = response.data;
      console.log($scope.allProjects);
    });

    $http.get('/api/users/companies').then(function (response){
      $scope.allCompanies = response.data;
    });

    $http.get('/api/imgs/files/getAll').then(function (response){
      $scope.files = response.data;
      console.log($scope.files);
    });

    $scope.approvalStatusUpdate = function(index, status){
      var projid = $scope.allProjects[index]._id;
      console.log(status);
      $scope.data = { isApproved: status };
      $http.put('/api/imgs/' + projid, $scope.data).then(function (response){
        console.log(response);
      });
    }

    $scope.approvalStatusUpdateCompany = function(index, status){
      var companyid = $scope.allCompanies[index]._id;
      $scope.data = { isApproved: status };
      $http.put('/api/users/' + companyid, $scope.data).then(function (response){
        console.log(response);
      });
    }
    
  });
