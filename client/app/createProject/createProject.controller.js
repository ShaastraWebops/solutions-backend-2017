'use strict';

angular.module('imgApp')
  .controller('CreateProjectCtrl', function ($scope, $http, socket, Auth, $location) {
    

    $scope.submit = function(){
      $scope.data = {
        name: $scope.name,
        description: $scope.description,
        incentives: $scope.incentives,
        createdBy: Auth.getCurrentUser()._id
      }
      $http.post("/api/imgs", $scope.data).then(function (response){
        console.log(response.data);
        alert("Successfully created");
        $location.url('/');
      }, function(err){
        alert("There was some error");
        $location.url('/');
      });  
    }
    
  });
