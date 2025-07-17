export type ButtonColor =
  | "cp-sky-blue"
  | "cp-gray"
  | "cp-red"
  | "cp-white"
  | "cp-slate-gray";

export function getButtonColorClass(color: ButtonColor): string {
  switch (color) {
    case "cp-sky-blue":
      return "bg-cp-sky-blue text-white";
    case "cp-gray":
      return "bg-cp-gray text-white";
    case "cp-red":
      return "bg-cp-red text-white";
    case "cp-white":
      return "bg-cp-white text-cp-sky-blue border border-sky-blue";
    case "cp-slate-gray":
      return "bg-slate-gray text-white";
    default:
      return "bg-cp-sky-blue text-white";
  }
}
