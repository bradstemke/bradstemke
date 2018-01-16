// scripts.js
// ============================================================================
// ****: Global
// ============================================================================

var BS = BS || {};
    BS.Home = {};

// ============================================================================
// ****: Init
// ============================================================================
$(document).ready(function(){

});

$(window).load(function() {
  showtimeClass();
  new BS.Home.Images();
});

// ----------------------------------------------------------------------------
// Global: Functions
// ----------------------------------------------------------------------------
function showtimeClass() {
  $('body').addClass('showtime');
}

BS.Home.Images = function() {
  document.addEventListener('lazybeforeunveil', function(e){
    var bg = e.target.getAttribute('data-bg');
    if (bg) {
      e.target.style.backgroundImage = 'url(' + bg + ')';
    }
  });
};