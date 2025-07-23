// 性別マスター
export type UserRank = {
  label: string;
  value: "有料" | "無料";
};

export const UserRankOptions: UserRank[] = [
  { label: "有料", value: "有料" },
  { label: "無料", value: "無料" },
];
