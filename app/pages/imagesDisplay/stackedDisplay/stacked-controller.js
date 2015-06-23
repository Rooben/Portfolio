'use strict';

/**
 * @ngdoc function
 * @name rolandApp.controller:StackedCtrl
 * @description
 * # StackedCtrl
 * Controller of the rolandApp
 */
angular.module('imagesDisplay.stacked', ['angularUtils.directives.dirPagination'])
  .config(function($stateProvider) {
  $stateProvider
    // STACKED STATE  ===============================
    .state('skillsImageDisplayStacked', {
      url: '/skills-imageDisplay-stacked',
      views: {
        '@': {
          templateUrl: 'pages/imagesDisplay/stackedDisplay/stacked.html',
          controller: 'StackedCtrl'
        },
        'siteRoot@': {
          templateUrl: 'pages/mainPages/verticalNav.html',
          controller: 'RootCtrl'
        }
      }
    });
  })

  .controller('StackedCtrl', ['$scope', 'photos_API', function ($scope, photos_API) {
      photos_API.query().$promise.then(
        function(data){
          $scope.flickArray = data;
        },
        function(error){
          console.log(error);
        }
      );
    $scope.currentPage = 1;
    $scope.pageSize = 2;
  }]);
