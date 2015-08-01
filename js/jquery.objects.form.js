(function($) 
{

$.widget( "objects.objectForm", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-form" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-form" );
	},

});

// the default options
$.objects.objectForm.prototype.options = {
}

})(jQuery);