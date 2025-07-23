// 性別マスター
export type GenderOption = {
  label: string;
  value: "男性" | "女性" | "その他";
};

export const genderOptions: GenderOption[] = [
  { label: "男性", value: "男性" },
  { label: "女性", value: "女性" },
  { label: "その他", value: "その他" },
];
