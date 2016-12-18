'use strict';

angular.module('imgApp')
.service('fileUpload', ['$http', '$location', function ($http, $location) {
    this.uploadFileToUrl = function(file, uploadUrl, data){
        var fd = new FormData();
        fd.append('file', file, data.name);
        fd.append('name', data.name);
        fd.append('description', data.description);
        fd.append('incentives', data.incentives);
        fd.append('createdBy', data.createdBy);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            alert("Successfully submitted");
            $location.url("/");
        })
        .error(function(){
            alert("There was some error. Please try again");
            $location.url("/");
        });
    },

    this.uploadFileToUrl2 = function(file, uploadUrl, data){
        var fd = new FormData();
        fd.append('file', file, data.projectid + "-" + data.userid);
        fd.append('userid', data.userid);
        fd.append('projectid', data.projectid);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            alert("Successfully submitted");
            $location.url("/");
        })
        .error(function(){
            alert("There was some error. Please try again");
            $location.url("/");
        });
    }
}]);

