/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
/**
 * Aloha Ribbon
 * <p>Setting GENTICS.Aloha.settings.ribbon to bool false before Aloha is loaded will hide the ribbon.</p>  
 * @namespace GENTICS.Aloha
 * @class Ribbon
 * @singleton
 */
GENTICS.Aloha.Ribbon = function() {
	
	/**
	 * jQuery object of the main container of the ribbon
	 */
	this.ribbon;
	
	/**
	 * Fade in/out button
	 */
	this.fadeButton;
	
	/**
	 * Status if the ribbon is currently faded out or not.
	 * True if the ribbon is faded out, false otherwise.
	 */
	this.fadedOut = false;
	
	/**
	 * Status if the ribbon is visible.
	 */
	this.visible = false;
	
	
	var that = this;
	this.ribbon = jQuery('<div class="GENTICS_ribbon ui-widget-header"></div>');
	
	this.fadeButton = jQuery('<button></button>').button({
			icons : { primary: 'ui-icon-triangle-1-w' },
			text : false
		}).click(function(){
			if (that.fadedOut) {
				// fade in
				that.ribbon.css('marginLeft', '0px');
				that.ribbon.animate({
					left: '0'
				});
				$(this).button('option', 'icons', {primary : 'ui-icon-triangle-1-w'});
				that.fadedOut = false;
			} else {
				// fade out
				that.ribbon.css('marginLeft', '30px');
				that.ribbon.animate({
					left: '-100%'
				});
				$(this).button('option', 'icons', {primary : 'ui-icon-triangle-1-e'});
				that.fadedOut = true;
			}
		});
	
	this.ribbon.append(this.fadeButton);
	this.addSeparator();
};

/**
 * Sets the icon class for the ribbon icon
 * @param {String} iconClass CSS class for the icon
 */
GENTICS.Aloha.Ribbon.prototype.setIcon = function (iconClass) {

};

/**
 * Adds a GENTICS.Aloha.ui.Button the Ribbon
 * @param {Button} button Button to be added to the Ribbon
 */
GENTICS.Aloha.Ribbon.prototype.addButton = function (button) {
	
	if (typeof button.menu === 'object') {
		// build the drop down menu
		var menu = new Ext.menu.Menu();
		jQuery.each(button.menu, function(index, entry) {
			menu.addItem(new Ext.menu.Item({
				text: entry.label,
				icon: entry.icon,
				iconCls: entry.iconClass,
				handler: function() {
					entry.onclick.apply(entry);
				}
			}));
		});
	}
	
	// configuration for the button
	var buttonConfig = {
		text : button.label,
		enableToggle: button.toggle,
		icon: button.icon,
		pressed : button.pressed,
		iconCls: button.iconClass,
		menu : menu,
		handler : function() {
			if (typeof button.onclick === 'function') {
				button.onclick.apply(button);
			}
			button.pressed = !button.pressed;
		}
	}
	
	var extButton;
	
	// Build a split button if we have a menu and a handler
	if (menu && typeof button.onclick == 'function') {
		// build the split button for the menu
		extButton = new Ext.SplitButton(buttonConfig);
	} else {
		// build a normal button
		extButton = new Ext.Button(buttonConfig);
	}
	
	this.toolbar.insert(this.toolbar.items.getCount() - 3, extButton);
};

/**
 * Adds a separator to the Ribbon.
 */
GENTICS.Aloha.Ribbon.prototype.addSeparator = function() {
	var separator = jQuery('<span class="GENTICS_separator ui-icon ui-icon-grip-dotted-vertical">&nbsp;</span>');
	this.ribbon.append(separator);
};


/**
 * Initilization of the Ribbon
 * @hide
 */
GENTICS.Aloha.Ribbon.prototype.init = function() {
	$(document.body).append(this.ribbon);

	if (GENTICS.Aloha.settings.ribbon !== false) {
		this.setVisible(true);
	}
};

/**
 * Displays or hides the ribbon.
 * @param {boolean} visibility True if the ribbon should be displayed, false if it should be hidden.
 * @method
 */
GENTICS.Aloha.Ribbon.prototype.setVisible = function (visibility) {		
	if (visibility && ! this.visible) {
		this.ribbon.show();
		$(document.body).css('paddingTop', '30px !important');
		this.visible = true;
	}
	
	if (!visibility && this.visible) {
		this.ribbon.hide();
		$(document.body).css('paddingTop', '');
		this.visible = false;
	}
};

GENTICS.Aloha.Ribbon = new GENTICS.Aloha.Ribbon();