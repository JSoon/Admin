//
//
// jQuery ajax global settings
//
//
$.ajaxSetup( {
    global: true,
    aysnc: true,
    cache: false,
    timeout: 10000
} );
$( document ).ajaxSend( function( event, jqXHR, settings ) { // Triggered by every xhr
    // console.log('ajaxSend');
} ).ajaxSuccess( function( event, jqXHR, settings ) { // Triggered by every xhr
    // console.log('ajaxSuccess');
} ).ajaxComplete( function( event, jqXHR, settings ) { // Triggered by every xhr
    // console.log('ajaxComplete');
} ).ajaxError( function( event, jqXHR, ajaxSettings, errorThrown ) { // Triggered by every xhr
    var textStatus = jqXHR.statusText; // When ajax request fails
    if ( textStatus == 'notmodified' ) {
        alert( 'notmodified' );
    } else if ( textStatus == 'error' ) {
        alert( 'error' );
    } else if ( textStatus == 'timeout' ) {
        alert( 'timeout' );
    } else if ( textStatus == 'abort' ) {
        alert( 'abort' );
    } else if ( textStatus == 'parsererror' ) {
        alert( 'parsererror' );
    } else {
        alert( errorThrown ); // When an HTTP error occurs
    }
} );