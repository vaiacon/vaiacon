Comic-Sprechblase — der Büro-Bot «spricht» damit neben seinen Renderings.

```jsx
<SpeechBubble onClick={openChat} style={{ maxWidth: 240 }}>
  Grüezi! Haben Sie Fragen?<br />
  <span style={{ color: 'var(--terra-500)' }}>Chatten Sie direkt mit mir →</span>
</SpeechBubble>

<SpeechBubble comic tail="right">Büro-Bot — fragen Sie mich direkt!</SpeechBubble>
```

`comic` für den Hero-Look (Tinte-Rand + Offset-Schatten); Standard ist der weiche Sticker.
