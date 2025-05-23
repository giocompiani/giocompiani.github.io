$(document).on('scroll', function(){
    if ( $(window).scrollTop() > 30) {
        $('header').addClass('header-scrolled');
    } else {
        $('header').removeClass('header-scrolled');
    }
});

$(document).ready(function() {
  $('.abstract-toggle').on('click', function() {
    let abstract = $(this).closest('.work-entry').children('.abstract');
    abstract.slideToggle(500);
  });
});