// Wo die Dienste liegen: auf vaiacon.ch gleich nebenan (leer), sonst, etwa in
// der Vorschau auf GitHub Pages, auf vaiacon.ch. Muss auf jeder Seite VOR den
// übrigen Skripten stehen; sie hängen ihre /api/-Pfade daran.
window.VAIACON_API_BASIS = /(^|\.)vaiacon\.ch$/.test(location.hostname) ? '' : 'https://vaiacon.ch';
