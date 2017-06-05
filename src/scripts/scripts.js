// scripts.js
// ============================================================================
// ****: Global
// ============================================================================

var FOO = FOO || {};
    FOO.Home = {};

// ============================================================================
// ****: Init
// ============================================================================
$(document).ready(function(){

});

$(window).load(function() {
  showtimeClass();
});

// ----------------------------------------------------------------------------
// Global: Functions
// ----------------------------------------------------------------------------
function showtimeClass() {
  $('body').addClass('showtime');
}

/*
 * Timing Functions
*/
var functionStart = window.performance.now();
var functionComplete = window.performance.now();
var functionTime = functionComplete - functionStart;

// console.log('Function Title started at ' + String(functionStart) + ' and ended at ' + String(functionComplete));
// console.log('Function Title took ' + String(functionTime));

(function(jQuery) {
   jQuery.fn.clickoutside = function(callback) {
      var outside = 1, self = $(this);
      self.cb = callback;
      this.click(function() {
         outside = 0;
      });
      $(document).click(function() {
         outside && self.cb();
         outside = 1;
      });
      return $(this);
   }
})(jQuery);

