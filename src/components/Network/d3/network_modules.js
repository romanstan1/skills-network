// import * as d3 from "d3";
import $ from "jquery";
import {reset} from './network_functions'

let resizeId

export function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.webkitRequestFullscreen()
  else {
    if (document.exitFullscreen) document.exitFullscreen()
  }
}

$(window).resize(function() {
  clearTimeout(resizeId);
  resizeId = setTimeout(reset, 500);
});
