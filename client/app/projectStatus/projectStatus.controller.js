'use strict';

angular.module('imgApp')
  .controller('ProjectStatusCtrl', function ($scope, $http, $state , socket, Auth, $location, fileUpload) {
    

    $http.get("/api/users/me").then(function (response){
      console.log(response.data.projectsCreated);
      $scope.projectsCreated = response.data.projectsCreated;
    });

    $scope.editProj=function(){
      $state.go('editProject', {projid: $scope.selectedProject._id});
    }

    $scope.getStatus = function (index){
      $scope.selectedProject = $scope.projectsCreated[index];
      console.log($scope.selectedProject);
      var projid = $scope.projectsCreated[index]._id;
      console.log(projid);
      $http.get("/api/imgs/" + projid).then(function (response){
        $scope.studentsApplied = response.data.studentsApplied;
        console.log($scope.studentsApplied);
      });
      $http.get("/api/imgs/files/" + projid).then(function (response){
        $scope.files = response.data;
        console.log($scope.files);
      })

      $scope.fileDownloadLink = "/api/imgs/file/" + projid;

    }
    
  });
