'use strict';

/**
 * @ngdoc function
 * @name rolandApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rolandApp
 */
angular.module('mainPages.about', [])
  .config(function($stateProvider) {
    $stateProvider
      // ABOUT STATE  =================================
      .state('about', {
        url: '/about',
        views: {
          '@': {
            templateUrl: 'pages/mainPages/about/about.html',
            controller: 'AboutCtrl'
          },
          'siteRoot@': {
            templateUrl: 'pages/mainPages/verticalNav.html',
            controller: 'RootCtrl'
          }
        }
      });
  })

  .controller('AboutCtrl', function ($scope, carouselData) {
      for(var i=0; i<carouselData.details.length; i++){ //carouselData is a factory service. See below
        $scope.qualities = carouselData.details[0];
      }
  });








