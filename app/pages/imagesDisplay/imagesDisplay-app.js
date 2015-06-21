'use strict';
/*
 *  Second level Module of the rolandApp.
 *  It's job is to link the imagesDisplay controllers, services and other .js files to the main rolandApp.
 */
angular.module('rolandApp.imagesDisplay', [
  'imagesDisplay.stacked',
  'imagesDisplay.grid'
]);
