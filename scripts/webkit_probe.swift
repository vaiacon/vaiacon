// Zeigt eine Seite so, wie Safari sie zeichnet (WebKit), misst den Kopf und
// macht ein Bild davon.
//
//     swift scripts/webkit_probe.swift <adresse> <breite> <hoehe> [bild.png]
//
// Beispiel — Kontaktseite auf dem iPhone, so wie Safari sie mit Leisten zeigt:
//
//     swift scripts/webkit_probe.swift http://127.0.0.1:8765/kontakt.html 390 664 /tmp/kontakt.png
//
// Ausgabe: Fenstergroesse, Hoehe des Terracotta-Kopfs, Luft unter der Kopfzeile,
// Groesse des Bots und ob «Fragen Sie Vaia» sichtbar ist.
//
// Warum es das braucht (26.09.2026): Der Browser in der App ist Chromium, und
// seine Handygroesse 390×844 ist die volle Bildschirmhoehe. Safari zeigt auf dem
// iPhone mit Leisten nur rund 660–750px — eine Regel «unter 700px ausblenden»
// liess dort alle Bots verschwinden, und in Chrome war nichts zu sehen.
// Handy darum immer auch mit 390×664 und 430×740 pruefen.
//
// Laeuft ganz auf dem Rechner, braucht keine Freigabe. Das Fenster liegt auf dem
// Bildschirm, ist aber voellig durchsichtig: In einem Fenster ausserhalb des
// Bildschirms zeichnet WebKit Elemente mit eigener Ebene (transform, Filter,
// Animation) nicht und das Bild waere falsch. Das Bild zeigt nur den ersten
// Bildschirm, also was ohne Scrollen zu sehen ist.

import Cocoa
import WebKit

let argumente = CommandLine.arguments
guard argumente.count >= 4, let adresse = URL(string: argumente[1]),
      let breite = Double(argumente[2]), let hoehe = Double(argumente[3]) else {
  print("Aufruf: swift scripts/webkit_probe.swift <adresse> <breite> <hoehe> [bild.png]")
  exit(1)
}
let bildpfad = argumente.count >= 5 ? argumente[4] : nil

// Laufende Uebergaenge abschliessen, dann messen.
let messung = """
(function () {
  (document.getAnimations ? document.getAnimations() : []).forEach(function (a) {
    try { if (a.effect.getTiming().iterations !== Infinity) a.finish(); } catch (e) {}
  });
  var kopf = document.querySelector('.sv-hero') || document.getElementById('top');
  if (!kopf) return 'Fenster ' + innerWidth + 'x' + innerHeight + ' | kein Terracotta-Kopf';
  var zeile = document.querySelector('.mock-header__inner');
  var zb = zeile ? zeile.getBoundingClientRect() : { bottom: 0 };
  var kb = kopf.getBoundingClientRect();
  var erstes = kopf.querySelector('.sv-kicker, a[href*="lernplaene"], h1');
  var eb = erstes ? erstes.getBoundingClientRect() : kb;
  var bot = kopf.querySelector('.sv-hero__robot');
  var bb = bot ? bot.getBoundingClientRect() : null;
  var chat = document.querySelector('.vc-chat__fab');
  return 'Fenster ' + innerWidth + 'x' + innerHeight +
    ' | Kopf ' + Math.round(kb.height) +
    ' | Luft ' + Math.round(eb.top - zb.bottom) +
    ' | Bot ' + (bb ? Math.round(bb.width) + 'x' + Math.round(bb.height) : '-') +
    ' | Chat ' + (chat ? (getComputedStyle(chat).visibility === 'hidden' ? 'aus' : 'sichtbar') : '-');
})()
"""

class Probe: NSObject, WKNavigationDelegate {
  let web: WKWebView
  let fenster: NSWindow

  init(breite: CGFloat, hoehe: CGFloat) {
    web = WKWebView(frame: NSRect(x: 0, y: 0, width: breite, height: hoehe),
                    configuration: WKWebViewConfiguration())
    fenster = NSWindow(contentRect: NSRect(x: 0, y: 0, width: breite, height: hoehe),
                       styleMask: [.borderless], backing: .buffered, defer: false)
    super.init()
    fenster.contentView = web
    fenster.alphaValue = 0.0          // unsichtbar fuer den Menschen, sichtbar fuer WebKit
    fenster.ignoresMouseEvents = true
    fenster.orderFront(nil)
    web.navigationDelegate = self
  }

  func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    // Die Academy baut ihren Inhalt erst nach dem Laden — kurz warten.
    DispatchQueue.main.asyncAfter(deadline: .now() + 3.5) {
      self.web.evaluateJavaScript(messung) { ergebnis, fehler in
        print(ergebnis ?? fehler ?? "kein Ergebnis")
        guard let pfad = bildpfad else { NSApp.terminate(nil); return }
        self.web.takeSnapshot(with: WKSnapshotConfiguration()) { bild, _ in
          if let bild = bild, let tiff = bild.tiffRepresentation,
             let rep = NSBitmapImageRep(data: tiff),
             let png = rep.representation(using: .png, properties: [:]) {
            try? png.write(to: URL(fileURLWithPath: pfad))
            print("Bild: \(pfad)")
          }
          NSApp.terminate(nil)
        }
      }
    }
  }
}

let app = NSApplication.shared
app.setActivationPolicy(.prohibited)
let probe = Probe(breite: CGFloat(breite), hoehe: CGFloat(hoehe))
probe.web.load(URLRequest(url: adresse))
DispatchQueue.main.asyncAfter(deadline: .now() + 25) {
  print("Zeitueberschreitung — Seite nicht geladen")
  NSApp.terminate(nil)
}
app.run()
