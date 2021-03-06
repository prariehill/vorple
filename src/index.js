/**
 * @private
 * @module index
 */

import "../haven/bootstrap";
import vex from "vex-js";
import { version } from "../package.json";

window.vorple = {
    ...require( "./vorple" ),
    audio: require( "./audio" ),
    debug: require( "./debug" ),
    haven: require( "./haven" ),
    layout: require( "./layout" ),
    prompt: require( "./prompt" ),
    options: {},
    version
};

// expose jQuery
window.jQuery = window.$ = require( "jquery" );

// initialize Vex modal windows
vex.registerPlugin( require( "vex-dialog" ) );
window.vex = vex;
vex.defaultOptions.className = "vex-theme-plain";

// load the PowerTip tooltip library
require( "jquery-powertip" );

// expose Toastr notification library
window.toastr = require( "toastr" );