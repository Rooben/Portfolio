'use strict';

/**
 * @ngdoc function
 * @name rolandApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the rolandApp
 */
angular.module('mainPages.contact', [])
  .config(function($stateProvider) {
    $stateProvider
      // Contact PAGE =================================
      .state('contact', {
        url: '/contact',
        views: {
          '@': {
            templateUrl: 'pages/mainPages/contact/contact.html',
            controller: 'ContactCtrl'
          },
          'siteRoot@': {
            templateUrl: 'pages/mainPages/verticalNav.html',
            controller: 'RootCtrl'
          }
        }
      })
  })

  .controller('ContactCtrl', function ($scope) {
    $(document).ready(function(){
      $('#feedbkLoader').hide();
    });
  });

