/** Dunkle Zitat-Karte (#171210) mit weissem vaiacon-Symbol und Orange-Attribution. Guillemets kommen vom Component. */
export interface QuoteCardProps {
  /** Pfad zu logo-mark-white.png (relativ zur Seite) */
  logoSrc?: string;
  /** Zitat ohne Guillemets */
  quote: string;
  /** z. B. «Eine unserer Grundüberzeugungen» */
  attribution?: string;
  style?: React.CSSProperties;
}
