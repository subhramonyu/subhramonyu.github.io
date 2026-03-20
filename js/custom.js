
  $(function () {
    'use strict'

    // MENU — collapse mobile nav when any in-page link in the bar is used
    $('.navbar').on('click', 'a.smoothScroll', function () {
        $(".navbar-collapse").collapse('hide');
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
    })

    // SMOOTHSCROLL — all .smoothScroll hash links (nav, freelance CTA, etc.)
    $(function () {
      $('a.smoothScroll').on('click', function (event) {
        var href = $(this).attr('href');
        if (!href || href.charAt(0) !== '#') return;
        var id = href.slice(1);
        if (!id) return;
        var $target = $('#' + $.escapeSelector(id));
        if (!$target.length) return;
        $target.filter('.motion-reveal').addClass('motion-reveal--visible');
        $('html, body').stop().animate({
          scrollTop: $target.offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });
     
  });
