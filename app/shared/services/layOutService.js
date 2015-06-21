'use strict';

/**
 * @ngdoc function
 * @name rolandApp.service:Service used to adjust the layout
 * @description
 * # Layout service
 * Service of the rolandApp
 */
angular.module('imagesDisplay.stacked')
  .service('layOutServant', function($location){
      this.showHide = function(){
        $('.calloutButton').mouseenter(function () {
          $('.sideMenu').show('fast');
        });

        $('.sideMenu').on('click', function () {
          $(this).hide('slow');
        });

        $('.sideMenu').on('mouseleave', function () {
          $(this).hide('slow');
        });

        ////The next lines of code are just for decorative purposes, adjusting the layout for these pages alone.
        //var refHeight = $('.centralDisplayBox').height();
        //$('.home-page').css({height: refHeight + 'px', border: 'solid 1px red'});
        //$('.jumbotron').css({height: refHeight + 'px', border: 'solid 1px red'});
      };

  });
