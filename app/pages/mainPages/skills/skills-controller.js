'use strict';

/**
 * @ngdoc function
 * @name rolandApp.controller:SkillsCtrl
 * @description
 * # SkillsCtrl
 * Controller of the rolandApp
 */
angular.module('mainPages.skills', ['skills.demos'])
  .config(function($stateProvider) {
    $stateProvider
      // SKILLS PAGE =================================
      .state('skills', {
        url: '/skills',
        views: {
          '@': {//This means, display these in the ui-view without a name (no name before the @), in index.html(no name after the @).
            templateUrl: 'pages/mainPages/skills/skills.html',
            controller: 'SkillsCtrl'
          },
          'siteRoot@': {
            templateUrl: 'pages/mainPages/verticalNav.html',
            controller: 'RootCtrl'
          }
        }
      })

      .state('skills.demos', {
        url: '/:id',
        views: {
          '@': {
            templateUrl: 'pages/mainPages/skills/demos/skillsDemos.html',
            controller: 'SkillsdemoCtrl'
          }
        }
      });
  })

  .controller('SkillsCtrl', function ($scope) {
    $(function(){
      $scope.demoMessage = $('.mobileMainMenu').css('display') === 'block' ? 'Click on the "Demos" button'  : 'Hover with the mouse at the top left corner';
    });
  });




