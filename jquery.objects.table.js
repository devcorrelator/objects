(function($) 
{

$.widget( "objects.objectTable", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-table" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-table" );
	},

});

// the default options
$.objects.objectTable.prototype.options = {
}

})(jQuery);