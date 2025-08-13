(() => {
  "use strict";

  function scaleArea(area, scale) {
    const orig = area.dataset.origCoords || area.coords;
    if (!area.dataset.origCoords) area.dataset.origCoords = orig;
    const nums = orig.split(",").map(Number);
    const scaled = nums.map(v => Math.round(v * scale));
    area.coords = scaled.join(",");
  }

  function rescaleMap(img) {
    const usemap = img.getAttribute("usemap");
    if (!usemap) return;
    const map = document.querySelector(`map${usemap}`);
    if (!map) return;
    const naturalWidth = img.naturalWidth || img.width;
    if (!naturalWidth) return;
    const scale = img.clientWidth / naturalWidth;
    map.querySelectorAll("area").forEach(area => scaleArea(area, scale));
  }

  function setup(img) {
    if (img.complete) rescaleMap(img);
    img.addEventListener("load", () => rescaleMap(img));
    const ro = new ResizeObserver(() => rescaleMap(img));
    ro.observe(img);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img[usemap]").forEach(setup);
  });
})();