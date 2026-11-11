/*
 * IT-Portal GOA – Illustrationen (SVG, viewBox 0 0 120 120)
 * Jede Illustration ist eine Funktion, die optional Einstellungen erhält.
 */
(function () {
  var INK = "#1d2433";
  var S = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"';

  function svg(inner) {
    return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + inner + "</svg>";
  }

  window.ICONS = {
    /* Kalender mit Haken – Buchen */
    booking: function () {
      var cells = "";
      var cols = [33, 47, 61, 75];
      var rows = [55, 68, 81];
      rows.forEach(function (y, r) {
        cols.forEach(function (x, c) {
          if (r === 2 && c > 1) return; // Platz für den Haken
          cells += '<rect x="' + x + '" y="' + y + '" width="9" height="8" rx="2" fill="#cbd5e1"/>';
        });
      });
      return svg(
        '<rect x="22" y="28" width="76" height="70" rx="10" fill="#fff" ' + S + "/>" +
        '<path d="M22 38a10 10 0 0 1 10-10h56a10 10 0 0 1 10 10v7H22z" fill="#3b82f6" ' + S + "/>" +
        '<rect x="37" y="19" width="7" height="17" rx="3.5" fill="' + INK + '"/>' +
        '<rect x="76" y="19" width="7" height="17" rx="3.5" fill="' + INK + '"/>' +
        cells +
        '<circle cx="88" cy="88" r="17" fill="#22c55e" ' + S + "/>" +
        '<path d="M80 88.5l5.5 5.5 11-11.5" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>'
      );
    },

    /* Rettungsring – Self-Help-Desk */
    help: function () {
      return svg(
        '<circle cx="60" cy="60" r="38" fill="#fff"/>' +
        '<circle cx="60" cy="60" r="28.5" fill="none" stroke="#ef4444" stroke-width="19" stroke-dasharray="22.4 22.4" stroke-dashoffset="11.2"/>' +
        '<circle cx="60" cy="60" r="38" fill="none" ' + S + "/>" +
        '<circle cx="60" cy="60" r="19" fill="#bfdbfe" ' + S + "/>" +
        '<path d="M54.5 55.5a5.5 5.5 0 1 1 7.6 5.1c-1.4.6-2.1 1.6-2.1 3v1" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round"/>' +
        '<circle cx="60" cy="70.5" r="2.3" fill="' + INK + '"/>'
      );
    },

    /* Klemmbrett mit Warndreieck – Störungsmeldung */
    report: function () {
      return svg(
        '<rect x="22" y="24" width="60" height="78" rx="9" fill="#fff" ' + S + "/>" +
        '<rect x="38" y="16" width="28" height="15" rx="5" fill="#94a3b8" ' + S + "/>" +
        '<path d="M34 46h36M34 58h36M34 70h20" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M85 60l23 40H62z" fill="#f59e0b" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M85 74v12" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="85" cy="93.5" r="3" fill="' + INK + '"/>'
      );
    },

    /* iPad mit Person und Pfeilen – An- und Abmelden */
    login: function () {
      return svg(
        '<rect x="22" y="16" width="64" height="88" rx="10" fill="' + INK + '"/>' +
        '<rect x="28" y="23" width="52" height="74" rx="4" fill="#c026d3"/>' +
        '<circle cx="54" cy="50" r="10" fill="#fff"/>' +
        '<path d="M36 79a18 15 0 0 1 36 0z" fill="#fff"/>' +
        '<circle cx="88" cy="86" r="19" fill="#22c55e" ' + S + "/>" +
        '<path d="M79 81h17M91 76l5 5-5 5M97 92H80M85 87l-5 5 5 5" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'
      );
    },

    /* Lehrer-iPad mit Funkwellen zu Schüler-iPad – iPads fernsteuern */
    remote: function () {
      return svg(
        '<rect x="14" y="26" width="54" height="74" rx="9" fill="' + INK + '"/>' +
        '<rect x="19" y="32" width="44" height="62" rx="4" fill="#3b82f6"/>' +
        '<rect x="26" y="42" width="30" height="5" rx="2.5" fill="#fff" opacity=".9"/>' +
        '<rect x="26" y="53" width="13" height="13" rx="3" fill="#fff"/>' +
        '<rect x="43" y="53" width="13" height="13" rx="3" fill="#fff"/>' +
        '<rect x="26" y="70" width="13" height="13" rx="3" fill="#fff"/>' +
        '<rect x="43" y="70" width="13" height="13" rx="3" fill="#facc15"/>' +
        '<path d="M74 31a11 11 0 0 1 0 18M82 24a21 21 0 0 1 0 32" fill="none" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round"/>' +
        '<rect x="78" y="58" width="30" height="42" rx="6" fill="' + INK + '"/>' +
        '<rect x="82" y="63" width="22" height="32" rx="2.5" fill="#a5b4fc"/>' +
        '<rect x="86" y="70" width="14" height="14" rx="3" fill="#facc15"/>'
      );
    },

    /* Akku mit Blitz – Richtig laden */
    charge: function () {
      return svg(
        '<rect x="16" y="38" width="76" height="46" rx="10" fill="#fff" ' + S + "/>" +
        '<rect x="92" y="51" width="9" height="20" rx="3" fill="' + INK + '"/>' +
        '<rect x="23" y="45" width="48" height="32" rx="5" fill="#22c55e"/>' +
        '<path d="M62 22L40 64h16l-6 34 28-44H62l8-32z" fill="#facc15" ' + S + "/>"
      );
    },

    /* Koffer mit Farbmarkierung – iPad-Koffer */
    "case": function (o) {
      o = o || {};
      var color = o.color || "#3b82f6";
      var label = o.label || "";
      return svg(
        '<path d="M45 33v-8a7 7 0 0 1 7-7h16a7 7 0 0 1 7 7v8" fill="none" stroke="' + INK + '" stroke-width="5"/>' +
        '<rect x="14" y="32" width="92" height="68" rx="11" fill="#475569" ' + S + "/>" +
        '<path d="M14 52h92" stroke="' + INK + '" stroke-width="3"/>' +
        '<rect x="28" y="46" width="12" height="12" rx="3" fill="#cbd5e1" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<rect x="80" y="46" width="12" height="12" rx="3" fill="#cbd5e1" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<circle cx="60" cy="77" r="14" fill="' + color + '" ' + S + "/>" +
        (label
          ? '<text x="60" y="82.5" text-anchor="middle" font-size="16" font-weight="800" fill="#fff" font-family="-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif">' + label + "</text>"
          : "")
      );
    }
  };

  /* kleine UI-Symbole */
  window.UI_ICONS = {
    external: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2h6v6M10 2L2 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.5l2.6 2.6L11 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
})();
