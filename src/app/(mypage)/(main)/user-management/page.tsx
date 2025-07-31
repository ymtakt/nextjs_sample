"use client";

// ネイティブライブラリ
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// 共通コンポーネント
import BaseButton from "@/components/general/Button/BaseButton";
import ButtonModal from "@/components/general/Modals/ButtonModal";
// featureコンポーネント
import { User, mockUsers } from "@/features/user-management/mocks/users";
import UserSearchForm, {
  UserSearchParams,
} from "@/features/user-management/components/UserSearch";
import UserTable from "@/features/user-management/components/UserTable";

export default function UserManagement() {
  // インスタンス化
  const searchParams = useSearchParams();

  // ステートのインスタンス化
  const [showCSVDownloadModal, setShowCSVDownloadModal] = useState(false);
  const [filteredTableItems, setFilteredTableItems] =
    useState<User[]>(mockUsers);

  // 検索時の処理
  const handleSearch = useCallback((params: UserSearchParams) => {
    const filtered = mockUsers.filter((item) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key as keyof typeof item];
        return itemValue?.toString().includes(value.toString());
      });
    });
    setFilteredTableItems(filtered);
  }, []);

  // リセット時の処理
  const handleReset = () => {
    setFilteredTableItems(mockUsers);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: UserSearchParams = {
      id: searchParams.get("id") || "",
      nameKanji: searchParams.get("nameKanji") || "",
      nameKana: searchParams.get("nameKana") || "",
      gender: searchParams.get("gender") || "",
      membership: searchParams.get("membership") || "",
      appId: searchParams.get("appId") || "",
      referralCode: searchParams.get("referralCode") || "",
      mailAllowed: searchParams.get("mailAllowed") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  // TODO: ダウンロード処理を書く
  const csvDownload = () => {
    console.log("csvダウンロード処理");
    setShowCSVDownloadModal(false);
  };

  return (
    <div>
      {/* タイトル */}
      <div>
        <p className="p-5 title-cp-medium text-cp-slate-gray">ユーザー管理</p>
      </div>

      {/* 検索フォーム */}
      <div className="px-5">
        <UserSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* ボタンとモーダル */}
      <div className="pl-5 py-4">
        <BaseButton
          onClick={() => setShowCSVDownloadModal(true)}
          text={"CSVダウンロード"}
          color={"cp-sky-blue"}
          size={"medium"}
        />
        <ButtonModal
          isOpen={showCSVDownloadModal}
          title="CSVダウンロード"
          leftButtonText="キャンセル"
          rightButtonText="ダウンロードする"
          leftButtonColor="cp-white"
          rightButtonColor="cp-sky-blue"
          isCaption={true}
          caption="CSVをダウンロードしますか？"
          isLine={true}
          onRight={csvDownload}
          onLeft={() => setShowCSVDownloadModal(false)}
        />
      </div>

      {/* 件数表示 */}
      <div className="body-cp-small text-cp-slate-gray text-left pl-5">
        合計 {filteredTableItems.length}件
      </div>

      {/* テーブル */}
      <div className="px-5 ">
        <UserTable users={filteredTableItems} />
      </div>
    </div>
  );
}
