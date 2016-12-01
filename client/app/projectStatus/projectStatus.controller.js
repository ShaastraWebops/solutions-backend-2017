'use strict';

angular.module('imgApp')
  .controller('ProjectStatusCtrl', function ($scope, $http, socket, Auth, $location, fileUpload) {
    

    $http.get("/api/users/me").then(function (response){
      console.log(response.data.projectsCreated);
    });

    $scope.getStatus = function (projid){
      $http.get("/api/imgs/" + projid).then(function (response){
        $scope.studentsApplied = response.data.studentsApplied;
      });
      $http.get("/api/imgs/files/" + projid).then(function (response){
        $scope.files = response.data;
      })

    }
    
  });
