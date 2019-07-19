(function ($) {
	"use strict";
	
	var hgApp = {
		/* ---------------------------------------------
		 Content Loading
		--------------------------------------------- */	
		contentLoading: function() {
			$("body").imagesLoaded( function() {
				$('.preloader').delay(2000).fadeOut('slow');
				setTimeout(function() {
				    //After 2s, the no-scroll class of the body will be removed
				    $('body').removeClass('no-scroll');
					$("body").addClass("loading-done");
				}, 2000); //Here you can change preloader time

				// Page Animation Script
				$("[data-animate]").scrolla({
				    mobile: true
				});
			});
		},	
		/* ---------------------------------------------
		 One Page Menu Script
		--------------------------------------------- */
		onePageMenu: function() {
			function onePageNav($selector) {
				var $navSelector = $($selector);
				$navSelector
				.not('[href="#"]')
				.not('[href="#0"]')
				.on('click', function(event) {
				    if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
				      	var target = $(this.hash);
				      	target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

				      	$navSelector.removeClass("active");
				      	if( target.length) {
					      	if($(this)[0].hash.slice(1) === target[0].id) {
					      		$(this).addClass("active");
					      	} else {
					      		$(this).removeClass("active");
					      	}
				      	}
				     	
					    if (target.length) {
					        event.preventDefault();
					        $('html, body').animate({
					          	scrollTop: target.offset().top
					        }, 1000);
					    }
				    }
				});

				$navSelector.each(function(event) {
			      	var target = $(this.hash);
			      	if( target.length) {
				      	if(location.hash.slice(1) === target[0].id) {
				      		$(this).addClass("active");
				      	} else if(!location.hash) {
				      		
				      	} else {
				      		$(this).removeClass("active");
				      	}
			      	}
				});

				function onScroll(event){
				    var scrollPos = $(document).scrollTop();
				    $navSelector.each(function () {
				        var currLink = $(this);
		                if(currLink[0].hash !== "" && $(currLink[0].hash).position() !== undefined) {

	                		var $getNavHas = $(currLink).prop('href').split('#')[1],
	                			$getSection = $('#' + $getNavHas); 

	                		$getSection.each(function() {
		                		var $topPos = $(this).offset().top,
		                			$topPosRound = Math.round($topPos - 120 ),
		                			$presentPos = Math.round(scrollPos);

		                		if ($topPosRound <= $presentPos && $topPosRound + $(this).height() > $presentPos) {
		                		    $(currLink).parent().addClass("active"); 
		                		} else {
		                			$(currLink).parent().removeClass("active");
		                		}
	                		});
		                } else {
		                	return false;
		                }
				    });
				}

				$(document).on("scroll", onScroll);	     
			}
			onePageNav('.mainmenu li a');
		},

		/* ---------------------------------------------
		 Menu Script
		--------------------------------------------- */
		menu_script: function() {
			var $submenu = $('.mainmenu').find('li').has('.sub-menu');
			$submenu.prepend("<span class='menu-click'><i class='menu-arrow fa fa-plus'></i></span>");
			var $mobileSubMenuOpen = $(".menu-click");
			$mobileSubMenuOpen.each(function() {
				var $self = $(this);
				$self.on("click", function(e) {
					e.stopImmediatePropagation();
				    $self.siblings(".sub-menu").slideToggle("slow");
				    $self.children(".menu-arrow").toggleClass("menu-extend");
				});
			});

			//hamburger Menu
			var $hamburger_link = $('.hamburger-menus');
			$hamburger_link.on('click', function(e) {
				e.preventDefault();
				$(this).toggleClass('click-menu');
				$(this).next().toggleClass('menuopen');
			});

			var $overlayClose = $('.overlaybg');
			$overlayClose.on('click', function(e) {
				e.preventDefault();
				$(this).parent().removeClass('menuopen');
				$(this).parent().siblings('.hamburger-menus').removeClass('click-menu');
			});

			var el = document.querySelector('.site-navigation .navigation');
			if(el.length) {
				SimpleScrollbar.initEl(el);
			}

			var menuelem = $('.hamburger-content .menu-block');
			var delay_count = 0;
			menuelem.find('ul.mainmenu > li').each(function(){
				$(this).css('transition-delay', (delay_count * 200) + 'ms');
				delay_count++;
			});

			$(".hg-promo-numbers").each(function () {
			    $(this).isInViewport(function(status) {
			        if (status === "entered") {
			            for( var i=0; i < document.querySelectorAll(".odometer").length; i++ ){
			                var el = document.querySelectorAll('.odometer')[i];
			                el.innerHTML = el.getAttribute("data-odometer-final");
			            }
			        }
			    });
			});
		},

		/* ---------------------------------------------
		 Background Image
		--------------------------------------------- */
		background_image: function() {
			//Background 
			$("[data-bg-color], [data-bg-image], [data-bg-particles]").each(function() {
			    var $this = $(this);

			    if( $this.hasClass("pt-separate-bg-element") ){
			        $this.append('<div class="pt-background">');

			        // Background Color

			        if( $("[data-bg-color]") ){
			            $this.find(".hg-background").css("background-color", $this.attr("data-bg-color") );
			        }

			        // Particles
			        if( $this.attr("data-bg-particles-line-color") || $this.attr("data-bg-particles-dot-color") ){
			            $this.find(".hg-background").append('<div class="hg-background-particles">');
			            $(".hg-background-particles").each(function () {
			                var lineColor = $this.attr("data-bg-particles-line-color");
			                var dotColor = $this.attr("data-bg-particles-dot-color");
			                var parallax = $this.attr("data-bg-particles-parallax");
			                $(this).particleground({
			                    density: 15000,
			                    lineWidth: 0.2,
			                    lineColor: lineColor,
			                    dotColor: dotColor,
			                    parallax: parallax,
			                    proximity: 200
			                });
			            });
			        }

			        // Background Image

			        if( $this.attr("data-bg-image") !== undefined ){
			            $this.find(".hg-background").append('<div class="hg-background-image">');
			            $this.find(".hg-background-image").css("background-image", "url("+ $this.attr("data-bg-image") +")" );
			            $this.find(".hg-background-image").css("background-size", $this.attr("data-bg-size") );
			            $this.find(".hg-background-image").css("background-position", $this.attr("data-bg-position") );
			            $this.find(".hg-background-image").css("opacity", $this.attr("data-bg-image-opacity") );

			            $this.find(".hg-background-image").css("background-size", $this.attr("data-bg-size") );
			            $this.find(".hg-background-image").css("background-repeat", $this.attr("data-bg-repeat") );
			            $this.find(".hg-background-image").css("background-position", $this.attr("data-bg-position") );
			            $this.find(".hg-background-image").css("background-blend-mode", $this.attr("data-bg-blend-mode") );
			        }

			        // Parallax effect

			        if( $this.attr("data-bg-parallax") !== undefined ){
			            $this.find(".hg-background-image").addClass("hg-parallax-element");
			        }
			    }
			    else {

			        if(  $this.attr("data-bg-color") !== undefined ){
			            $this.css("background-color", $this.attr("data-bg-color") );
			            if( $this.hasClass("btn") ) {
			                $this.css("border-color", $this.attr("data-bg-color"));
			            }
			        }

			        if( $this.attr("data-bg-image") !== undefined ){
			            $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );

			            $this.css("background-size", $this.attr("data-bg-size") );
			            $this.css("background-repeat", $this.attr("data-bg-repeat") );
			            $this.css("background-position", $this.attr("data-bg-position") );
			            $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
			        }

			    }
			});

			//Background Parallax
			$("[data-bg-parallax='scroll']").each(function() {
			    var speed = $(this).attr("data-bg-parallax-speed");
			    var $this = $(this);
			    var isVisible;
			    var backgroundPosition;

			    $this.isInViewport(function(status) {
			        if (status === "entered") {
			            isVisible = 1;
			            var position;

			            $(window).scroll(function () {
			                if( isVisible === 1 ){
			                    position = $(window).scrollTop() - $this.offset().top;
			                    backgroundPosition = (100 - (Math.abs((-$(window).height()) - position) / ($(window).height()+$this.height()))*100);
			                    if( $this.find(".hg-parallax-element").hasClass("hg-background-image") ){
			                        $this.find(".hg-background-image.hg-parallax-element").css("background-position-y", (position/speed) + "px");
			                    }
			                    else {
			                        $this.find(".hg-parallax-element").css("transform", "translateY(" +(position/speed)+ "px)");
			                    }
			                }
			            });
			        }
			        if (status === "leaved"){
			            isVisible = 0;
			        }
			    });
			});
		},		
		/* ---------------------------------------------
		Pop Up Scripts
		 --------------------------------------------- */
		popupscript: function() {	
			function getScrollBarWidth () {
			    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
			    $outer.remove();
			    return 100 - widthWithScroll;
			}

			// Image Pop up
			var $popupImage = $(".popup-image");
			if ( $popupImage.length > 0 ) {
			    $popupImage.magnificPopup({
			        type:'image',
			        fixedContentPos: false,
			        gallery: { enabled:true },
			        removalDelay: 300,
			        mainClass: 'mfp-fade',
			        callbacks: {
			            // This prevenpt pushing the entire page to the right after opening Magnific popup image
			            open: function() {
			                $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
			            },
			            close: function() {
			                $(".page-wrapper, .navbar-nav").css("margin-right", 0);
			            }
			        }
			    });
			}

			//Video Popup
			var $videoPopup = $(".video-popup");
			if ( $videoPopup.length > 0 ) {
			    $videoPopup.magnificPopup({
			        type: "iframe",
			        removalDelay: 300,
			        mainClass: "mfp-fade",
			        overflowY: "hidden",
			        iframe: {
			            markup: '<div class="mfp-iframe-scaler">'+
			            '<div class="mfp-close"></div>'+
			            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
			            '</div>',
			            patterns: {
			                youtube: {
			                    index: 'youtube.com/',
			                    id: 'v=',
			                    src: '//www.youtube.com/embed/%id%?autoplay=1'
			                },
			                vimeo: {
			                    index: 'vimeo.com/',
			                    id: '/',
			                    src: '//player.vimeo.com/video/%id%?autoplay=1'
			                },
			                gmaps: {
			                    index: '//maps.google.',
			                    src: '%id%&output=embed'
			                }
			            },
			            srcAction: 'iframe_src'
			        }
			    });
			}
		},
		/* ---------------------------------------------
		Isotope Activation
		 --------------------------------------------- */
		isotope_activation: function() {
			var IsoGriddoload = $('.portfolio-grid');
			IsoGriddoload.isotope({
			    itemSelector: '.item',
			    masonryHorizontal: {
			        rowHeight: 100
			    }
			});

			var ProjMli = $('.portfolio-filter li a');
			var ProjGrid = $('.portfolio-grid');
			ProjMli.on('click', function(e) {
				e.preventDefault();
			    ProjMli.removeClass("active");
			    $(this).addClass("active");
			    var selector = $(this).attr('data-filter');
			    ProjGrid.isotope({
			        filter: selector,
			        animationOptions: {
			            duration: 750,
			            easing: 'linear',
			            queue: false,
			        }
			    });
			});
		},
		
		/* ---------------------------------------------
		Content Video Responsive
		 --------------------------------------------- */
		content_video: function() {
			var $postVideo = $('.blog-single-page');
			$postVideo.fitVids();
		},		
		/* ---------------------------------------------
		 All Carousel Active Script
		--------------------------------------------- */
		allCarousel: function() {
			var $owlCarousel = $(".owl-carousel");

			if( $owlCarousel.length ){
			    $owlCarousel.each(function() {

			        var items = parseInt( $(this).attr("data-owl-items"), 10);
			        if( !items ) items = 1;

			        var nav = parseInt( $(this).attr("data-owl-nav"), 2);
			        if( !nav ) nav = 0;

			        var dots = parseInt( $(this).attr("data-owl-dots"), 2);
			        if( !dots ) dots = 0;

			        var center = parseInt( $(this).attr("data-owl-center"), 2);
			        if( !center ) center = 0;

			        var loop = parseInt( $(this).attr("data-owl-loop"), 2);
			        if( !loop ) loop = 0;

			        var margin = parseInt( $(this).attr("data-owl-margin"), 10);
			        if( !margin ) margin = 0;

			        var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
			        if( !autoWidth ) autoWidth = 0;

			        var navContainer = $(this).attr("data-owl-nav-container");
			        if( !navContainer ) navContainer = 0;

			        var autoplay = parseInt( $(this).attr("data-owl-autoplay"), 2);
			        if( !autoplay ) autoplay = 0;

			        var autoplayTimeOut = parseInt( $(this).attr("data-owl-autoplay-timeout"), 10);
			        if( !autoplayTimeOut ) autoplayTimeOut = 5000;

			        var autoHeight = parseInt( $(this).attr("data-owl-auto-height"), 2);
			        if( !autoHeight ) autoHeight = 0;

			        var animationIn = $(this).attr("data-owl-anim-in");
			        if( !animationIn ) animationIn = 0;
			        else animationIn = $(this).attr("data-owl-anim-in");	        

			        var animationOut = $(this).attr("data-owl-anim-out");
			        if( !animationOut ) animationOut = 0;
			        else animationOut = $(this).attr("data-owl-anim-out");


			        if( $("body").hasClass("rtl") ) var rtl = true;
			        else rtl = false;

			        if( items === 1 ){
			            $(this).owlCarousel({
			                navContainer: navContainer,
			                animateOut: animationOut,
			                animateIn: animationIn,
			                autoplayTimeout: autoplayTimeOut,
			                autoplay: 1,
			                autoHeight: autoHeight,
			                center: center,
			                loop: loop,
			                margin: margin,
			                autoWidth: autoWidth,
			                items: 1,
			                autoplayHoverPause: 1,
			                nav: nav,
			                dots: dots,
			                rtl: rtl,
			                navText: []
			            });
			        }
			        else {
			            $(this).owlCarousel({
			                navContainer: navContainer,
			                animateOut: animationOut,
			                animateIn: animationIn,
			                autoplayTimeout: autoplayTimeOut,
			                autoplay: autoplay,
			                autoHeight: autoHeight,
			                center: center,
			                loop: loop,
			                margin: margin,
			                autoWidth: autoWidth,
			                items: 1,
			                autoplayHoverPause: 1,
			                nav: nav,
			                dots: dots,
			                rtl: rtl,
			                navText: [],
			                responsive: {
			                    1199: {
			                        items: items
			                    },
			                    992: {
			                        items: 2
			                    },
			                    768: {
			                        items: 1
			                    },
			                    0: {
			                        items: 1
			                    }
			                }
			            });
			        }

			        if( $(this).find(".owl-item").length === 1 ){
			            $(this).find(".owl-nav").css( { "opacity": 0,"pointer-events": "none"} );
			        }

			    });
			}
		},

		/* ---------------------------------------------
		 Progress Bar
		--------------------------------------------- */
		progress_var: function() {
			var $progressBar = $('.skill-progress');
			var $skillBar = $('.skill-bar');
			if($progressBar.length) {

				var $section = $progressBar.parent();

				$skillBar.each(function() {
					$(this).isInViewport(function(status) {
						if (status === "entered") {
							$(this).find('.progress-content').animate({
								width: $(this).attr('data-percentage')
							}, 1500);
							$(this).find('.progress-mark').animate({
								left: $(this).attr('data-percentage')
							}, {
								duration: 1500,
								step: function(now, fx) {
									var data = Math.round(now);
									$(this).find('.percent').html(data + '%');
								}
							});
						}
					});
				});
			}
		},
		/* ---------------------------------------------
		 Scroll Scripts
		--------------------------------------------- */
	    scroll_script: function () {
	    	//Fixed Navbar
	    	var $fixedHeader = $('.fixed-header');
	    	$(window).on('scroll', function() {
	    		if($(this).scrollTop() >= 350) {
	    			$fixedHeader
	    			.addClass('sticky-enable');
	    		} else {
	    			$fixedHeader
	    			.removeClass('sticky-enable');
	    		}
	    	});
			
			var $scrolltop = $('#scroll-top');
			$(window).on('scroll', function() {
				if($(this).scrollTop() > $(this).height()) {
					$scrolltop
					.addClass('btn-show')
					.removeClass('btn-hide');
				} else {
					$scrolltop
					.addClass('btn-hide')
					.removeClass('btn-show');
				}
			});
			$("a[href='#top']").on('click', function() {
				$("html, body").animate({
					scrollTop: 0
				}, "normal");
				return false;
			});
		},
		/* ---------------------------------------------
		 Tool Tips Script
		--------------------------------------------- */
		tooltipScript: function() {
			$('[data-toggle="tooltip"]').tooltip(); 
		},		

		/* ---------------------------------------------
		 Contact Form Script
		--------------------------------------------- */
		contactFormScript: function() {
			$(".hg-form-email [type='submit']").each(function(){
			    var text = $(this).text();
			    $(this).html("").append("<span>"+ text +"</span>").prepend("<div class='status'><i class='fas fa-circle-notch fa-spin spinner'></i></div>");
			});

			$(".hg-form-email [type='submit']").on("click", function(e){
			    var $button = $(this);
			    var $form = $(this).closest("form");
			    var pathToPhp = $(this).closest("form").attr("data-php-path");
			    $form.validate({
			        submitHandler: function() {
			            $button.addClass("processing");
			            $.post( pathToPhp, $form.serialize(),  function(response) {
			                $button.addClass("done").find(".status").append(response).prop("disabled", true);
			            });
			            return false;
			        }
			    });
			});

			$("form:not(.hg-form-email)").each(function(){
			    $(this).validate();
			});
		},
		/* ---------------------------------------------
		 function initializ
		 --------------------------------------------- */
		initializ: function() {
			hgApp.onePageMenu();
			hgApp.menu_script();
			hgApp.content_video();
			hgApp.background_image();
			hgApp.allCarousel();
			hgApp.progress_var();
			hgApp.popupscript();
			hgApp.tooltipScript();
			hgApp.scroll_script();
			hgApp.contactFormScript();
		}
	};
	/* ---------------------------------------------
	 Document ready function
	 --------------------------------------------- */
	$(function() {
		hgApp.initializ();
	});

	$(window).on('load', function() {
		hgApp.contentLoading();
		hgApp.isotope_activation();
	});
})(jQuery);
