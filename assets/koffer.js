/*
 * IT-Portal GOA – aktuellen iPad-Koffer bestimmen (für Anleitungen).
 *
 * Welcher Koffer: ?koffer=… in der Adresse, sonst der zuletzt besuchte Koffer
 * (localStorage), sonst keiner. Ergebnis: window.GOA_KOFFER (Eintrag aus PORTAL.koffer
 * oder null).
 *
 * Füllt außerdem, falls vorhanden:
 *   #koffer-chip            Hinweis „● Koffer 1“ im Seitenkopf
 *   [data-koffer-farbname]  Farbname des Koffers in Kleinbuchstaben („rot“)
 *   [data-koffer-nur]       wird nur angezeigt, wenn ein Koffer bekannt ist
 */
(function () {
  var alleKoffer = (window.PORTAL || {}).koffer || {};
  var id = null;
  try { id = new URLSearchParams(location.search).get("koffer"); } catch (e) {}
  if (id && alleKoffer[id]) {
    try { localStorage.setItem("goa-koffer", id); } catch (e) {}
  } else {
    try { id = localStorage.getItem("goa-koffer"); } catch (e) { id = null; }
  }
  var koffer = (id && alleKoffer[id]) || null;
  window.GOA_KOFFER = koffer;
  if (!koffer) return;

  var chip = document.getElementById("koffer-chip");
  if (chip) {
    chip.innerHTML =
      '<span class="chip"><span class="dot" style="background:' + koffer.farbe + '"></span>' +
      koffer.name + "</span>";
  }
  var namen = document.querySelectorAll("[data-koffer-farbname]");
  for (var i = 0; i < namen.length; i++) namen[i].textContent = (koffer.farbname || "").toLowerCase();
  var nur = document.querySelectorAll("[data-koffer-nur]");
  for (var k = 0; k < nur.length; k++) nur[k].hidden = false;
})();
