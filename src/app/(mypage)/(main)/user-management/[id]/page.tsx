import { mockUserDetails } from "@/mocks/userDetails";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function UserDetailPage({ params }: Props) {
  const userId = parseInt(params.id, 10);
  const user = mockUserDetails.find((u) => u.id === userId);

  if (!user) return notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4 text-cp-black">
      <h1 className="text-xl font-bold">ユーザー詳細情報</h1>
      <div className="space-y-1">
        <p>
          <strong>氏名（漢字）:</strong> {user.nameKanji}
        </p>
        <p>
          <strong>氏名（かな）:</strong> {user.nameKana}
        </p>
        <p>
          <strong>性別:</strong> {user.gender}
        </p>
        <p>
          <strong>生年月日:</strong> {user.birthDate}
        </p>
        <p>
          <strong>会員ランク:</strong> {user.membership}
        </p>
        <p>
          <strong>都道府県:</strong> {user.prefecture}
        </p>
        <p>
          <strong>メール:</strong> {user.mail}
        </p>
        <p>
          <strong>電話番号:</strong> {user.tell}
        </p>
        <p>
          <strong>身長:</strong> {user.height}
        </p>
        <p>
          <strong>職業:</strong> {user.job}
        </p>
        <p>
          <strong>KYB-ID:</strong> {user.kybId}
        </p>
        <p>
          <strong>紹介コード:</strong> {user.referralCode}
        </p>
        <p>
          <strong>紹介者名:</strong> {user.referredName}
        </p>
        <p>
          <strong>メルマガ配信許可:</strong> {user.mailAllowed}
        </p>
      </div>
      <h2 className="mt-4 text-lg font-semibold">お子様情報</h2>
      <div className="space-y-1">
        <p>
          <strong>氏名（漢字）:</strong> {user.childNameKanji}
        </p>
        <p>
          <strong>氏名（かな）:</strong> {user.childNameKana}
        </p>
        <p>
          <strong>性別:</strong> {user.childGender}
        </p>
        <p>
          <strong>生年月日:</strong> {user.childBirthDate}
        </p>
      </div>
    </div>
  );
}
