(function($) 
{

$.widget( "objects.objectMessage", $.objects.objectsBase, 
{
	options: {},
	
	// initialize the element
	_create: function() {
		this.element.addClass( "objects-message" );
		this.refresh( true );
	},
	_destroy: function() {
		this.element
			.removeClass( "objects-message" );
	},
	
	refresh: function( runMessage ) {
		
		if(jQuery.type(runMessage) === 'boolean')
		{
			this.message( runMessage );
		}
		
		// if we have a message to display, display it
		if(this.option('message'))
		{
			this.show();
			this.hide();
		}
		// otherwise hide it out right
		else
		{
			this.element.hide();
		}
	},
	
	// checks and update the message
	// makes sure the message content, and the message option stay in sync
	message: function( message ) {
		var contentObj = this.element.find(this.option('contentClass'));
		
		// we updating the option and the content
		if(jQuery.type(message) === 'string') 
		{
			// set the message option to the content
			this.option('message', message)
			// update the element
			$(contentObj).text(message);
		}
		
		// an initiation
		else if(jQuery.type(message) === 'boolean')
		{
			// if there is text, use it over the option
			var message = $(contentObj).text();
			if($.trim(message))
				this.option('message', message);
			// otherwise take the option, and update the text
			else
				$(contentObj).text(this.option('message'));
		}
		
		// just a catchall right now
		else if(jQuery.type(message) === 'undefined')
		{
		}
	},
	
	show: function() {
		this.element.stop( true, true );
		this._show(this.element, this.option('show'));
	},
	
	hide: function() {
		this.element.stop( true, true );
		this._hide(this.element, this.option('hide'));
	},
	
	update: function( message ) {
		this.message(message);
		this.refresh();
	}
});

// the default options
$.objects.objectMessage.prototype.options = {
	message: false,
	contentClass: '.objects-message-content',
	show: {},
	hide: { delay: 6000, effect: 'fadeOut', duration: 1000 }
}

})(jQuery);