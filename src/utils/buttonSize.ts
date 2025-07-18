export type ButtonSize = "small" | "medium" | "large";

export function getButtonSizeStyle(size: ButtonSize): string {
  switch (size) {
    case "small":
      return "w-[100px] h-[38px]";
    case "medium":
      return "w-[170px] h-[38px]";
    case "large":
      return "w-[360px] h-[38px]";
    default:
      return "w-[100px] h-[38px]";
  }
}
