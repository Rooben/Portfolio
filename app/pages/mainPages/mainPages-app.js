'use strict';
/*
*  Second level Module of the rolandApp.
*  It's job is to link the mainPages controlers, services and other .js files to the main rolandApp.
*/
angular.module('rolandApp.mainPages', [
  'mainPages.about',
  'mainPages.contact',
  'mainPages.home',
  'mainPages.projects',
  'mainPages.skills'
]);
