export type ConsultationStatus = {
  label: string;
  value: "仮登録" | "本登録" | "却下";
};

export const ConsultationStatusOptions: ConsultationStatus[] = [
  { label: "仮登録", value: "仮登録" },
  { label: "本登録", value: "本登録" },
  { label: "却下", value: "却下" },
];

export type ConsultationType = {
  label: string;
  value: "初回相談" | "栄養相談" | "フォローアップ" | "メンタル相談";
};

export const ConsultationTypeOptions: ConsultationType[] = [
  { label: "初回相談", value: "初回相談" },
  { label: "栄養相談", value: "栄養相談" },
  { label: "フォローアップ", value: "フォローアップ" },
  { label: "メンタル相談", value: "メンタル相談" },
];
