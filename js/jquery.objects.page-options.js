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
	refresh: function() {
		
		// go through each item (ul>li)
		var self = this;
		self.element.find('ul.page-options-main li.page-options-main').each(function(){
			
			// attach a tooltipster to each of the titles that have a list present
			var tooltip_content = $(this).find('.list-wrapper');
			if(tooltip_content.length)
			{
				$(this).click(function(event){ event.preventDefault(); });
				if ( $.isFunction($.fn.tooltipster) ) 
				{
					$(this).tooltipster({
						content: tooltip_content,
						theme: 'tooltipster-shadow tooltipster-page-options',
					});
				}
				tooltip_content.hide();
			}
		});
	},

});

// the default options
$.objects.objectPageOptions.prototype.options = {
}

})(jQuery);