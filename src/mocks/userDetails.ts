export type UserDetails = {
  id: number;
  nameKanji: string;
  nameKana: string;
  gender: "男性" | "女性";
  birthDate: string;
  membership: "有料" | "無料";
  mail: string;
  prefecture: string;
  tell: string;
  height: string;
  job: string;
  kybId: string;
  mailAllowed: "許可" | "不可";
  referralCode: string;
  referredName: string;
  childNameKanji: string;
  childNameKana: string;
  childGender: "男性" | "女性";
  childBirthDate: string;
};

export const mockUserDetails: UserDetails[] = [
  {
    id: 1,
    nameKanji: "鈴木 明美",
    nameKana: "ゴトウ アケミ",
    gender: "女性",
    membership: "有料",
    prefecture: "広島県",
    birthDate: "2002/12/24",
    kybId: "kyb-939404",
    referralCode: "SLUULO41",
    referredName: "鈴木 くみ子",
    mailAllowed: "許可",
    mail: "sample@test.com",
    tell: "xxx-yyyy-zzzz",
    height: "200cm",
    job: "会社員",
    childNameKanji: "鈴木 明子",
    childNameKana: "すずき あきこ",
    childGender: "女性",
    childBirthDate: "2020/12/15",
  },
];
