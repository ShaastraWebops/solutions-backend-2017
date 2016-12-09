'use strict';

angular.module('imgApp')
.service('fileUpload', ['$http', function ($http) {
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
        })
        .error(function(){
            alert("There was some error. Please try again");
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
        })
        .error(function(){
            alert("There was some error. Please try again");
        });
    }
}]);

