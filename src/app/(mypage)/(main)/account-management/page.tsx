"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import BaseButton from "@/components/general/Button/BaseButton";
import {
  Account,
  mockAccounts,
} from "@/features/account-management/mocks/accounts";
import AccountSearchForm, {
  AccountSearchParams,
} from "@/features/account-management/components/AccountSearch";
import AccountTable from "@/features/account-management/components/AccountTable";

export default function AccountManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredTableItems, setFilteredTableItems] =
    useState<Account[]>(mockAccounts);

  const handleSearch = useCallback((params: AccountSearchParams) => {
    const filtered = mockAccounts.filter((item) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key as keyof typeof item];
        return itemValue?.toString().includes(value.toString());
      });
    });

    setFilteredTableItems(filtered);
  }, []);

  const handleReset = () => {
    setFilteredTableItems(mockAccounts);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: AccountSearchParams = {
      accountId: searchParams.get("accountId") || "",
      accountName: searchParams.get("accountName") || "",
      displayName: searchParams.get("displayName") || "",
      accountAuthority: searchParams.get("accountAuthority") || "",
      accountLicense: searchParams.get("accountLicense") || "",
      mail: searchParams.get("mail") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  const makeAccount = () => {
    // TODO: 新規作成処理を書く
    console.log("アカウントの新規作成");
    router.push(`/${ROUTES.ACCOUNT_MANAGEMENT}/${ROUTES.MAKE_ACCOUNT}`);
  };

  return (
    <div className="">
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          アカウント管理
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
        合計 {filteredTableItems.length}件
      </div>
      <div className="px-5 ">
        <AccountTable accounts={filteredTableItems} />
      </div>
    </div>
  );
}
