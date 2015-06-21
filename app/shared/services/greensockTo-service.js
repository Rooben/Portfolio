'use strict';

/**
 * @ngdoc function
 * @name rolandApp.mainPages:greensockTo-service
 * @description
 * # mainPages:greensockTo-service
 * A service of the rolandApp
 */
angular.module('mainPages.home')
  .factory('myGsapTo', function(){
    return{
      runAnimation: function(animationTarget, duration, properties){
        TweenLite.to(animationTarget, duration, properties);
      }
    };
  });
