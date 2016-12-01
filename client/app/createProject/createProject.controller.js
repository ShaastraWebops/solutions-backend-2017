'use strict';

angular.module('imgApp')
  .controller('CreateProjectCtrl', function ($scope, $http, socket, Auth, $location, fileUpload) {
    

    $scope.submit = function(){
      $scope.data = {
        name: $scope.name,
        description: $scope.description,
        incentives: $scope.incentives,
        createdBy: Auth.getCurrentUser()._id
      }
      var file = $scope.myFile;
      console.dir(file);
      var uploadUrl = "/api/imgs/";
      fileUpload.uploadFileToUrl(file, uploadUrl, $scope.data);
      // $http.post("/api/imgs", $scope.data).then(function (response){
      //   console.log(response.data);
      //   alert("Successfully created");
      //   $location.url('/');
      // }, function(err){
      //   alert("There was some error");
      //   $location.url('/');
      // });  
    }
    
  });
