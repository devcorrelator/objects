(function($) 
{

$.widget( "objects.objectDashboard", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-dashboard" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-dashboard" );
	},

});

// the default options
$.objects.objectDashboard.prototype.options = {
}

})(jQuery);