/*
 * IT-Portal GOA – iPad-Illustrationen für die Anleitung „An- und Abmelden“.
 *
 * Der Bildschirm zeigt den Sperrbildschirm des aktuell gewählten Koffers (Farbe +
 * Beispiel-iPad aus PORTAL.koffer), aufgebaut wie im toolhub-Tool „Sperrbildschirme
 * für iPads erstellen“: Querformat 2160 × 1620, „iPad“ links und Nummer rechts neben
 * dem Benutzerkreis, darunter das Schullogo. Hochkant zeigt iOS davon nur den mittleren
 * Ausschnitt kurz²/lang = 1215 px Breite (x 472,5 … 1687,5).
 *
 * Welcher Koffer: siehe assets/koffer.js (muss vorher geladen sein).
 *
 * Platzhalter im HTML: <div data-ipad-screen="gast|hallo|abmelden"></div>
 */
(function () {
  var root = document.body.getAttribute("data-root") || "";
  var koffer = window.GOA_KOFFER || null;
  var farbe = koffer ? koffer.farbe : "#5b6472";

  // ---------- Geometrie ----------
  var INK = "#1d2433";
  var GREEN = "#22c55e";
  var FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif";
  // Bildschirm im Außenbild
  var SX = 106, SY = 126, SW = 348, SH = 464;
  // Ausschnitt des Sperrbildschirms (Hochformat-Mitte)
  var CX0 = 472.5, CW = 1215, CH = 1620;
  var S = SW / CW;
  // Benutzerkreis (toolhub: Ø 0,3115 · kurze Kante, Mitte 0,0248 · kurze Kante über Bildmitte)
  var KREIS = { x: 1080, y: 810 - 0.0248 * 1620, r: (0.3115 * 1620) / 2 };

  function aussen(x, y) { return [SX + (x - CX0) * S, SY + y * S]; }

  // ---------- Bausteine (Koordinaten des Sperrbildschirms) ----------
  function hintergrund() {
    var s = '<rect x="0" y="0" width="2160" height="1620" fill="' + farbe + '"/>';
    if (koffer && koffer.ipad) {
      s +=
        '<g fill="#fff" font-weight="700" font-size="132.8">' +
        '<text x="804.9" y="817.2" text-anchor="end">iPad</text>' +
        '<text x="1469" y="817.2" text-anchor="middle">' + koffer.ipad + "</text></g>";
    }
    s += '<image href="' + root + 'assets/img/goa-logo-weiss.svg" x="788.4" y="1146.7" width="583.2" height="275.4" preserveAspectRatio="xMidYMid meet"/>';
    return s;
  }

  /*
   * WLAN-Symbol wie bei iOS: ein Fächer (±45°) aus Kreissegment und zwei Bögen mit
   * geraden Kanten. Spitze auf der Grundlinie, Höhe = Versalhöhe der Statusleiste.
   */
  function wlan(cx, grund, hoehe) {
    function p(r, grad) {
      var a = (grad * Math.PI) / 180;
      return (cx + r * Math.sin(a)).toFixed(1) + " " + (grund - r * Math.cos(a)).toFixed(1);
    }
    function band(r1, r2) {
      return "M" + p(r2, -45) + "A" + r2 + " " + r2 + " 0 0 1 " + p(r2, 45) +
        "L" + p(r1, 45) + "A" + r1 + " " + r1 + " 0 0 0 " + p(r1, -45) + "Z";
    }
    var R = hoehe, s = R / 24;
    return (
      '<path fill="#fff" d="M' + cx + " " + grund + "L" + p(7.5 * s, -45) + "A" + 7.5 * s + " " + 7.5 * s + " 0 0 1 " + p(7.5 * s, 45) + "Z" +
      band(10.5 * s, 16 * s) + band(18.8 * s, R) + '"/>'
    );
  }

  /* Statusleiste in Bildschirmkoordinaten (0 … 1215 breit) */
  function statusleiste(links) {
    var grund = 66, versal = 24; // Grundlinie und Versalhöhe der 34er-Schrift
    var oben = grund - versal;
    return (
      '<text x="36" y="' + grund + '" font-size="34" font-weight="600" fill="#fff">' + links + "</text>" +
      wlan(1004, grund, versal) +
      '<text x="1116" y="' + grund + '" font-size="32" font-weight="600" fill="#fff" text-anchor="end">94 %</text>' +
      // Akku: so hoch wie die Versalien
      '<rect x="1128.5" y="' + (oben + 1) + '" width="50" height="' + (versal - 2) + '" rx="6.5" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>' +
      '<rect x="1133" y="' + (oben + 5.5) + '" width="38" height="' + (versal - 11) + '" rx="3.5" fill="#fff"/>' +
      '<path d="M1181.5 ' + (oben + 8) + "a4 4 0 0 1 0 " + (versal - 16) + 'z" fill="#fff" fill-opacity=".5"/>'
    );
  }

  /* ---------- Startbildschirm nach dem Anmelden ----------
   * Bewusst schlicht: Apps nur als einfarbige Quadrate ohne Symbol und Namen,
   * Hintergrund in der Koffer-Farbe. */
  function app(farbe, x, y, groesse) {
    var h = groesse / 2;
    return '<rect x="' + (x - h) + '" y="' + (y - h) + '" width="' + groesse + '" height="' + groesse +
      '" rx="' + groesse * 0.225 + '" fill="' + farbe + '"/>';
  }
  function startbildschirm() {
    var spalten = [215, 411, 607, 802, 998];
    var reihen = [
      ["#1a8cf0", "#34c759", "#8e8e93", "#636366", "#ffffff"], // Dateien, Karten, Kamera, Einstellungen, Grundgesetz
      ["#5b3cc4", "#ffffff", "#0b62d6", "#2e5bd8", "#19c6b5"], // iMovie, IServ, Keynote, Lexika, MEGAfoN
      ["#1f8a3b", "#f2672a", "#f7a21e", "#2f6db5"]             // Numbers, Pages, phyphox, SEB
    ];
    var s = '<rect width="1215" height="1620" fill="' + farbe + '"/>';
    reihen.forEach(function (reihe, r) {
      reihe.forEach(function (f, c) { s += app(f, spalten[c], 200 + r * 210, 140); });
    });
    // Seitenpunkte
    s += '<circle cx="581" cy="1418" r="6" fill="#fff"/><circle cx="607" cy="1418" r="6" fill="#fff" fill-opacity=".45"/><circle cx="633" cy="1418" r="6" fill="#fff" fill-opacity=".45"/>';
    // Dock
    s += '<rect x="255" y="1462" width="705" height="140" rx="44" fill="#fff" fill-opacity=".22"/>';
    [["#1e88e5", 334], ["#f5b301", 464], ["#ffd60a", 594], ["#2f6db5", 751], ["#a7dcf2", 876]].forEach(function (d) {
      s += app(d[0], d[1], 1532, 100);
    });
    s += '<path d="M672 1494v76" stroke="#fff" stroke-opacity=".4" stroke-width="3"/>';
    return s;
  }

  function kreis(personSichtbar) {
    var k = KREIS;
    var s = '<circle cx="' + k.x + '" cy="' + k.y + '" r="' + k.r + '" fill="#fff" fill-opacity=".28"/>';
    if (personSichtbar) {
      s +=
        '<circle cx="' + k.x + '" cy="' + (k.y - 62) + '" r="80" fill="#fff" fill-opacity=".6"/>' +
        '<path d="M' + (k.x - 150) + " " + (k.y + 150) + "a150 128 0 0 1 300 0z" + '" fill="#fff" fill-opacity=".6"/>';
    }
    return s;
  }

  function rundknopf(x, y, art, label) {
    var symbol =
      art === "person"
        ? '<circle cx="' + x + '" cy="' + (y - 14) + '" r="15" fill="#fff"/><path d="M' + (x - 30) + " " + (y + 30) + 'a30 25 0 0 1 60 0z" fill="#fff"/>'
        : '<path d="M' + (x - 20) + " " + (y - 20) + "l40 40M" + (x + 20) + " " + (y - 20) + 'l-40 40" stroke="#fff" stroke-width="8" stroke-linecap="round"/>';
    return (
      '<circle cx="' + x + '" cy="' + y + '" r="52" fill="#fff" fill-opacity=".38"/>' + symbol +
      '<text x="' + x + '" y="' + (y + 96) + '" font-size="30" fill="#fff" text-anchor="middle">' + label + "</text>"
    );
  }

  function mitteText(y, size, text, extra) {
    return '<text x="1080" y="' + y + '" font-size="' + size + '" fill="#fff" text-anchor="middle"' + (extra || "") + ">" + text + "</text>";
  }

  function lockStatus(links) {
    return '<g transform="translate(' + CX0 + ' 0)">' + statusleiste(links) + "</g>";
  }

  // ---------- Bildschirme ----------
  // Sperrbildschirme liegen im Ausschnitt des Koffer-Hintergrunds,
  // der Startbildschirm hat ein eigenes Hintergrundbild (eigene Koordinaten 0 … 1215).
  var STARTBILDSCHIRM = { bereit: true };
  var BILDSCHIRME = {
    bereit: function () {
      return startbildschirm() + statusleiste("Gast&#8195;08:03&#8195;Montag 16. Sept.");
    },
    gast: function () {
      return (
        lockStatus("08:02&#8195;Montag 16. Sept.") +
        mitteText(230, 46, "Zum Fortfahren mit deiner") +
        mitteText(290, 46, "Apple-ID anmelden") +
        '<path d="M640 360H1520M640 465H1520" stroke="#fff" stroke-opacity=".4" stroke-width="3"/>' +
        '<text x="650" y="425" font-size="38" font-weight="700" fill="#fff">Apple-ID</text>' +
        '<text x="840" y="425" font-size="38" fill="#fff" fill-opacity=".55">example@icloud.com</text>' +
        mitteText(545, 40, "Anmelden", ' fill-opacity=".6"') +
        '<text x="1040" y="1530" font-size="23" fill="#fff" fill-opacity=".7" text-anchor="middle">Dieses iPad wird von „Gymnasium Oberalster“ verwaltet.</text>' +
        rundknopf(1590, 1470, "person", "Gast")
      );
    },
    hallo: function () {
      return (
        lockStatus("Gast&#8195;08:02&#8195;Montag 16. Sept.") +
        mitteText(255, 110, "Hallo", ' font-weight="700"') +
        mitteText(325, 38, "Deine Daten werden nach der Abmeldung nicht gesichert.") +
        kreis(true) +
        rundknopf(570, 1470, "x", "Abbrechen") +
        mitteText(1580, 38, "Zum Anmelden Home-Taste drücken", ' font-weight="700"')
      );
    },
    abmelden: function () {
      return (
        lockStatus("Gast") +
        mitteText(330, 250, "05:32", ' font-weight="200"') +
        mitteText(405, 46, "Montag, 16. September") +
        kreis(true) +
        mitteText(1580, 38, "Zum Öffnen Home-Taste drücken", ' font-weight="700"') +
        rundknopf(1590, 1470, "x", "Abmelden")
      );
    }
  };

  // ---------- Markierungen (Koordinaten des Außenbilds) ----------
  function ring(x, y, r) {
    r = r || 30;
    return (
      '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 10) + '" fill="none" stroke="' + GREEN + '" stroke-opacity=".35" stroke-width="3"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + GREEN + '" stroke-width="5"/>'
    );
  }
  function marke(x, y, buchstabe) {
    return (
      '<circle cx="' + x + '" cy="' + y + '" r="17" fill="' + GREEN + '" stroke="#fff" stroke-width="2.5"/>' +
      '<text x="' + x + '" y="' + (y + 7) + '" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">' + buchstabe + "</text>"
    );
  }

  var MARKIERUNGEN = {
    gast: function () {
      var p = aussen(1590, 1500); // Knopf + Beschriftung
      return ring(p[0], p[1], 36);
    },
    hallo: function () {
      return ring(280, 618);
    },
    bereit: function () { return ""; },
    abmelden: function () {
      var p = aussen(1590, 1500); // Knopf + Beschriftung
      return (
        '<rect x="380" y="52" width="72" height="34" rx="17" fill="none" stroke="' + GREEN + '" stroke-width="5"/>' +
        marke(396, 28, "a") + marke(436, 28, "b") +
        ring(p[0], p[1], 36) + marke(p[0] - 56, p[1] - 52, "c")
      );
    }
  };

  // ---------- iPad zusammensetzen ----------
  function ipad(art) {
    return (
      '<svg viewBox="72 8 416 654" xmlns="http://www.w3.org/2000/svg" font-family="' + FONT + '" aria-hidden="true" focusable="false">' +
      // Gehäuse
      '<rect x="392" y="63" width="48" height="11" rx="3" fill="#2b3345"/>' +
      '<rect x="80" y="70" width="400" height="576" rx="36" fill="' + INK + '"/>' +
      '<rect x="85" y="75" width="390" height="566" rx="31" fill="none" stroke="#323b4f" stroke-width="2"/>' +
      '<circle cx="280" cy="98" r="4" fill="#3a4357"/>' +
      '<circle cx="280" cy="618" r="17" fill="none" stroke="#4a546a" stroke-width="3"/>' +
      // Bildschirm
      '<svg x="' + SX + '" y="' + SY + '" width="' + SW + '" height="' + SH + '" viewBox="' +
      (STARTBILDSCHIRM[art] ? "0" : CX0) + " 0 " + CW + " " + CH + '" preserveAspectRatio="xMidYMid slice">' +
      (STARTBILDSCHIRM[art] ? "" : hintergrund()) + BILDSCHIRME[art]() +
      "</svg>" +
      MARKIERUNGEN[art]() +
      "</svg>"
    );
  }

  var ziele = document.querySelectorAll("[data-ipad-screen]");
  for (var i = 0; i < ziele.length; i++) {
    var art = ziele[i].getAttribute("data-ipad-screen");
    if (BILDSCHIRME[art]) ziele[i].innerHTML = ipad(art);
  }
})();
