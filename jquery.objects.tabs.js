(function($) 
{

$.widget( "objects.objectTabs", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-tabs" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-tabs" );
	},

});

// the default options
$.objects.objectTabs.prototype.options = {
}

})(jQuery);