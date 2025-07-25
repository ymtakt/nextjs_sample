export type AccountAuthority = {
  label: string;
  value: "AAA" | "BBB" | "CCC";
};

export const AccountAuthorityOptions: AccountAuthority[] = [
  { label: "AAA", value: "AAA" },
  { label: "BBB", value: "BBB" },
  { label: "CCC", value: "CCC" },
];

export type AccountLicense = {
  label: string;
  value: "医師" | "管理栄養士" | "栄養士" | "その他医療従事者" | "なし";
};

export const AccountLicenseOptions: AccountLicense[] = [
  { label: "医師", value: "医師" },
  { label: "管理栄養士", value: "管理栄養士" },
  { label: "栄養士", value: "栄養士" },
  { label: "その他医療従事者", value: "その他医療従事者" },
  { label: "なし", value: "なし" },
];

export type CounselorPublicSetting = {
  label: string;
  value: "open" | "close";
};

export const CounselorPublicSettings: CounselorPublicSetting[] = [
  { label: "open", value: "open" },
  { label: "close", value: "close" },
];
