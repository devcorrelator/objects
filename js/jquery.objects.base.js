(function($) 
{

$.widget( "objects.objectsBase", 
{
	options: {},
	
	/**
	 * Tags the object that it is an objectsBase with a css class.
	 * 
	 * @constructor
	 * @param {string} title - The title of the book.
	 * @param {string} author - The author of the book.
	 */
	_create: function() {
		this.element.addClass( "objects-base" );
		
		// find the different possible elements we are apart of
		this.attachObjects();
		
	},
	
	/**
	 * Removes the css class that defines this as an objectsBase.
	 * 
	 * @destructor
	 */
	_destroy: function() {
		this.element.removeClass( "objects-base" )
	},
	
	/**
	 * Attaches common objects to the options, if they exist
	 */
	attachObjects: function(){
		if(!this.option('objectMessage'))
			this._setOption('objectMessage', $('#objects-message'));
		
		if(!this.option('objectTabs'))
		{
			this._setOption('objectTabs', this.element.parents('.objects-tabs'));
		}
	},
	
	/**
	 * Uses the purl library to parse a url
	 * 
	 * @param {string} title - The url to parse
	 */
	parseUrl: function( url ) {
		if(typeof url == 'string')
			return $.url(url);
		else if(typeof url == 'object')
			return $(url).url();
		else
			return $.url();
	},
	
	/**
	 * Abstract layer to $.ajax()
	 * 
	 * @param {Object} ajax_options - The list of options the the $.ajax() method can take
	 */
	ajax: function(ajax_options) {
		var self = this;
		
		ajax_options = $.extend( this.options.ajaxOptions, ajax_options );
		var jqxhr = $.ajax(ajax_options);
		jqxhr.fail(function( jqXHR, textStatus, errorThrown ) { self.ajaxFail(jqXHR, textStatus, errorThrown); });
		jqxhr.done(function(data, textStatus, jqXHR){ self.ajaxDone(data, textStatus, jqXHR); });
		return jqxhr;
	},
	
	/**
	 * Defined ajax callback when the ajax call was successful
	 * 
	 * @param {(Object|string)} data - Data returned from the server
	 * @param {string} textStatus - Status returned from the server
	 * @param {Object} jqXHR - The jqXHR object created from the server response
	 */
	ajaxDone: function(data, textStatus, jqXHR){ 
		this.ajaxCheckSession(data);
		this.objectMessage_update(data);
	},
	
	/**
	 * Defined ajax callback when the ajax call failed
	 * 
	 * @param {Object} jqXHR - The jqXHR object created from the server response
	 * @param {string} textStatus - Status returned from the server
	 * @param {(Object|string)} errorThrown - The error that was thrown
	 */
	ajaxFail: function(jqXHR, textStatus, errorThrown){
		this.ajaxCheckSession(jqXHR.responseText);
		this.objectMessage_update(false, jqXHR);
	},
	
	/**
	 * Checks the response from an ajax call to make sure we're still logged in,
	 * and have a valid session
	 * 
	 * @param {(Object|string)} response - the content returned from the server
	 */
	ajaxCheckSession: function(response) {
		try {
			response = JSON.parse(response);
			if(response.message == 'redirected')
			{
				location.reload();
			}
		}
		// returned regular html content
		catch(error) {}
	},
	
	/**
	 * Updated the objectMessage object, if it exists
	 * 
	 * @param {(Object|string)} data - the content returned from the server
	 * @param {Object} jqXHR - The jqXHR object created from the server response
	 */
	objectMessage_update: function(data, jqXHR) {
		var flashMessage = false;
		if(data) {
			try {
				data = JSON.parse(data);
				if(data.message)
					flashMessage = data.message
			}
			// returned regular html/text content
			catch(error) {
			}
		}
		else if(jqXHR)
			flashMessage = jqXHR.getResponseHeader('X-flashMessage');
		
		if(flashMessage)
			if(this.option('objectMessage'))
				this.option('objectMessage').objectsMessage('update', flashMessage);
	},
	
	/**
	 * Snaps an element to the top of the page when scrolled past,
	 * otherwise releases if the scroll goes above the original position.
	 * 
	 * @param {Object} element - The element as a jQuery object '$(element)'
	 */
	snapOnScroll( element ){
		element_top = element.offset();
		element_top = Math.ceil(element_top.top);
		$(window).scroll(function () {
			var d = $(document).scrollTop();
			
			if(d >= element_top)
				element.addClass('stuck');
			else
				element.removeClass('stuck');
		});
	},
});

// the default options
$.objects.objectsBase.prototype.options = {
	objectMessage: $('#objects-message'),
	objectTabs: false,
	objectTooltipster: false,
	ajaxOptions: {
		type: 'GET',
		dataType: 'html',
	}
}

})(jQuery);