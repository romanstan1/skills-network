// import * as d3 from "d3";
import $ from "jquery";
import {reset} from './network_functions'

let resizeId
let fullscreen = false

export function toggleFullScreen() {
  if (document.documentElement.webkitRequestFullscreen && !fullscreen) {
    document.documentElement.webkitRequestFullscreen()
    fullscreen = true
  }
  else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
    fullscreen = false
  }
}

$(window).resize(function() {
  clearTimeout(resizeId);
  resizeId = setTimeout(reset, 500);
});
