/* vorple.tooltip.js - helpers for QTip2 tooltips */

( function( $ ) {
    /** @namespace Tooltip helpers.
     * @description Requires the qTip2 library.
     * @see <a href="http://craigsworks.com/projects/qtip2/">
     * http://craigsworks.com/projects/qtip2/
     * </a>
     */
    vorple.tooltip = {};
    
    /**
     * Default tooltip options
     */
    vorple.tooltip.defaults = {
        show: { event: 'mouseenter', ready: false },
        content: { attr: 'title' },
        position: { my: 'bottom left', at: 'top center' },
        overwrite: false,
        delay: 3000,
        duration: 10000
    };
    
    /**
     * Creates a tooltip for the selected element.
     * 
     * @param {string|jQuery} element A jQuery
     * @param {object} [options] 
     * <table><tr><th>name</th><th>type</th><th>default</th><th>description</th></tr>
     * <tr><td>content</td><td>string</td><td></td>
     * <td>Content of the tooltip.</td></tr>
     * <tr><td>event</td><td>string</td><td>"mouseover"</td>
     * <td>The event that triggers the tooltip. Other options: click, focus.</td></tr>
     * <tr><td>textAttribute</td><td>string</td><td>"title"</td>
     * <td>The attribute that contains the text for the tooltip. For example:
     * <code>&lt;a href="test" title="This is the content of the tooltip"&gt;</code>
     * If the content option has been given, textAttribute is ignored.</td></tr>
     * <tr><td>position</td><td>object</td>
     * <td>{ my: 'bottom left', at: 'top center' }</td>
     * <td>The position of the tooltip relative to the target and the position
     * of the tooltip's arrow. See 
     * <a href="http://craigsworks.com/projects/qtip2/docs/position/">
     * http://craigsworks.com/projects/qtip2/docs/position/
     * </a> for details. qTip2's target option is supported. 
     * </td></tr>
     * </table>
     * @private
     */
    vorple.tooltip._create = function( element, options ) {
        var self = this;
        var opt = $.extend( {}, self.defaults, options );
        var $element = $( element );
        
        // if no content has been given, use the attribute
        if( !opt.content && $element.attr( opt.content.attr ) ) {
//            opt.content = { attr: opt.textAttribute };
        }

        if( opt.content ) {
            $element.qtip( opt );
        }
        
        return $element;
    };
    
    
    /**
     * Enables tooltips for the given element(s) as a delegated event, i.e. the
     * tooltips will be created for existing elements and any future elements
     * that match the selector.
     * 
     * @param {string|jQuery} element The elements to activate as a jQuery
     * object or a jQuery selector.
     * @param {object} [options] The same as {@link vorple.tooltip.create}.
     * @return A reference to the created $.delegate() object
     */
    vorple.tooltip.enable = function( element, options ) {
        var self = this;
        var opt = $.extend( true, {}, self.defaults, { show: { ready: true, event: self.defaults.show.event } }, options );

        return $( document ).delegate( element, opt.show.event, function( e ) {
            self._create( this, opt );
        }, event );
    };
    
    
    /**
     * Creates and displays a tooltip on an element with the given text.
     * 
     * @param {string|jQuery} element The target of the tooltip
     * @param {string} [text=true] The message in the tooltip. If true, the
     * title attribute of the element is used.
     * @param {object} [options]
     */
    vorple.tooltip.show = function( element, text, options ) {
        var self = this;
        
        if( typeof text === 'undefined' ) {
            text = true;
        }
        
        var opt = $.extend( 
            {}, 
            self.defaults, 
            {
                show: { 
                    ready: false, 
                    event: false
                }, 
                hide: { 
                    event: false
                }, 
                content: { 
                    text: text 
                },
                events: {
                    hide: function( event, api ) { api.destroy(); }
                }
            }, 
            options 
        );
        
        var $element = self._create( element, opt );
        
        return setTimeout( function() {
            if( $element.length > 0 ) {
                $element.qtip( 'show' );
                setTimeout( function() {
                    if( $element.length > 0 ) {
                        $element.qtip( 'hide' );
                    }
                }, opt.duration );
            }
        }, opt.delay );
    };
})( jQuery );