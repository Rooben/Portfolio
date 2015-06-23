'use strict';

/**
 * @ngdoc function
 * @name rolandApp.service:Text modifying filter service
 * @description
 * # Puts a hyphen infront of any camel cased word in the image tittle to which this filter is applied.
 * Filter service of the rolandApp
 */
angular.module('imagesDisplay.stacked')
.filter('textModifier', function(){
  return function(inputString){
    if(typeof inputString !== 'string'){ //If this filter is applied to a non-string, just let it pass as is.
      return inputString;
    }else{
      //In order to manipulate the string as an array, first we have to convert it to a real array.
      var stringArray;   // This variable will hold the converted array.
      for(var i= 0, len = inputString.length; i < len; i++){
        if(inputString.charAt(i) === inputString.charAt(i).toUpperCase()){ //Checks if there is an upper case character in the input string.
          stringArray = inputString.split("");   //Converts sting to array and assigns it to the stringArray variable.
          stringArray.splice(i, 0,'-');          //Now, our string can be manipulated as an array by inserting a '-' before the chosen upper case letter.
          stringArray = stringArray.join('').toUpperCase(); //Fianlly, .join('') removes the comas and quotes from entire array and reconverts it to
                                                            // string, and next manipulation converts to upper case.
          return stringArray;  // Display the manipulated sting.
        }
      }

      return inputString.toUpperCase();  // In a case where string has no upper case letter, still convert it to upper case before displaying it.
    }
  }
});
