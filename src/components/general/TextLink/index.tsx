import { getTextLinkColorStyle } from "@/utils/textLinkColor";
import { getTextLinkSizeStyle } from "@/utils/textLinkSize";
import Link from "next/link";

type TextLinkProps = {
  href: string;
  children?: React.ReactNode;
  size?: "large" | "small";
  color?: "cp-black" | "cp-sky-blue" | "cp-dark-blue";
  underline?: boolean;
  className?: string;
};

export default function TextLinkCP({
  href,
  children,
  size = "small",
  color = "cp-black",
  underline = true,
  className = "",
}: TextLinkProps) {
  const sizeStyle = getTextLinkSizeStyle(size);
  const colorStyle = getTextLinkColorStyle(color);
  const underlineStyle = underline ? "underline" : "";

  return (
    <Link
      href={href}
      className={`${colorStyle} ${sizeStyle} ${underlineStyle} ${className}`}
    >
      {children}
    </Link>
  );
}
