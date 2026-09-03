/** Comic-Sprechblase mit Tail — Sticker neben Büro-Bot-Bildern oder Panel-Rahmen im Hero. */
export interface SpeechBubbleProps {
  /** Tail-Richtung: bottom-left (Sticker, Standard) · right/left (Panel zeigt zum Sprecher) */
  tail?: 'bottom-left' | 'right' | 'left';
  /** true = 2px-Tinte-Rand + 6px-Offset-Schatten (Hero-Look); sonst 1.5px + weicher Schatten */
  comic?: boolean;
  /** macht die Blase klickbar (Button mit Lift+Tilt-Hover) */
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
