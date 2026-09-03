/** FAQ-Zeile (<details>) mit rotierendem «+»-Indikator. Gestapelt verwenden; letzte Zeile mit last. */
export interface FaqItemProps {
  question: string;
  /** true bei der letzten Zeile */
  last?: boolean;
  defaultOpen?: boolean;
  style?: React.CSSProperties;
  /** Antwort (1–3 Sätze) */
  children?: React.ReactNode;
}
