'use strict';

/**
 * @ngdoc function
 * @name rolandApp.service:Text modifying filter service
 * @description
 * # Removes underscores and hyphens from the image titles.
 * Filter service of the rolandApp
 */
angular.module('imagesDisplay.stacked')
.filter('textModifier', function(){
  return function(inputString){
    if(typeof inputString !== 'string'){
      return inputString;
    }else{
      return inputString.toUpperCase().replace(/_|-/gi, ' ');
    }
  }
});
