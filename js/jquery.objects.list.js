(function($) 
{

$.widget( "objects.objectList", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-list" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-list" );
	},

});

// the default options
$.objects.objectList.prototype.options = {
}

})(jQuery);