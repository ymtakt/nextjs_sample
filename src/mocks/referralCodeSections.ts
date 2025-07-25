// 性別マスター
export type ReferralCodeSection = {
  label: string;
  value: "KYBパートナー" | "医療機関" | "社員";
};

export const referralCodeSections: ReferralCodeSection[] = [
  { label: "KYBパートナー", value: "KYBパートナー" },
  { label: "医療機関", value: "医療機関" },
  { label: "社員", value: "社員" },
];
