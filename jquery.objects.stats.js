(function($) 
{

$.widget( "objects.objectStats", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-stats" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-stats" );
	},

});

// the default options
$.objects.objectStats.prototype.options = {
}

})(jQuery);