export type TextLinkColor = "cp-black" | "cp-sky-blue" | "cp-dark-blue";

export function getTextLinkColorStyle(color: TextLinkColor): string {
  switch (color) {
    case "cp-black":
      return "text-cp-black";
    case "cp-sky-blue":
      return "text-cp-sky-blue";
    case "cp-dark-blue":
      return "text-cp-dark-blue";
    default:
      return "text-cp-black";
  }
}
