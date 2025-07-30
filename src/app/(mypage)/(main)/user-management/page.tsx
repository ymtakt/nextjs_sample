"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { User, mockUsers } from "@/features/user-management/mocks/users";
import BaseButton from "@/components/general/Button/BaseButton";
import ButtonModal from "@/components/general/Modals/ButtonModal";
import UserSearchForm, {
  UserSearchParams,
} from "@/features/user-management/components/UserSearch";
import UserTable from "@/features/user-management/components/UserTable";

export default function UserManagement() {
  const searchParams = useSearchParams();
  const [showCSVDownloadModal, setShowCSVDownloadModal] = useState(false);
  const [filteredTableItems, setFilteredTableItems] =
    useState<User[]>(mockUsers);

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

  const csvDownload = () => {
    // TODO: ダウンロード処理を書く
    console.log("csvダウンロード処理");
    setShowCSVDownloadModal(false);
  };

  return (
    <div className="">
      <p className="p-5 title-cp-medium text-cp-slate-gray">ユーザー管理</p>
      <div className="px-5">
        <UserSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>
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
      <div className="px-5 ">
        <UserTable users={filteredTableItems} />
      </div>
    </div>
  );
}
