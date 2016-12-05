'use strict';

angular.module('imgApp')
  .controller('ProjectCtrl', function ($scope, $http, socket, Auth, $location, fileUpload) {
    $scope.allProjects = [];
    $http.get('/api/imgs').then(function (response){
      $scope.totalProjects = response.data;
      for(var i=0; i<$scope.totalProjects.length; i++){
        if($scope.totalProjects[i].isApproved)
          $scope.allProjects.push($scope.totalProjects[i]);
      }
      console.log($scope.allProjects);
    });

    $http.get('/api/imgs/files/getAll').then(function (response){
      $scope.files = response.data;
      console.log($scope.files);
    });

    $scope.userid = Auth.getCurrentUser()._id;

    $scope.getInfo = function(index){
      $scope.selectedProject = $scope.allProjects[index];
      console.log($scope.selectedProject);
    }

    $scope.applyForProject = function(projid){
      console.log($scope.userid);
      $scope.data = {
        userid: $scope.userid,
        projectid: projid
      }

      var file = $scope.myFile;
      console.dir(file);
      var uploadUrl = "/api/users/apply";
      fileUpload.uploadFileToUrl2(file, uploadUrl, $scope.data);

      // $http.post('/api/users/apply', $scope.data).then(function (response){
      //   console.log(response.data);
      //   alert("Successfully applied");
      //   $location.url('/');
      // }, function(err){
      //   alert("There was some error");
      //   $location.url('/');
      // });
    }
    
  });
