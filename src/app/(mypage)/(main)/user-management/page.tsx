"use client";

import { useState } from "react";
import { User, mockUsers } from "@/mocks/users";
import BaseButton from "@/components/general/Button/BaseButton";
import ButtonModal from "@/components/general/Modals/ButtonModal";
import UserSearchForm, {
  UserSearchParams,
} from "@/features/user-management/components/UserSearch";
import UserTable from "@/features/user-management/components/UserTable";

export default function UserManagement() {
  const [showCSVDownloadModal, setShowCSVDownloadModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);

  const handleSearch = (params: UserSearchParams) => {
    const filtered = mockUsers.filter((user) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const userValue = user[key as keyof typeof user];
        return userValue?.toString().includes(value.toString());
      });
    });

    setFilteredUsers(filtered);
  };

  const handleReset = () => {
    setFilteredUsers(mockUsers);
  };

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
        合計 {filteredUsers.length}件
      </div>
      <div className="px-5 ">
        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
}
