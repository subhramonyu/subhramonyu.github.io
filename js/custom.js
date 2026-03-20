
  $(function () {
    'use strict'

    /**
     * Same-document hash links. Do not use $(a).attr('href') — jQuery returns the
     * resolved absolute URL for <a>, so "#contact" becomes "https://…#contact" and
     * breaks a naive "#" check.
     */
    function hashFromInPageAnchor(anchor) {
      var attr = anchor.getAttribute('href');
      if (attr && /^\s*#/.test(attr)) {
        return attr.replace(/^\s+/, '').split('?')[0];
      }
      if (anchor.hash) {
        return anchor.hash.split('?')[0];
      }
      return '';
    }

    $(document).on('click', 'a.smoothScroll', function (event) {
      var hash = hashFromInPageAnchor(this);
      if (!hash || hash.length < 2) return;

      var id = decodeURIComponent(hash.slice(1));
      if (!id) return;

      var target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();

      if ($(this).closest('.navbar').length) {
        $('.navbar-collapse').collapse('hide');
      }

      target.classList.add('motion-reveal--visible');

      var navOffset = 49;
      var y = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
      y = Math.max(0, y);

      var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });

      try {
        if (history.pushState) {
          history.pushState(null, '', hash);
        } else {
          window.location.hash = hash;
        }
      } catch (e) {
        try {
          window.location.hash = hash;
        } catch (e2) { /* file:// or restricted contexts */ }
      }
    });

    $(window).on('scroll', function() {

        /*----------------------------------------------------*/
        /*  Navigtion Menu Scroll
        /*----------------------------------------------------*/

        var b = $(window).scrollTop();

        if( b > 72 ){
            $(".navbar").addClass("scroll");
        } else {
            $(".navbar").removeClass("scroll");
        }
    });

    // TESTIMONIALS CAROUSEL
    try {
      $('#testimonials-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            900:{
                items:2,
            },
            1200:{
                items:3,
                loop:false
            }
        }
      });
    } catch (err) {
      if (window.console && console.warn) {
        console.warn('owlCarousel init skipped:', err);
      }
    }

  });
