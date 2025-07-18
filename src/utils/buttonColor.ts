export type ButtonColor =
  | "cp-sky-blue"
  | "cp-gray"
  | "cp-red"
  | "cp-white"
  | "cp-slate-gray";

export function getButtonColorStyle(color: ButtonColor): string {
  switch (color) {
    case "cp-sky-blue":
      return "bg-cp-sky-blue text-cp-white";
    case "cp-gray":
      return "bg-cp-gray text-cp-white";
    case "cp-red":
      return "bg-cp-red text-cp-white";
    case "cp-white":
      return "bg-cp-white text-cp-sky-blue border border-cp-sky-blue";
    case "cp-slate-gray":
      return "bg-cp-slate-gray text-cp-white";
    default:
      return "bg-cp-sky-blue text-cp-white";
  }
}
