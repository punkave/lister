// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "lister";

    //Currently, there isn't anything to configure
    		defaults = {
				listClass: "lister"
		};

		// The actual plugin constructor
		function Lister ( element, options ) {
				this.element = element;
				this.$element = $(this.element);
        // jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Lister.prototype = {
			init: function () {
        console.log("You're at least here.");
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like so: this.yourOtherFunction(this.element, this.settings).
				this.cloneSelect();
        this.bindClicks();
        console.log("");
			},

      cloneSelect: function() {
        console.log(this.$element);
        this.$element.each(function(){
          var $thisSelect = $(this);

          console.log($thisSelect);
          //Create the new list
          var thisUl = $thisSelect.clone().wrap("<div></div>").parent().html().replace(/select/g,"ul").replace(/option/g,"li");

          var $thisUl = $(thisUl);

          //Give the list an appropriate class.
          $thisUl.addClass("listerator");

          //Insert the new list into the DOM.
          $thisSelect.after($thisUl);
        })
      },

      bindClicks: function() {
        var $list = $("ul.listerator");

        var $listItem = $list.find("li");
        $listItem.click(function(){
          var $thisItem = $(this);
          var $thisItemSelect = $thisItem.parent().prev(this.$element);

          var $thisItemEquivalent = $thisItemSelect.find("option").eq($thisItem.index());

          $thisItemEquivalent.prop("selected", true);

        });
      }
		};


		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn.lister = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Lister( this, options ) );
						}
				});
		};

})( jQuery, window, document );
