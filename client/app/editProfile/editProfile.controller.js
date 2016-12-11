'use strict';

angular.module('imgApp')
  .controller('EditProfileCtrl', function ($scope, $http, User, Auth, $window, $location) {
  	$scope.errors = {};
  	$scope.user = {};
  	$scope.regEx="[0-9]{10}"
  	$scope.getCurrentUser = Auth.getCurrentUser;

 //  	$scope.upProfile = function(form) {
 //      $scope.submitted = true;
 //      if(form.$valid) {
	//        Auth.update({
	//           //oldPassword: $scope.user.oldPassword,
	//           name: $scope.user.name,
	//           email: $scope.user.email,
	//           phone: $scope.user.phone
	          
	//         })
	//         .then( function() {
	//           $scope.message = 'Profile details successfully changed.';
	//           $location.path('/');
	//         })
	//         .catch( function(err) {
	//           form.password.$setValidity('mongoose', false);
	//           $scope.errors.other = 'Incorrect password';
	//           $scope.message = '';
	//           err = err.data;
	//           $scope.errors = {};

	//           // Update validity of form fields that match the mongoose errors
	//           // angular.forEach(err.errors, function(error, field) {
	//           //   form[field].$setValidity('mongoose', false);
	//           //   $scope.errors[field] = error.message;
	//           // });
	//       	})
 //      }	
	// };
	 

    $scope.upProfile = function() {
        $http.put('/api/users/' + Auth.getCurrentUser()._id,{
          name: $scope.user.name,
	      email: $scope.user.email,
	      phone: $scope.user.phone,

        })
        .then( function() {
	          //$scope.message = 'Profile successfully updated.';
	          //$window.location.href = '/auth/' + provider;
	          $location.path('/');
	        });
    }    

      $scope.deleteProfile = function() {
        $http.delete('/api/users/' + Auth.getCurrentUser()._id)
        .then( function() {
	          $scope.message = 'Profile successfully deleted.';
	          //$location.path('/');
	        });
      };
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
    
  });


// angular.module('imgApp')
//   .controller('MainCtrl', function ($scope, $http, socket) {
//     $scope.awesomeThings = [];

//     $http.get('/api/things').success(function(awesomeThings) {
//       $scope.awesomeThings = awesomeThings;
//       socket.syncUpdates('thing', $scope.awesomeThings);
//     });

//     $scope.addThing = function() {
//       if($scope.newThing === '') {
//         return;
//       }
//       $http.post('/api/things', { name: $scope.newThing });
//       $scope.newThing = '';
//     };

//     $scope.deleteThing = function(thing) {
//       $http.delete('/api/things/' + thing._id);
//     };

//     $scope.$on('$destroy', function () {
//       socket.unsyncUpdates('thing');
//     });
//   });

//   angular.module('imgApp')
//   .controller('SettingsCtrl', function ($scope, User, Auth) {
//     $scope.errors = {};

//     $scope.changePassword = function(form) {
//       $scope.submitted = true;
//       if(form.$valid) {
//         Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
//         .then( function() {
//           $scope.message = 'Password successfully changed.';
//         })
//         .catch( function() {
//           form.password.$setValidity('mongoose', false);
//           $scope.errors.other = 'Incorrect password';
//           $scope.message = '';
//         });
//       }
// 		};
//   });
