import { mockUserDetails } from "@/mocks/userDetails";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

export default function UserDetailPage({ params }: Props) {
  const userId = parseInt(params.id, 10);
  const user = mockUserDetails.find((u) => u.id === userId);

  if (!user) return notFound();

  // 表示項目をまとめる
  const fields: { label: string; value: string | number }[] = [
    { label: "氏名（漢字）", value: user.nameKanji },
    { label: "氏名（かな）", value: user.nameKana },
    { label: "性別", value: user.gender },
    { label: "生年月日", value: user.birthDate },
    { label: "会員ランク", value: user.membership },
    { label: "都道府県", value: user.prefecture },
    { label: "メール", value: user.mail },
    { label: "電話番号", value: user.tell },
    { label: "身長", value: user.height },
    { label: "職業", value: user.job },
    { label: "KYB-ID", value: user.kybId },
    { label: "メルマガ配信許可", value: user.mailAllowed },
    { label: "紹介コード", value: user.referralCode },
    { label: "紹介者名", value: user.referredName },
    { label: "子どもの氏名（漢字）", value: user.childNameKanji },
    { label: "子どもの氏名（かな）", value: user.childNameKana },
    { label: "子どもの性別", value: user.childGender },
    { label: "子どもの生年月日", value: user.childBirthDate },
  ];

  return (
    <div className="p-6 w-[1160px] space-y-6 text-cp-black bg-cp-white rounded shadow">
      <h1 className="text-xl font-bold">ユーザー詳細情報</h1>

      <div className="grid grid-cols-[300px_1fr]">
        {fields.map(({ label, value }) => (
          <React.Fragment key={label}>
            <div className="body-cp-large border-b py-2 border-cp-light-gray">
              {label}
            </div>
            <div className="body-cp-medium border-b py-2 border-cp-light-gray">
              {value}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
