/** Team-Karte mit Foto in weicher 16px-Maske («Wer dahinter steht»). Ohne src: gestrichelter Platzhalter. */
export interface TeamCardProps {
  /** Foto-URL; weglassen = Platzhalter */
  src?: string;
  alt?: string;
  name: string;
  /** z. B. «Mitgründer · KMU-Experte» */
  role: string;
  /** Foto-Höhe in px, Standard 330 */
  photoHeight?: number;
  style?: React.CSSProperties;
  /** Platzhalter-Text ohne src */
  children?: React.ReactNode;
}
