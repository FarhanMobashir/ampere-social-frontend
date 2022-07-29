export interface ImageProps {
  type?: "square" | "rounded" | "circle";
  width: string;
  height: string;
  widthMobile?: string;
  heightMobile?: string;
  filter?: string;
}
