'use strict';

/**
 * @ngdoc function
 * @name rolandApp.service:Service used to adjust the layout, also to hide and show the sideMenu
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
          if(document.documentElement.clientWidth >= 768) {
            $(this).hide('slow');
          }
        });

        $('.sideMenu').on('mouseleave', function () {
          $(this).hide('slow');
        });
      };

      // Toggle sideMenu only, required by the touch screen devices (no hover event).
      var status = 1;
      this.enableSideMenu = function(){
        if(status === 2){
          $('.sideMenu').hide('fast');
          status = 1;
        }else{
          $('.sideMenu').show('fast');
          status = 2;
        }
      };

  });
