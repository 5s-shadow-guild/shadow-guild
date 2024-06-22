( function($) {

	var app = {
        initTextTyping: function(){
//            var i = 0;
//            var txt = 'The Shadow Dominion'; /* The text */
//            var speed = 100; /* The speed/duration of the effect in milliseconds */
//
//            function typeWriter() {
//                if (i < txt.length) {
//                    $(".tagline-wrap span.main-tagline").append(txt.charAt(i));
//                    i++;
//                    setTimeout(typeWriter, speed);
//                }
//            }
//
//            typeWriter();
//            
//            setInterval(typeWriter, 5000);
            var tagline = $('.tagline-wrap h1 span.main-tagline');
            var text = tagline.text();
            var speed = 100; // Speed in milliseconds
            var delay = 5000; // Delay in milliseconds

            function typewriterEffect() {
                tagline.text(''); // Clear the text
                var i = 0;

                function type() {
                    if (i < text.length) {
                        tagline.append(text.charAt(i));
                        i++;
                        setTimeout(type, speed);
                    } else {
                        setTimeout(typewriterEffect, delay); // Restart after delay
                    }
                }

                type();
            }

            // Start the typing effect
            typewriterEffect();
        },
        initSlideshow: function(){
            $('.slide-slick').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                fade: true,
            });
        },
        initScrollFunction: function() {
			$('.main-nav li a').on('click', function(event) {
                event.preventDefault(); // Prevent default anchor click behavior

                var targetSectionId = $(this).parent().data('id');
                var targetSection = $('#' + targetSectionId);

                // Smooth scroll to the target section with a duration of 500 milliseconds
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 82
                }, 0); // Adjust the animation speed as needed
            });
            
            $('.mobile-nav li a').on('click', function(event) {
                event.preventDefault(); // Prevent default anchor click behavior

                var targetSectionId = $(this).parent().data('id');
                var targetSection = $('#' + targetSectionId);

                // Smooth scroll to the target section with a duration of 500 milliseconds
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 82
                }, 0); // Adjust the animation speed as needed
            });
            
            $('a.join-us-link').on('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior
                $('html, body').animate({
                    scrollTop: $('#join').offset().top - 82
                }, 0); // Duration of the animation in milliseconds
            });
		},
        initFixedHeader :function(){
			$(window).scroll(function () {
				if ( window.innerWidth > 991 && $(this).scrollTop() > 90 ) {
				  $('.header').addClass('fixed');
				  
				 } else  {
				  $('.header').removeClass('fixed');
				  
				}
			
			
			  }); 
		},
        burgerMenu: function(){
            $('.burger-menu').click(function(e) {
                e.preventDefault();
                $('.mobile-menu-bg').addClass('active');
                $('.mobile-nav').addClass('active');
            });
            $('.mobile-menu-bg').click(function(e) {
                e.preventDefault();
                $('.mobile-menu-bg').removeClass('active');
                $('.mobile-nav').removeClass('active');
            });
            $('.mobile-nav li a').click(function(e) {
                e.preventDefault();
                $('.mobile-menu-bg').removeClass('active');
                $('.mobile-nav').removeClass('active');
            });
            $('.close-mobile-nav').click(function(e) {
                e.preventDefault();
                $('.mobile-menu-bg').removeClass('active');
                $('.mobile-nav').removeClass('active');
            });
        },
        teamPopup: function(){
            $('.img-wrap.team-item').each(function(){
                var $this = $(this);
                var imgSrc = $this.find('img').attr('src');
                var teamIgn = $this.find('.team-ign').text();

                $this.find('canvas, img').wrapAll('<a href="' + imgSrc + '" data-lightbox="team" data-title="' + teamIgn + '"></a>');
            });  
            
        },
        initGallery: function(){
            // Wrap images in anchor tags for lightbox functionality
            $('.gallery-wrap img').each(function() {
                var imgSrc = $(this).attr('src');
                var imgAlt = $(this).attr('alt');
                $(this).wrap('<a href="' + imgSrc + '" data-lightbox="gallery" data-title="' + imgAlt + '"></a>');
            });

            // Initially hide all gallery-wrap elements after the third one
            $('.gallery-wrap').slice(3).hide();

            // Show more/less functionality
            $('a.fancy.show-more').click(function(event) {
                event.preventDefault(); // Prevent default link behavior
                var buttonText = $(this).find('.text').text();
                if (buttonText === 'Show More') {
                    $('.gallery-wrap').slice(3).slideDown();
                    $(this).find('.text').text('Show Less');
                } else {
                    $('.gallery-wrap').slice(3).slideUp();
                    $(this).find('.text').text('Show More');
                }
            });
        },
        initFooterDate:function(){
            // Create a new Date object
            var currentDate = new Date();

            // Get the current year
            var year = currentDate.getFullYear();

            // Set the text of the span.date-text element
            $('.date-text').text(year);
        },
        
        teamOrder: function(){
            // Get all col-md-3 elements
            var $teamMembers = $('.team-inner .col-md-3');

            // Sort the elements based on the text content of .team-ign
            $teamMembers.sort(function(a, b) {
                var textA = $(a).find('.team-ign').text().toUpperCase();
                var textB = $(b).find('.team-ign').text().toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            // Empty the parent container
            $('.team-inner').empty();

            // Append the sorted elements back to the parent container
            $teamMembers.appendTo('.team-inner');  
        },
        lightbox: function(){
            $('a[data-lightbox]').click(function(e) {
                e.preventDefault();
                $('#lightbox').addClass('active');
            });
            $('#lightboxOverlay').click(function(e) {
                e.preventDefault();
                $('#lightbox').removeClass('active');
            });
            $('#lightbox .lb-data .lb-close').click(function(e) {
                e.preventDefault();
                $('#lightbox').removeClass('active');
            });
        },
        teamSlider: function(){
            $('.team-name-slider div').on('click', function(){
                var index = $(this).data('index');
                $('.team-main-slider img').removeClass('active').eq(index).addClass('active');
                $('.team-name-slider div').removeClass('active');
                $(this).addClass('active');
                
                if ($(window).width() <= 991) {
                    $('html, body').animate({
                        scrollTop: $('.team-main-slider').offset().top - 150
                    }, 0);
                }
            });  
            
        },
        
	}

	
	$(document).ready( function() {
        app.initScrollFunction();
        app.initFixedHeader();
        app.burgerMenu();
		app.initTextTyping();
        app.initSlideshow();
        app.teamPopup();
        app.initGallery();
        app.initFooterDate();
        app.teamOrder();
        app.lightbox();
        app.teamSlider();
        AOS.init();
        // Reinitialize AOS on scroll
        $(window).on('scroll', function() {
            AOS.refresh();
        });
	});
	
	$(window).on('load', function(){
	});

})(jQuery);
