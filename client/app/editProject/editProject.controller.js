'use strict';
(function(){

function EditProjectComponent($scope,$http,$stateParams,Auth,$location,$window) {
  var projid=$stateParams.projid;
  $scope.selectedProj = {};
  

  $http.get("/api/imgs/"+projid).then(function (response){
      
      $scope.selectedProj = response.data;
  	  $scope.projectName = $scope.selectedProj.name;
  	  $scope.projectDescription = $scope.selectedProj.description;
  	  $scope.projectIncentives = $scope.selectedProj.incentives;
    });
  

  	$scope.getCurrentUser = Auth.getCurrentUser;
  	$scope.user=$scope.getCurrentUser().name;
	
  	$scope.upProject=function(form){
  		$scope.submitted=true;
		
		if (form.$valid){
		  		$http.put('/api/imgs/' + projid,{
		          name: $scope.projectName,
			      description:$scope.projectDescription,
			      incentives:$scope.projectIncentives

		        })
		        .then( function() {
			          //$scope.message = 'Profile successfully updated.';
			          //$window.location.href = '/auth/' + provider;
			          alert('successfully edited');
			          $window.location.reload();
			        });
		}
  	};
	

	



}




angular.module('imgApp')
  .component('editProject', {
    templateUrl: 'app/editProject/editProject.html',
    controller: EditProjectComponent
  });

})();
