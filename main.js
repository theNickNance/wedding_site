$.holdReady(true);

$(window).on('load', function() {
  $.holdReady(false);
});

$(document).ready(function() {
  let currentIndex = 1;
  let timer;

  $('.low-quality').hide();

  function nextSlide(length) {
    $('.carousel .slide:nth-of-type(' + currentIndex + ')').fadeOut(length);
    currentIndex += 1;
    if (currentIndex > $('.carousel .slide').length ) {
      currentIndex = 1;
      clearInterval(timer);
    }
    $('.carousel .slide:nth-of-type(' + currentIndex + ')').fadeIn(length);
  }

  $('.carousel .slide:first-of-type').show();
  timer = window.setInterval(() => nextSlide(2000), 4000);
  $('.carousel').click(() => {
    clearInterval(timer);
    nextSlide(0);
    timer = window.setInterval(() => nextSlide(2000), 4000);
  });
});
