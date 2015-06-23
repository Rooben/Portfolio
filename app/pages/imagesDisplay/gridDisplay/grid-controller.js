'use strict';

/**
 * @ngdoc function
 * @name rolandApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the rolandApp
 */
angular.module('imagesDisplay.grid', ['ngResource', 'ui.bootstrap'])
  .config(function($stateProvider) {
    $stateProvider
      // GRID STATE  ===============================
      .state('skillsImageDisplayGrid', {
        url: '/skills-imageDisplay-grid',
        views: {
          '@': {
            templateUrl: 'pages/imagesDisplay/gridDisplay/grid.html',
            controller: 'GridCtrl'
          },
          'siteRoot@': {
            templateUrl: 'pages/mainPages/verticalNav.html',
            controller: 'RootCtrl'
          }
        }
      });
  })

  .controller('GridCtrl', ['$scope', 'photos_API', function ($scope, photos_API) {
    $scope.imgs =  photos_API.query();
  }]);


