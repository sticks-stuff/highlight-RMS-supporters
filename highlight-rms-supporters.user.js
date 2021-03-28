// ==UserScript==
// @name            Highlight RMS supporters
// @description     Highlights those who have signed the RMS Support letter
// @include         *
// @author          stick
// @version         1.1
// @homepageURL     https://github.com/sticks-stuff/highlight-RMS-supporters
// @namespace       https://greasyfork.org/users/710818
// ==/UserScript==

function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}

addStyleSheet('@import "https://sticks-stuff.github.io/highlight-RMS-supporters/styles.css";');
