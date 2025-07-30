"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import BaseButton from "@/components/general/Button/BaseButton";
import {
  mockReferralCodes,
  ReferralCode,
} from "@/features/referral-code-management/mocks/referralCodes";
import ReferralCodeSearchForm, {
  ReferralCodeSearchParams,
} from "@/features/referral-code-management/components/ReferralCodeSearch";
import ReferralCodeTable from "@/features/referral-code-management/components/ReferralCodeTable";

export default function ReferralCodeManagement() {
  const router = useRouter();
  const [filteredTableItems, setFilteredTableItems] =
    useState<ReferralCode[]>(mockReferralCodes);

  const handleSearch = (params: ReferralCodeSearchParams) => {
    const filtered = mockReferralCodes.filter((item) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key as keyof typeof item];
        return itemValue?.toString().includes(value.toString());
      });
    });

    setFilteredTableItems(filtered);
  };

  const handleReset = () => {
    setFilteredTableItems(mockReferralCodes);
  };

  const makeReferralCode = () => {
    // TODO: ダウンロード処理を書く
    console.log("紹介コードの新規作成");
    router.push(
      `/${ROUTES.REFERRAL_CODE_MANAGEMENT}/${ROUTES.MAKE_REFERRAL_CODE}`
    );
  };

  return (
    <div className="">
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          紹介コード管理
        </p>
        <div className="py-2.5">
          <BaseButton
            onClick={makeReferralCode}
            text={"新規作成"}
            color={"cp-white"}
            size={"small"}
          />
        </div>
      </div>
      <ReferralCodeSearchForm onSearch={handleSearch} onReset={handleReset} />

      {/* 件数表示 */}
      <div className="pl-5 pb-1 body-cp-small text-cp-slate-gray text-left">
        合計 {filteredTableItems.length}件
      </div>
      <ReferralCodeTable referralCodes={filteredTableItems} />
    </div>
  );
}
