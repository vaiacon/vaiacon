/** Angebots-/Paket-Karte mit Feature-Liste und Preiszeile («Zwei Pakete. Eine Begleitung.»). */
export interface PackageCardProps {
  /** terra = Verlauf #C05D29→#A54A1B (Standard) · dark = #171210 mit Orange-Akzenten · sand = helle Karte mit Hairline für helle Sektionen */
  variant?: 'terra' | 'dark' | 'sand';
  /** z. B. «PAKET 01 · ARBEITSWEISE» */
  badge?: string;
  title: string;
  /** 1 Satz unter dem Titel */
  subtitle?: string;
  /** ✓-Zeilen */
  features?: string[];
  /** Standard «AUF ANFRAGE» */
  price?: string;
  style?: React.CSSProperties;
}
