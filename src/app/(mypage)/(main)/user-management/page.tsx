"use client";

import { useState } from "react";
import UserTable from "@/components/general/Tables/UserManagement";
import UserSearchForm from "@/components/general/Tables/UserManagementSearch";
import { User, mockUsers } from "@/mocks/users";
import type { UserSearchParams } from "@/components/general/Tables/UserManagementSearch";
import BaseButton from "@/components/general/Button/BaseButton";
import StatusToast from "@/components/general/Toast";

export default function UserManagement() {
  const [showSuccess, setShowSuccess] = useState(false);
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
    setShowSuccess(true);
  };

  return (
    <div className="justify-center">
      <UserSearchForm onSearch={handleSearch} onReset={handleReset} />
      <div className="pl-4 pt-4 pb-2">
        <BaseButton
          onClick={csvDownload}
          text={"CSVダウンロード"}
          color={"cp-sky-blue"}
          size={"medium"}
        />
      </div>
      {/* 件数表示 */}
      <div className="body-cp-small text-cp-slate-gray text-left pl-4 pt-2">
        合計{filteredUsers.length} 件
      </div>
      <UserTable users={filteredUsers} />
      {/* トースト表示 */}
      {showSuccess && (
        <StatusToast
          message="CSVの処理を追加してください"
          status="error"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
