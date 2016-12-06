'use strict';

angular.module('imgApp')
  .controller('CreateProjectCtrl', function ($scope, $http, socket, Auth, $location, fileUpload) {
    
    $scope.errors = {};
    
    // $scope.submit = function(){
    //   $scope.data = {
    //     name: $scope.name,
    //     description: $scope.description,
    //     incentives: $scope.incentives,
    //     createdBy: Auth.getCurrentUser()._id
    //   }
    
    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.data = {
         name: $scope.name,
         description: $scope.description,
         incentives: $scope.incentives,
         createdBy: Auth.getCurrentUser()._id

       }
       
        
    };

    var file = $scope.myFile;
        console.dir(file);
        var uploadUrl = "/api/imgs/";
        fileUpload.uploadFileToUrl(file, uploadUrl, $scope.data);
       $location.path('/');
      
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
