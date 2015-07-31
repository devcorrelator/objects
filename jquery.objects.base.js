(function($) 
{

$.widget( "objects.objectsBase", 
{
	options: {},
	
	_create: function() {
		this.element.addClass( "objects-base" );
		
		// find the different possible elements we are apart of
		this.attachObjects();
		
	},
	_destroy: function() {
		this.element.removeClass( "objects-base" )
	},
	attachObjects: function(){
		if(!this.option('objectMessage'))
			this._setOption('objectMessage', $('#objects-message'));
		
		if(!this.option('objectTabs'))
		{
			this._setOption('objectTabs', this.element.parents('.objects-tabs'));
		}
	},
	parseUrl: function( url ) {
		if(typeof url == 'string')
			return $.url(url);
		else if(typeof url == 'object')
			return $(url).url();
		else
			return $.url();
	},
	ajax: function(ajax_options) {
		var self = this;
		
		ajax_options = $.extend( this.options.ajaxOptions, ajax_options );
		var jqxhr = $.ajax(ajax_options);
		jqxhr.fail(function( jqXHR, textStatus, errorThrown ) { self.ajaxFail(jqXHR, textStatus, errorThrown); });
		jqxhr.done(function(data, textStatus, jqXHR){ self.ajaxDone(data, textStatus, jqXHR); });
		return jqxhr;
	},
	ajaxDone: function(data, textStatus, jqXHR){ 
		this.ajaxCheckSession(data);
		this.objectMessage_update(data);
	},
	ajaxFail: function(jqXHR, textStatus, errorThrown){
		this.ajaxCheckSession(jqXHR.responseText);
		this.objectMessage_update(false, jqXHR);
	},
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
	snapOnScroll( element ){
	// snaps an element to the top of the page when scrolled past
	// otherwise releases if the scroll goes above the original position
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