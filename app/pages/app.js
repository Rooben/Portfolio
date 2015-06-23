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
    var screen_width = document.documentElement.clientWidth;
    var myPortfolio = {};

    $scope.isActive = function(route) { //used to toggle the customActive class in the nav bar.
      return route === $location.path();
    };

    $scope.isActive = function(route) { //used to toggle the customActive class in the nav bar.
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
      if(screen_width < 768){
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
      if(screen_width > 960){
        $('.expandable').on('click', function(){
          return false; // In screens medium and above screens, if user clicks on the buttons/links that are
                        // used only to expand and show the sub links, nothing should happen,with out this, it hides the panel.
        });
      }

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

    // In the mobile view, show the secondary menu when user clicks on the demos button.
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

      function foldUpMenu(){
        TweenLite.fromTo('.sideMenu', 0.3, {display: 'block', height: '220px'}, {display: 'none', height: 0, ease:Sine.easeOut, onComplete: function(){
        //**important to note here that the height specified here is responsible for the space allowed for the other elements. If you it becomes short, come and change here.
          myPortfolio.menuStatus = 'closed';
        }});
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

  .directive('activeTog', function(){
    return{
      restrict: 'A',
      link: function(scope, elm){
        elm.children('li').on('click', function(){
          elm.children('li').removeClass('active');
          $(this).addClass('active');
        });
      }
    };
  });
