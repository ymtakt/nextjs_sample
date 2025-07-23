// 性別マスター
export type MailAllowed = {
  label: string;
  value: "許可" | "不可";
};

export const mailAllowedOptions: MailAllowed[] = [
  { label: "許可", value: "許可" },
  { label: "不可", value: "不可" },
];
