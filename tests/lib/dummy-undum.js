/**
 * The minimum amount of code required to get Undum running
 */

$( "html" ).attr( "lang", 'en' );

undum.game.situations.start = new undum.SimpleSituation( "<p>start</p>" );

$( function() {
	$( 'body' ).append( '<div id="content"></div>' );
});