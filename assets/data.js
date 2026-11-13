/*
 * IT-Portal GOA – zentrale Datendatei
 * ------------------------------------
 * Hier werden alle Kacheln (resources) und Seiten (pages) gepflegt.
 *
 * Neue Ressource:   unter "resources" einen Eintrag ergänzen.
 * Neuer Koffer:     1) unter "pages" eine Seite anlegen (z. B. "ipad-koffer-2")
 *                   2) ipads/koffer1.html kopieren → ipads/koffer2.html und dort
 *                      data-page="ipad-koffer-2" sowie den Titel anpassen.
 *
 * Felder einer Ressource:
 *   title     Bildunterschrift der Kachel
 *   icon      Name der Illustration aus assets/icons.js
 *   tone      Hintergrundfarbe der Kachel: blue | green | orange | purple | red | slate
 *   href      Ziel. Interne Pfade relativ zum Portal-Hauptordner (ohne "/" am Anfang)
 *   external  true = öffnet in neuem Tab (z. B. IServ)
 *   disabled  true = ausgegraut, nicht klickbar (z. B. "bald verfügbar")
 *   badge     kleiner Hinweis oben rechts auf der Kachel
 */
window.PORTAL = {
  /*
   * iPad-Koffer. Farbe und Beispiel-iPad bestimmen den Sperrbildschirm in den
   * Anleitungen (wie im toolhub-Tool „Sperrbildschirme für iPads erstellen“).
   */
  koffer: {
    "1": { name: "Koffer 1", farbe: "#c70000", farbname: "Rot", ipad: "101", tag: "iPad-Koffer 1", seite: "ipads/koffer1.html" }
  },

  resources: {
    "koffer-1": {
      title: "iPad-Koffer 1",
      icon: "case",
      iconOptions: { color: "#c70000", label: "1" },
      tone: "slate",
      href: "ipads/koffer1.html"
    },
    "buchen-koffer-1": {
      title: "Buchen",
      icon: "booking",
      tone: "blue",
      href: "https://open.iserv.app/#goa-hh.de/iserv/booking/show/item/7",
      external: true
    },
    "self-help": {
      title: "Technische Probleme?",
      icon: "help",
      tone: "red",
      disabled: true,
      badge: "Bald"
    },
    "fernsteuern": {
      title: "iPads fernsteuern",
      icon: "remote",
      tone: "blue",
      href: "ipads/steuern.html",
      perKoffer: true
    },
    "mdm-iserv": {
      title: "Mobilgerätesteuerung",
      icon: "remote",
      tone: "blue",
      href: "https://open.iserv.app/#goa-hh.de/iserv/mdm/hosts/mdm/device",
      external: true
    },
    "anleitung-steuern": {
      title: "Anleitung",
      icon: "steps",
      tone: "purple",
      href: "anleitungen/ipads-steuern.html",
      perKoffer: true
    },
    "stoerung": {
      title: "Störungsmeldung",
      icon: "report",
      tone: "orange",
      href: "https://open.iserv.app/#goa-hh.de/iserv/report/add",
      external: true
    },
    "anleitung-anmelden": {
      title: "An- und Abmelden",
      icon: "login",
      tone: "purple",
      href: "anleitungen/an-und-abmelden.html",
      perKoffer: true   // bekommt auf Koffer-Seiten ?koffer=… angehängt
    },
    "anleitung-laden": {
      title: "Richtig laden",
      icon: "charge",
      tone: "green",
      href: "anleitungen/laden.html",
      perKoffer: true
    }
  },

  pages: {
    "start": {
      sections: [
        { title: "Geräte", tiles: ["koffer-1"] },
        { title: "Hilfe & Service", tiles: ["self-help", "stoerung", "fernsteuern"] },
        { title: "Anleitungen", tiles: ["anleitung-anmelden", "anleitung-laden"] }
      ]
    },

    "ipads-steuern": {
      sections: [
        { tiles: ["mdm-iserv", "anleitung-steuern"] }
      ]
    },

    "ipad-koffer-1": {
      koffer: "1",
      sections: [
        {
          tiles: [
            "buchen-koffer-1",
            "self-help",
            "stoerung",
            "fernsteuern",
            "anleitung-anmelden",
            "anleitung-laden"
          ]
        }
      ],
      checklist: {
        title: "Vor der Rückgabe",
        items: [
          "Alle Schüler:innen haben sich vom iPad abgemeldet",
          "Alle iPads im Koffer mit der richtigen Farbe",
          "Alle iPads am Ladekabel angeschlossen",
          "Koffer am Strom und Ladevorgang gestartet"
        ]
      }
    }
  }
};
