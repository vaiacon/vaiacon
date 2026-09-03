/** Nummerierte Ablauf-Karte («Drei Schritte zur klaren Richtung»). Rendert <li> — in <ol>-Grid setzen. */
export interface StepCardProps {
  /** zweistellig: «01», «02», «03» */
  number: string;
  /** optionales Badge rechts oben, z. B. «KOSTENLOS & UNVERBINDLICH» */
  badge?: string;
  title: string;
  style?: React.CSSProperties;
  /** Beschreibungstext (1–2 Sätze) */
  children?: React.ReactNode;
}
