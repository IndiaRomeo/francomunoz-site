//jQuery( window ).on( "load", function(  ) {
jQuery(function( $ ){
	$("nav .genesis-nav-menu").addClass("responsive-menu").before('<div class="c-hamburger c-hamburger--htx"><span>Main Menu</span></div>');
	
	$(".genesis-nav-menu li ul.sub-menu").addClass("responsive-sub-menu").before('<div class="c-hamburger-sub-menu c-hamburger-sub-menu--htx"><span>Sub Menu</span></div>');
	
	var toggles = document.querySelectorAll(".c-hamburger");

  	for (var i = toggles.length - 1; i >= 0; i--) {
    		var toggle = toggles[i];
    		toggleHandler(toggle);
  	};
	
	function toggleHandler(toggle) {
    		toggle.addEventListener( "click", function(e) {
      		e.preventDefault();
      		(this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    	});
	}
	
	
	$(".c-hamburger").on("click", function (){
		$("nav .genesis-nav-menu").slideToggle();
	});
	
	$(".c-hamburger-sub-menu").on("click", function () {
		$(this).next().slideToggle();
	});
	
	$(window).on("resize", function (){
		if(window.innerWidth > 768) {
			$("nav .genesis-nav-menu").removeAttr("style");
		}
	});
	
});