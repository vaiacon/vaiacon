# Kompilat neu bauen

Das Repo hat kein Build-Skript; `*.compiled.js` ist eingecheckte Babel-Ausgabe.

```bash
cd .bau && npm install @babel/standalone
node bau.mjs ../ui_kits/website/chat-widget.jsx ../ui_kits/website/chat-widget.compiled.js
```

Danach die `?v=`-Kennung in `index.html` hochsetzen, sonst zeigt der Browser das alte Skript.
