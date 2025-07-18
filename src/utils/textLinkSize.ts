export type TextLinkSize = "small" | "large";

export function getTextLinkSizeStyle(size: TextLinkSize): string {
  switch (size) {
    case "small":
      return "body-cp-small";
    case "large":
      return "body-cp-large";
    default:
      return "body-cp-small";
  }
}
