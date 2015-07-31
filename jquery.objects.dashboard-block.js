(function($) 
{

$.widget( "objects.objectDashboardBlock", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-dashboard-block" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-dashboard-block" );
	},

});

// the default options
$.objects.objectDashboardBlock.prototype.options = {
}

})(jQuery);