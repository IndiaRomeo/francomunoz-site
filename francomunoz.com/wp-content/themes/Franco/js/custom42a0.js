jQuery(function( $ ){
	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
	      input.val('');
	       input.removeClass('placeholder');
	  }
	}).blur(function() {
	   var input = $(this);
	   if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	   }
	}).blur();
	
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
	  }
	})
	});
});

jQuery(function( $ ){

	$(document).on("scroll", function () {
    	var y = $(this).scrollTop();
	if (y > 50) {
		$(".site-header").addClass('sticky');
    	} else {
		$(".site-header").removeClass('sticky');
    	}
	
	})
});

jQuery(document).ready(function($) {
		$('.counter').counterUp({
			delay: 10,
			time: 5000
		});
});

jQuery(function ($) {
  $(".genesis-nav-menu").on("click", ".custom-toggle-item > .c-hamburger-sub-menu", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (window.innerWidth < 980) {
      // Mobile pe existing toggle behavior continue karein, ham yahan kuch nahi karenge
      return;
    }

    var submenu = $(this).next(".sub-menu");

    if (submenu.is(":visible")) {
      submenu.stop(true, true).slideUp(200);
      $(this).removeClass("is-active");
    } else {
      submenu.stop(true, true).slideDown(200);
      $(this).addClass("is-active");
    }
  });
});


jQuery(function($){

  // Add toggle button
  $(".sidebar-primary li.menu-item-has-children").each(function(){
    if($(this).children(".sidebar-toggle").length === 0){
      $(this).children("a").after('<span class="sidebar-toggle">Toggle</span>');
    }
  });

  $(".sidebar-primary li.menu-item-has-children").each(function(){
    if($(this).find(".current-menu-item").length > 0 || 
       $(this).hasClass("current-menu-parent") || 
       $(this).hasClass("current-menu-ancestor")){

      $(this).children("ul.sub-menu").show();
      $(this).children(".sidebar-toggle").addClass("is-active");
    }
  });

  // Toggle click
  $(".sidebar-primary").on("click", "li.menu-item-has-children > .sidebar-toggle", function(e){
    e.preventDefault();

    var parentLi = $(this).closest("li.menu-item-has-children");
    var submenu = parentLi.children("ul.sub-menu");

    if(submenu.is(":visible")){
      submenu.stop(true,true).slideUp(200);
      $(this).removeClass("is-active");
    } else {
      submenu.stop(true,true).slideDown(200);
      $(this).addClass("is-active");
    }
  });

  // Parent link click behavior
  $(".sidebar-primary li.menu-item-has-children > a").on("click", function(e){

    var parentLi = $(this).closest("li.menu-item-has-children");
    var toggleBtn = parentLi.children(".sidebar-toggle");
    var parentHref = $(this).prop("href");

    var currentUrl = window.location.href.split("#")[0].replace(/\/$/,''); 
    var linkUrl = parentHref.split("#")[0].replace(/\/$/,'');

    if(currentUrl === linkUrl){
      e.preventDefault();
      toggleBtn.trigger("click");
    }

  });

});