/*
 * IT-Portal GOA – baut die Kacheln einer Seite aus assets/data.js.
 * Jede Seite setzt im <body>:
 *   data-page="…"   Schlüssel aus PORTAL.pages
 *   data-root="…"   relativer Weg zum Portal-Hauptordner ("" oder "../")
 */
(function () {
  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var pageId = body.getAttribute("data-page");
  var data = window.PORTAL || {};
  var page = (data.pages || {})[pageId];
  var mount = document.getElementById("content");
  if (!page || !mount) return;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function resolve(href) {
    if (/^(https?:|mailto:|tel:)/.test(href)) return href;
    return root + href;
  }

  function art(r) {
    var fn = window.ICONS && window.ICONS[r.icon];
    return fn ? fn(r.iconOptions) : "";
  }

  function tile(id) {
    var r = data.resources[id];
    if (!r) {
      console.warn("Unbekannte Ressource:", id);
      return "";
    }
    var cls = "tile tone-" + (r.tone || "slate");
    var inner =
      '<span class="tile-art">' + art(r) + "</span>" +
      '<span class="tile-label">' + esc(r.title) + "</span>";

    if (r.disabled || !r.href) {
      return (
        '<li><div class="' + cls + ' is-disabled" aria-disabled="true" title="Noch nicht verfügbar">' +
        inner +
        (r.badge ? '<span class="tile-badge">' + esc(r.badge) + "</span>" : "") +
        '<span class="visually-hidden"> – noch nicht verfügbar</span>' +
        "</div></li>"
      );
    }

    var attrs = ' href="' + esc(resolve(r.href)) + '"';
    var ext = "";
    if (r.external) {
      attrs += ' target="_blank" rel="noopener"';
      ext = '<span class="tile-ext" aria-hidden="true">' + window.UI_ICONS.external + "</span>";
    }
    return (
      '<li><a class="' + cls + '"' + attrs + ">" + inner + ext +
      (r.badge ? '<span class="tile-badge">' + esc(r.badge) + "</span>" : "") +
      "</a></li>"
    );
  }

  var html = "";
  (page.sections || []).forEach(function (sec) {
    html += '<section class="section">';
    if (sec.title) html += '<h2 class="section-title">' + esc(sec.title) + "</h2>";
    html += '<ul class="tiles">' + sec.tiles.map(tile).join("") + "</ul></section>";
  });

  if (page.checklist) {
    html +=
      '<section class="section"><h2 class="section-title">' + esc(page.checklist.title) + "</h2>" +
      '<div class="card"><ul class="checklist">' +
      page.checklist.items
        .map(function (t) {
          return '<li><span class="tick">' + window.UI_ICONS.check + "</span><span>" + esc(t) + "</span></li>";
        })
        .join("") +
      "</ul></div></section>";
  }

  mount.innerHTML = html;
})();
