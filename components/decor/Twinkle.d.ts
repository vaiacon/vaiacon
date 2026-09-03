/** Funkelnder ✦-Deko-Stern für Terracotta-/Dunkel-Sektionen (Eltern-Element braucht position: relative). */
export interface TwinkleProps {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  /** px, Standard 11 (9–12 üblich) */
  size?: number;
  /** Sekunden Versatz — Sterne immer versetzen */
  delay?: number;
  /** Sekunden, Standard 5.5 (5–6.5 üblich) */
  duration?: number;
  color?: string;
  style?: React.CSSProperties;
}
