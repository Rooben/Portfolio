'use strict';

/**
 * @ngdoc overview
 * @name rolandApp
 * @description
 * # rolandApp
 *
 * Main module of the application.
 */
angular
  .module('rolandApp', [
    'ngResource',
    'ui.router',
    'rolandApp.mainPages',
    'rolandApp.imagesDisplay'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  })

  .run(function($rootScope){
    $(document).ready(function(){
      //Elements to be hidden before the app starts.
      $('.spinnerContainer').hide();
    });

    $rootScope.$on('$stateChangeStart', function(){
      // If it happens that route change was done through click of a link in the sideMenu, then it should be hidden after that.
      $('.sideMenu').hide('fast');
    });
  })


  //This controller enables the active nav button to be toggled based on the route. Needs a root controller since the navs are at the root level.
  .controller('RootCtrl', ['$scope', '$location', 'layOutServant', function ($scope, $location, layOutServant) {
    var screenWidth = document.documentElement.clientWidth;
    var myPortfolio = {};

    $scope.toggleSideMenu = function(){ // SideMenu toggle required by devices less than 768 pixesls in width
      layOutServant.enableSideMenu();
    };

    $scope.isActive = function(route) { //used to toggle the customActive class in the nav bar, which indicates which page the user is currently on.
      return route === $location.path();
    };

    $scope.isActive = function(route) { //used to print out which page user is currently on (devices less than 768)
      if(route === $location.path()){
        myPortfolio.page =  route.substring(1, route.length).toUpperCase(); //Give me the current page in caps.
        if(myPortfolio.page === ''){myPortfolio.page = 'HOME';}
        $scope.currentPage = myPortfolio.page;
      }
      return route === $location.path();
    };
    //If url does not match, use this to toggle a different design.
    $scope.inActive = function(route) {
      return route !== $location.path();
    };


    $(document).ready(function(){
      $('#loading').hide();      //Stop the spinner once the the DOM is ready.
      //$(window).bind('resize', function() { location.reload(); });
      window.onorientationchange = function(){ //This is only for the home page animation. A change from portrait to landscape should reload the page.
        var orientation = window.orientation;
        switch(orientation) {
          case 0: window.location.reload();
          break;
          case 90: window.location.reload();
          break;
          case -90: window.location.reload();
          break;
        }
      };

    // Check if the demos button is required, if so, then load it.
      if(screenWidth < 768){
        $('.demoMenu').show();
      }else{
        $('.demoMenu').hide();
      }


      layOutServant.showHide(); //Show - hide the left navigation panel and the footer.

      //Expand and contract the vertical hidden menu contents
      $('.expandable').hover(function(){
        $(this).children('.hideable').stop().show('slow');
      }, function(){
         $(this).children('.hideable').stop().hide(1000);
      });
      // Same effect with the click event for the touch devices.

        $('.expandable').on('click', function(){
          if(screenWidth > 768){
          return false; // In medium and above screens, if user clicks on the buttons/links that are
                        // used only to expand and show the sub links, nothing should happen, with out this, it hides the sideMenu panel.
          }
          else{
            $(this).children('.hideable').stop().show('slow');
          }
        });

    });

    /* Control of the main nav in the mobile devices*/
    //A variable called status which checks if the nav is opened, it closes it, else it opens it on click.
    myPortfolio.mobileNavStatus = 'closed';
    $scope.toggleMenu = function(){ //This function is called when the small menu widget is clicked.
      if(myPortfolio.mobileNavStatus === 'closed'){
        //*************** slide down  *******************************************
        TweenLite.fromTo('.nav',0.3, {display: 'none', height: 0}, {display: 'block', height: '205px', ease: Sine.easeOut, onComplete: function(){
          myPortfolio.mobileNavStatus = 'opened';
          $scope.mobileNavStatus = true;
        }});
      }
      else if(myPortfolio.mobileNavStatus === 'opened'){
        //*************** slide up  *********************************************
        foldUpNav();
      }

    };


    // Slide up function ********************************************************
    function foldUpNav(){
      TweenLite.fromTo('.nav',0.3, {display: 'block', height: '208px'}, {display: 'none', height: 0, ease: Sine.easeOut, onComplete: function(){
        myPortfolio.mobileNavStatus = 'closed';
        $scope.mobileNavStatus = false;
      }});
    }

    //This function will be called when any of the nav li items is clicked, then it would fold the menu up and re-direct.
    $scope.clearMenu = function() {
      if ($scope.mobileNavStatus) { // If $scope.mobileNavStatus is true, then we are in a mobile device, so a click on the nav should fold it.
        foldUpNav();
      }
      myPortfolio.mobileNavStatus = 'closed'; //return menu status to closed for consistency sake.
    };


    function foldUpMenu(){
      TweenLite.fromTo('.sideMenu', 0.3, {display: 'block', height: '220px'}, {display: 'none', height: 0, ease:Sine.easeOut, onComplete: function(){
        //**important to note here that the height specified here is responsible for the space allowed for the other elements. If it becomes short, come and change here.
        myPortfolio.menuStatus = 'closed';
      }});
    }

    // In the mobile view, show the secondary menu(sideMenu) when user clicks on the demos button.
    myPortfolio.menuStatus = 'closed';
    $scope.toggleDemoMenu = function(){
      if(myPortfolio.menuStatus === 'closed'){
        //*************** slide menu down  *******************************************
        TweenLite.fromTo('.sideMenu', 0.3, {display: 'none', height: 0}, {display: 'block', height: '260px', ease:Sine.easeOut, onComplete: function(){
          myPortfolio.menuStatus = 'opened';
        }});
      }
      else if(myPortfolio.menuStatus === 'opened'){
        //*************** slide menu up  *********************************************
        foldUpMenu();
      }

      //Re-use the foldUpMenu to fold up the menu each time it's li tag is clicked.
      $scope.closeDemoMenu = function(){
        foldUpMenu();
        //Close the main menu, if opened
        $scope.clearMenu();
      };

      //Close the main menu, if opened
      $scope.clearMenu();
    };
  }])

  .directive('activeTog', function(){ //This directive high lights which link is currently being viewed in the mobile devices.
    return{
      restrict: 'A',
      link: function(scope, elm){
        elm.children('li').on('click', function(){
          elm.children('li').removeClass('active');
          $(this).addClass('active');
        });
      }
    };
  })

  // Filter for current page text indicator. The text should not be too long.
.filter('currentPageMobileTextFilter', function(){
    return function(text2filter){
      var limit;
      limit = document.documentElement.clientWidth < 400 ? 12 : 19; // For mobile devices portrait format, limit text to 12 characters, else limit to 19.
      if(typeof text2filter !== 'string'){
        return text2filter;     // If this filter is applied to a non-string, don't filter it.
      }
      var textArray = text2filter.split('');
      textArray.splice(limit);
      textArray = textArray.join('');
      return textArray;
    };
  });
