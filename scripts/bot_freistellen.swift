// Stellt einen Buero-Bot vom weissen Grund frei — mit der Freistellung, die macOS
// selbst mitbringt (dieselbe wie «Motiv freistellen» in Vorschau).
//
//     swift scripts/bot_freistellen.swift "<bild.jpeg>" "<ausgabe.png>"
//
// Laeuft ganz auf dem Rechner: nichts wird heruntergeladen, das Bild geht nirgends
// hin. Braucht macOS 14 oder neuer (Vision, VNGenerateForegroundInstanceMaskRequest).
//
// Die Ausgabe ist das volle Bild mit durchsichtigem Grund. Sie ist noch NICHT
// fertig fuer die Website: Die Maske von macOS ist am Rand ein paar Pixel breiter
// als die Figur, darum bleibt ein heller Saum vom weissen Grund. Danach immer:
//
//     python3 scripts/bot_einpassen.py <ausgabe.png> assets/vaiacon-buerobot-<seite>-<motiv>.png
//
// Was macOS als Motiv erkennt, entscheidet macOS: Sprechblasen, Symbole oder
// Hintergrund fallen oft weg, eine Figur, die der Bot beruehrt, bleibt meist dabei.
// Eingeschlossene Reste des Grundes (zwischen Kabelwindungen, unter einer Blase)
// erkennt macOS nicht — auf Terracotta ansehen, bevor das Bild eingebaut wird.

import CoreImage
import Foundation
import Vision

let argumente = CommandLine.arguments
guard argumente.count == 3 else {
    print("Aufruf: swift scripts/bot_freistellen.swift <bild> <ausgabe.png>")
    exit(1)
}
let eingabe = URL(fileURLWithPath: argumente[1])
let ausgabe = URL(fileURLWithPath: argumente[2])

guard let bild = CIImage(contentsOf: eingabe) else {
    print("Bild nicht lesbar: \(eingabe.path)")
    exit(1)
}

let anfrage = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: bild)
try handler.perform([anfrage])

guard let ergebnis = anfrage.results?.first else {
    print("Kein Motiv gefunden.")
    exit(1)
}
print("Motive gefunden: \(ergebnis.allInstances.count)")

// Alle erkannten Motive zusammen, im vollen Bildformat (nicht zugeschnitten),
// damit die Nacharbeit mit denselben Koordinaten wie das Original rechnen kann.
let puffer = try ergebnis.generateMaskedImage(
    ofInstances: ergebnis.allInstances, from: handler, croppedToInstancesExtent: false)
let freigestellt = CIImage(cvPixelBuffer: puffer)
try CIContext().writePNGRepresentation(
    of: freigestellt, to: ausgabe, format: .RGBA8,
    colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
print("Geschrieben: \(ausgabe.path)")
