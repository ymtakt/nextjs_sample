export type HomeDisplayStatus = {
  label: string;
  value: "表示" | "非表示";
};

export const HomeDisplayStatusOptions: HomeDisplayStatus[] = [
  { label: "表示", value: "表示" },
  { label: "非表示", value: "非表示" },
];
