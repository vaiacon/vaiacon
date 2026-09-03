/** Nummerierte Werte-/Kompass-Kachel («Ist es richtig für …?»). */
export interface KompassTileProps {
  /** zweistellig: «01» … «04» */
  number: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
