/** Nummerierte Leistungs-Zeile mit Hairline-Trennern und Schiebe-Hover. Gestapelt in flex-column verwenden. */
export interface ServiceRowProps {
  /** zweistellig: «01», «02» … */
  number: string;
  title: string;
  /** true bei der letzten Zeile (schliesst mit Hairline unten ab) */
  last?: boolean;
  style?: React.CSSProperties;
  /** Beschreibung, 1–2 Sätze */
  children?: React.ReactNode;
}
