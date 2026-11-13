/*
 * IT-Portal GOA – SVG-Bilder direkt in die Seite einbetten.
 *
 * Warum: Als <img> schneidet der Browser ein SVG an seiner viewBox ab. Direkt eingebettet
 * zeichnet es auch, was außerhalb der viewBox liegt. So bleibt der wichtige Ausschnitt
 * (viewBox) immer ganz sichtbar, und die übrige Fläche füllt die Umgebung der Zeichnung –
 * randlos, egal wie hoch oder breit die Bildfläche gerade ist.
 *
 * Verwendung: <img data-inline-svg src="….svg" alt="…">. Klappt das Laden nicht
 * (z. B. Datei direkt vom Rechner geöffnet), bleibt einfach das <img> stehen.
 * ids werden pro Bild mit einem Präfix versehen, damit sich Muster/Clips nicht in die
 * Quere kommen.
 */
(function () {
  var bilder = document.querySelectorAll("img[data-inline-svg]");
  Array.prototype.forEach.call(bilder, function (img, nr) {
    var praefix = "svg" + nr + "-";
    fetch(img.getAttribute("src"))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (text) {
        text = text
          .replace(/\sid="([^"]+)"/g, ' id="' + praefix + '$1"')
          .replace(/url\(#([^)]+)\)/g, "url(#" + praefix + "$1)")
          .replace(/href="#([^"]+)"/g, 'href="#' + praefix + '$1"');
        var doc = new DOMParser().parseFromString(text, "image/svg+xml");
        var svg = doc.documentElement;
        if (svg.nodeName.toLowerCase() !== "svg") return;
        svg = document.importNode(svg, true);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", img.getAttribute("alt") || "");
        svg.setAttribute("class", img.getAttribute("class") || "");
        img.parentNode.replaceChild(svg, img);
      })
      .catch(function () { /* <img> bleibt stehen */ });
  });
})();
