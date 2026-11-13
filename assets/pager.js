/*
 * IT-Portal GOA – Blättern durch Anleitungsschritte.
 * Erwartet: #slides mit .slide-Abschnitten (id="schritt-N"), #pager-prev, #pager-next, #pager-dots.
 * Wischen funktioniert über Scroll-Snap; die Knöpfe, Punkte und Pfeiltasten springen gezielt.
 * Die Adresse merkt sich den Schritt (#schritt-2), so lässt sich ein Schritt direkt verlinken.
 */
(function () {
  var box = document.getElementById("slides");
  if (!box) return;
  var slides = Array.prototype.slice.call(box.querySelectorAll(".slide"));
  var prev = document.getElementById("pager-prev");
  var next = document.getElementById("pager-next");
  var nextLabel = next.querySelector("span");
  var dotsBox = document.getElementById("pager-dots");
  var root = document.body.getAttribute("data-root") || "";
  var koffer = window.GOA_KOFFER;
  var fertigHref = root + (koffer && koffer.seite ? koffer.seite : "");
  var index = 0;

  // Punkte
  var dots = slides.map(function (s, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pager-dot";
    b.setAttribute("aria-label", "Schritt " + (i + 1));
    b.addEventListener("click", function () { gehe(i); });
    dotsBox.appendChild(b);
    return b;
  });

  // Während eines gezielten Sprungs (Knopf, Punkt, Taste) melden die Zwischenstände der
  // Scroll-Animation alte Schritte – die werden ignoriert, bis das Ziel erreicht ist.
  var ziel = null, zielTimer = 0;

  function gehe(i, sofort) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    ziel = i;
    clearTimeout(zielTimer);
    zielTimer = setTimeout(function () { ziel = null; }, 900);
    box.scrollTo({ left: i * box.clientWidth, behavior: sofort ? "auto" : "smooth" });
    setze(i);
  }

  function setze(i) {
    index = i;
    var letzter = i === slides.length - 1;
    prev.disabled = i === 0;
    // eigene Beschriftung je Schritt möglich: <section class="slide" data-next-label="…">
    nextLabel.textContent = letzter ? "Fertig" : slides[i].getAttribute("data-next-label") || "Weiter";
    next.setAttribute("href", letzter ? fertigHref || root : "#" + slides[i + 1].id);
    next.classList.toggle("done", letzter);
    dots.forEach(function (d, k) {
      d.classList.toggle("active", k === i);
      if (k === i) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
    });
    slides.forEach(function (s, k) { s.setAttribute("aria-hidden", k === i ? "false" : "true"); });
    if (location.hash !== "#" + slides[i].id) {
      try { history.replaceState(null, "", "#" + slides[i].id); } catch (e) {}
    }
  }

  prev.addEventListener("click", function () { gehe(index - 1); });
  next.addEventListener("click", function (e) {
    if (index < slides.length - 1) { e.preventDefault(); gehe(index + 1); }
  });

  // Wischen: Schritt aus der Scrollposition ableiten
  var plan = 0;
  box.addEventListener("scroll", function () {
    cancelAnimationFrame(plan);
    plan = requestAnimationFrame(function () {
      var i = Math.round(box.scrollLeft / box.clientWidth);
      if (ziel !== null) {
        if (i === ziel) { ziel = null; clearTimeout(zielTimer); }
        return;
      }
      if (i !== index) setze(i);
    });
  }, { passive: true });
  // eigenes Wischen hat Vorrang vor einem laufenden Sprung
  box.addEventListener("touchstart", function () { ziel = null; }, { passive: true });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") gehe(index + 1);
    if (e.key === "ArrowLeft") gehe(index - 1);
  });

  // nach Drehen / Größenänderung auf dem aktuellen Schritt bleiben
  window.addEventListener("resize", function () { gehe(index, true); });

  // Start: Schritt aus der Adresse
  var start = slides.findIndex(function (s) { return "#" + s.id === location.hash; });
  gehe(start < 0 ? 0 : start, true);
})();
