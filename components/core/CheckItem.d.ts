/** ✓-Listenzeile für Feature-/Nutzenlisten. Rendert ein <li> — in <ul> mit flex-column + gap 12–13px setzen. */
export interface CheckItemProps {
  /** true = ✓ im 22px-Quadrat (radius 6px) statt nacktem Glyph */
  boxed?: boolean;
  /** light auf hellen Flächen (Standard) · onTerra auf Terracotta · onDark auf #171210 */
  tone?: 'light' | 'onTerra' | 'onDark';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
