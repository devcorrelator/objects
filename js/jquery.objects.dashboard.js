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
	
	refresh: function() {
		var self = this;
		this.element.html('');
		// setup the wrappers to make sure they display in the right order
		$.each(this.option('urls'), function( index, value )
		{
			var wrapper = $( "<div />" )
				.addClass('dashboard-block-item')
				.attr('id', 'dashboard-block-item-'+index)
				.attr('rel', value)
				.hide();
			self.element.append($(wrapper));
			self.ajax({
				url: value,
			})
			.done(function(data, textStatus, jqXHR){
				$('#dashboard-block-item-'+index).html(data);
				$('#dashboard-block-item-'+index).show('fade', function(){
					self.fixWidth( '#dashboard-block-item-'+index );
				});
				$('#dashboard-block-item-'+index).objectDashboardBlock();
			});
		});
		
	},
	
	fixWidth: function( object_id ) {
		var self = this;
		
		var dashboard_width = (this.element.width());
		
		if($(object_id).children('.block-width-full').length)
		{
			$(object_id)
				.addClass('block-width-full');
				//.outerWidth( (dashboard_width - 20) );
		}
		if($(object_id).children('.block-width-half').length)
		{
			$(object_id)
				.addClass('block-width-half');
				//.outerWidth( ((dashboard_width / 2)  - 15) );
		}
	},

});

// the default options
$.objects.objectDashboard.prototype.options = {
	urls: [],
}

})(jQuery);