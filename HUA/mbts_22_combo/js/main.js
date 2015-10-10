jQuery(function($) {
	"use strict";
	$('html').removeClass('no-js').addClass('js');
	var headerHeight = $('.header').outerHeight();
	/* Slide to section */
	$('nav a').on('click', function() {
		var section = $(this).attr('href');
		if($(section).size()) {
			$('#push-menu:visible').trigger('click');
			$('html, body').animate({
				'scrollTop':  $(section).offset().top - 70
			}, 500, function() {
				//window.location.hash = section;
			});
			return false;
		}
	});
	/* Slide to section eof */

	/* Push menu */
	$('#push-menu').on('click', function() {
		$('body').toggleClass('side-menu-push-toleft');
		$('.side-menu').toggleClass('side-menu-open');
	});
	toggleRMenu();
	$(window).on('resize', function() {
		toggleRMenu();
	});
	function toggleRMenu() {
		if($(window).width() <= 959) {
			$('header nav').addClass('side-menu');
		} else {
			$('header nav').removeClass('side-menu');
			$('body').removeClass('side-menu-push-toleft');
		}
	}
	/* Push menu eof */

	/* Fixed header */
	fixedHeader();
	$(window).on('scroll resize', function() {
		if(!$('body').hasClass('fixed-header')) {
			headerHeight = $('.header').outerHeight();
		}
		fixedHeader();
	});
	function fixedHeader() {
		if($(window).scrollTop() > headerHeight) {
			$('body').addClass('fixed-header');
			$('body').css('padding-top', headerHeight + 'px');
		} else {
			$('body').removeClass('fixed-header');
			$('body').css('padding-top', '');
		}
	}
	/* Fixed header eof */

	/* Contact Us */
    $('#contact-us-form').submit(function() {
        var form = $(this),
            hasError = false;

        form.find('.error-msg, .success-msg').remove();
        
        form.find('.required-field').each(function() {
            $(this).removeClass('not-valid');
            if($.trim($(this).val()) === '') {
                $(this).addClass('not-valid').parent().append('<div class="error-msg">This is a required field.</div>');
                hasError = true;
            } else if($(this).hasClass('email-field')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(!emailReg.test($.trim($(this).val()))) {
                    $(this).addClass('not-valid').parent().append('<div class="error-msg">You entered an invalid Email.</div>');
                    hasError = true;
                }
            }
        });
        if(!hasError) {
            var formData = $(this).serialize();
            $.post('contacts.php', formData, function(data) {
                form.find('.required-field').val('');
                form.append('<div class="success-msg">Thank you! We will contact you shortly.</div>');
            }).fail(function() {
                //form.find('.required-field').val('');
                form.append('<div class="error-msg">Error occurred. Please try again later.</div>');
            });
        }               
        return false;   
    });
    /* Contact Us eof */

	/* Init fancybox */
	$(".gallery-list a").attr('rel', 'gallery_slides').fancybox({
		'cyclic': true,
		'transitionIn': 'elastic',
		'transitionOut': 'elastic',
		'titleShow': false,
		'titlePosition': 'over',
		'overlayColor': '#000',
		'overlayOpacity': 0.7
	});
	/* Init fancybox eof */
});
/* Init flexslider */
$(window).load(function() {
	"use strict";
	$('#homeCarousel').flexslider({
		'animation': "slide",
		'slideshow': false,
		'smoothHeight': true,
		'controlNav':  false
	});
	$('#servicesCarousel').flexslider({
		'animation': "slide",
		'slideshow': false,
		'smoothHeight': true,
		'directionNav': false
	});
});
/* Init flexslider eof */