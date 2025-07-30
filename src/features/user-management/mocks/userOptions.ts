// ユーザーランク
export type UserRank = {
  label: string;
  value: "有料" | "無料";
};

export const UserRankOptions: UserRank[] = [
  { label: "有料", value: "有料" },
  { label: "無料", value: "無料" },
];

// メール配信許可
export type MailAllowed = {
  label: string;
  value: "許可" | "不可";
};

export const mailAllowedOptions: MailAllowed[] = [
  { label: "許可", value: "許可" },
  { label: "不可", value: "不可" },
];

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
