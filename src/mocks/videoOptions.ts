// カテゴリマスター
export type VideoCategory = {
  label: string;
  value: "カテゴリ1" | "カテゴリ2" | "カテゴリ3" | "カテゴリ4" | "カテゴリ5";
};

export const videoCategories: VideoCategory[] = [
  { label: "カテゴリ1", value: "カテゴリ1" },
  { label: "カテゴリ2", value: "カテゴリ2" },
  { label: "カテゴリ3", value: "カテゴリ3" },
  { label: "カテゴリ4", value: "カテゴリ4" },
  { label: "カテゴリ5", value: "カテゴリ5" },
];

// カテゴリマスター
export type VideoKeyword = {
  label: string;
  value: "タグ1" | "タグ2" | "タグ3";
};

export const videoKeywords: VideoKeyword[] = [
  { label: "タグ1", value: "タグ1" },
  { label: "タグ2", value: "タグ2" },
  { label: "タグ3", value: "タグ3" },
];

// 公開範囲
export type ViewingRestriction = {
  label: string;
  value: "公開" | "限定公開";
};

export const viewingRestrictions: ViewingRestriction[] = [
  { label: "公開", value: "公開" },
  { label: "限定公開", value: "限定公開" },
];

// 公開ステータス
export type PublishStatus = {
  label: string;
  value: "公開" | "非公開";
};

export const publishStatuses: PublishStatus[] = [
  { label: "公開", value: "公開" },
  { label: "非公開", value: "非公開" },
];
