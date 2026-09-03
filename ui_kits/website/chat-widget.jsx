const { Button, ChatMessage } = window.vaiaconDesignSystem_5f353f;

/* Fixes Chat-Widget unten rechts. Antworten sind Fake-Demo (keine API). */
function ChatWidget({ open, onOpen, onClose }) {
  const [msgs, setMsgs] = React.useState([
    { role: 'bot', text: 'Grüezi! Ich beantworte gern Ihre Fragen zu vaiacon, unseren Paketen oder dem vaiaconBot. Womit kann ich helfen?' },
  ]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [bottomOffset, setBottomOffset] = React.useState(0);
  const listRef = React.useRef(null);

  React.useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, busy, open]);

  React.useEffect(() => {
    let frame = 0;

    const updateOffset = () => {
      frame = 0;
      if (window.matchMedia('(max-width: 760px)').matches) {
        setBottomOffset(0);
        return;
      }

      const footer = document.querySelector('footer');
      if (!footer) {
        setBottomOffset(0);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const overlap = Math.max(0, window.innerHeight - footerTop);
      setBottomOffset(overlap > 0 ? Math.ceil(overlap + 18) : 0);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const send = () => {
    const q = input.trim();
    if (!q || busy) return;
    setMsgs((m) => m.concat([{ role: 'user', text: q }]));
    setInput('');
    setBusy(true);
    setTimeout(() => {
      setMsgs((m) => m.concat([{ role: 'bot', text: 'Demo-Antwort: Am besten klären wir das im kostenlosen Erstgespräch – schreiben Sie uns an hallo@vaiacon.ch oder buchen Sie direkt einen Termin.' }]));
      setBusy(false);
    }, 700);
  };

  const chatFabStyle = {
    padding: '14px 18px',
    fontSize: 15.5,
    gap: 10,
    background: 'var(--surface-card-sand)',
    color: 'var(--text-strong)',
    border: '1px solid var(--border-strong)',
    borderRadius: 18,
    boxShadow: 'none',
  };

  return (
    <div data-screen-label="Chatbot" className="chat-root" style={{ position: 'fixed', right: 0, bottom: bottomOffset, zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', transition: 'bottom 0.18s ease' }}>
      {!open && (
        <Button variant="light" size="sm" onClick={onOpen} style={chatFabStyle}>
          <span style={{ width: 24, height: 24, borderRadius: 10, background: 'var(--cream-100)', border: '1px solid rgba(28,22,19,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 24px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--terra-500)', display: 'block' }}></span>
          </span>
          <span className="chat-fab-long">Fragen an den vaiaconBot?</span>
        </Button>
      )}
      {open && (
        <div className="chat-panel" style={{ width: 380, maxWidth: 'calc(100vw - 44px)', height: 560, maxHeight: 'calc(100vh - 44px)', background: 'var(--cream-100)', border: '1.5px solid rgba(28,22,19,0.5)', borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: 'var(--terra-700)', color: 'var(--cream-50)', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 16, fontWeight: 700 }}>vaiacon Assistent</strong>
              <span style={{ fontSize: 12.5, opacity: 0.85 }}>beantwortet Fragen zu Angebot &amp; vaiaconBot</span>
            </div>
            <button onClick={onClose} aria-label="Chat schliessen" style={{ background: 'none', border: 'none', color: 'var(--cream-50)', fontSize: 24, cursor: 'pointer', lineHeight: 1, padding: '4px 6px' }}>×</button>
          </div>
          <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => <ChatMessage key={i} role={m.role === 'user' ? 'user' : 'bot'}>{m.text}</ChatMessage>)}
            {busy && <div style={{ alignSelf: 'flex-start', background: 'var(--surface-card)', border: '1px solid rgba(28,22,19,0.18)', color: 'var(--text-muted)', borderRadius: '14px 14px 14px 4px', padding: '10px 14px', fontSize: 14.5 }}>schreibt …</div>}
          </div>
          <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1.5px solid var(--border-strong)', background: 'var(--bg-alt)' }}>
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ihre Frage…"
              style={{ flex: 1, minWidth: 0, background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 12, padding: '12px 14px', fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--text-strong)', outline: 'none' }}
            />
            <button onClick={send} aria-label="Senden" className="chat-send" style={{ background: 'var(--ink-950)', color: 'var(--cream-100)', border: 'none', borderRadius: 12, padding: '0 18px', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, cursor: 'pointer', opacity: busy ? 0.55 : 1 }}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ChatWidget });
