(function($) 
{

$.widget( "objects.objectPageOptions", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-page-options" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-page-options" );
	},

});

// the default options
$.objects.objectPageOptions.prototype.options = {
}

})(jQuery);