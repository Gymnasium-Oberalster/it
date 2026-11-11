# IT-Portal Gymnasium Oberalster

Mobil optimiertes Hilfe-Portal zur IT am GOA, gehostet über GitHub Pages.
QR-Codes an Geräten (z. B. iPad-Koffern) verlinken direkt auf die passende Seite,
z. B. `ipads/koffer1.html`.

## Aufbau

- `index.html` – Startseite
- `ipads/koffer1.html` – Seite für iPad-Koffer 1 (QR-Code-Ziel)
- `anleitungen/` – Schritt-für-Schritt-Anleitungen
- `assets/data.js` – **alle Kacheln und Seiten werden hier gepflegt**
- `assets/icons.js` – SVG-Illustrationen der Kacheln
- `assets/app.js` – baut die Kacheln aus `data.js`
- `assets/style.css` – Design (inkl. Dunkelmodus)

## Neuen Koffer anlegen

1. In `assets/data.js` eine Seite (z. B. `"ipad-koffer-2"`) und ggf. eine Buchen-Ressource ergänzen.
2. `ipads/koffer1.html` kopieren → `ipads/koffer2.html`, darin `data-page` und Titel anpassen.

## Lokal testen

```bash
python3 -m http.server 8765
```
