'use strict';

/**
 * @ngdoc function
 * @name rolandApp.directive : Custom Modal Directive
 * @description
 * # A custom modal directive that displays images differently.
 * Directive of the rolandApp
 */
angular.module('imagesDisplay.grid')
.directive("customModal", function(){
  return {
    restrict: 'EA',
    link: function(scope){
      var ovlay1 = angular.element('#roldal');
      var ovlay2 =  angular.element('#roldal_over');

      scope.showInModal = function(idx){
        var rol_image = $('<img/>');  //Create the image tag
        var rol_title = $('<p></p>');
        var rol_owner = $('<span></span>');
        var closeX_icon = $('<img/>');
        var browseWidth = document.documentElement.clientWidth; //Device screen width
        var displayWidth = 0.9 * browseWidth; //width of the image display box should be 70% of the screen size.
        var displayHeight = (browseWidth/1.944444444); // For every one unit of height, the width should be 1.944444444.
        var displayMargin;
        var maximumWidth = '960px';
        closeX_icon.attr("src", "images/close_normal.png").addClass('closeX'); // Image used to close the image box
        if(browseWidth > 1100){
          displayWidth = maximumWidth;
        }
        displayMargin = (displayWidth/2);  // This will be used to calculate the margin-left property of the display box(ovlay2), in order to centralize it.
        ovlay1.css({
          width: '100%',
          height: '100%',
          left: '0px'
        });

        ovlay2.css({
          width: displayWidth,
          height: displayHeight,
          left: '50%',
          marginLeft: -displayMargin,
          maxHeight: '650px',
          minHeight: '185.143px'
        });
        $("html, body").animate({ scrollTop: 0 }, "fast");  //In very narrow devices, the image box get's hidden at the top, requires a scroll to top

        //++++++++++++++++ BUILD THE IMAGE URL using the Flickr raw data passed from ng-repeat in the view ++++++++++++++++++++++++++++++++++
        rol_image.addClass('modalImg').attr("src", "images/demoPhotos/" + idx.title + ".jpg");
        //++++++++++++++++ END OF IMAGE BUILD +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        rol_image.css({width: '100%', height: '100%'}); //Since the image box width and height are calculated above, now, just set image itself to get it's parent size.

        rol_title.html('<span> Title : ' + idx.title + '</span><br/>').addClass('bigImageTitle'); // Put the image title inside an h1 tag and give it a class.
        rol_owner.html('Description : ' + idx.description);
        rol_owner.addClass('imageOwner');

        ovlay2.html('');  // Clear the image box before loading a new one, to prevent multiple
        rol_title.append(rol_owner);
        ovlay2.append(closeX_icon, rol_image, rol_title);  // Put the close icon(will be positioned using css), main image, and title in the image box
        $(rol_title).css({
          backgroundColor: '#cccccc',//'rgb(207, 165, 109)',
          width: '40%',
          fontFamily: 'Marmelad, Arial, Helvetica, sans-serif',
          padding: '4px',
          fontSize: '15px',
          border: 'solid 3px #ffffff',
          borderRadius: '7px',
          marginLeft: '-10px',
          marginTop: '-15px',
          position: 'absolute',
          minWidth: '250px'
        });

        showOvlay();   // Now, call this function that makes both the dark overlay and image box visible.
        function showOvlay(){
          ovlay1.css('display', 'block');
          ovlay2.css('display', 'block');
        }

        //++++++++ Program the listening for a close click event and close the overlay and image box. +++++++++++++++++
        $('.closeX, #roldal').on('click', function() {
          ovlay1.css('display', 'none');
          ovlay2.css('display', 'none');
        }).on('mouseover', function(){
          $(this).attr("src", "images/close_hover.png")
        }).on('mouseout', function(){
          $(this).attr("src", "images/close_normal.png")
        });

      };
    }
  };
});
