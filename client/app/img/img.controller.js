'use strict';

angular.module('imgApp')
  .controller('ImgCtrl', function ($scope, fileUpload) {
     $scope.uploadFile = function(){
            var file = $scope.myFile;
            console.log('file is ' );
            console.dir(file);
            var uploadUrl = "/api/imgs";
            fileUpload.uploadFileToUrl(file, uploadUrl);
    };

  });
