(function($) 
{
/*
 * devcorrelator/objects v1.0.1
 * Source repository: https://github.com/devcorrelator/objects
 * @author text
 @class name
 @copyright text
 */

$.widget( "objects.objectForm", $.objects.objectsBase, 
{
	options: {},
	
	/**
	 * Tags the object that it is an objectForm with a css class.
	 * 
	 * @constructor
	 * @param {string} title - The title of the book.
	 * @param {string} author - The author of the book.
	 */
	_create: function() {
		this.element.addClass( "objects-form" );
		this.refresh( true );
	},
	
	/**
	 * Removes the css class that defines this as an objectForm.
	 * 
	 * @destructor
	 */
	_destroy: function() {
		this.element
			.removeClass( "objects-form" );
	},

});

// the default options
$.objects.objectForm.prototype.options = {
}

})(jQuery);