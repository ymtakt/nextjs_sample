"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import BaseButton from "@/components/general/Button/BaseButton";
import { Account, mockAccounts } from "@/mocks/accounts";
import AccountSearchForm, {
  AccountSearchParams,
} from "@/features/account-management/compnentes/AccountSearch";
import AccountTable from "@/features/account-management/compnentes/AccountTable";

export default function AccountManagement() {
  const router = useRouter();
  const [filteredAccounts, setFilteredAccounts] =
    useState<Account[]>(mockAccounts);

  const handleSearch = (params: AccountSearchParams) => {
    const filtered = mockAccounts.filter((account) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const accountValue = account[key as keyof typeof account];
        return accountValue?.toString().includes(value.toString());
      });
    });

    setFilteredAccounts(filtered);
  };

  const handleReset = () => {
    setFilteredAccounts(mockAccounts);
  };

  const makeAccount = () => {
    // TODO: 新規作成処理を書く
    console.log("アカウントの新規作成");
    router.push(`/${ROUTES.ACCOUNT_MANAGEMENT}/${ROUTES.MAKE_ACCOUNT}`);
  };

  return (
    <div className="">
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          サプリメント管理
        </p>
        <div className="py-2.5">
          <BaseButton
            onClick={makeAccount}
            text={"新規作成"}
            color={"cp-white"}
            size={"small"}
          />
        </div>
      </div>
      <div className="px-5">
        <AccountSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* 件数表示 */}
      <div className="body-cp-small text-cp-slate-gray text-left pl-5 pt-5 pb-2">
        合計 {filteredAccounts.length}件
      </div>
      <div className="px-5 ">
        <AccountTable accounts={filteredAccounts} />
      </div>
    </div>
  );
}
