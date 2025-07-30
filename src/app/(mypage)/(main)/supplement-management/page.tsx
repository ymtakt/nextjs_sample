"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
import {
  mockSupplements,
  Supplement,
} from "@/features/supplement-management/mocks/supplement";
import SupplementSearchForm, {
  SupplementSearchParams,
} from "@/features/supplement-management/components/SupplementSearch";
import SupplementTable from "@/features/supplement-management/components/SupplementTable";

export default function SupplementManagement() {
  const router = useRouter();
  // テーブルのデータ
  const [filteredSupplement, setFilteredSupplement] =
    useState<Supplement[]>(mockSupplements);
  const handleSearch = (params: SupplementSearchParams) => {
    const filtered = mockSupplements.filter((supplement) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const codeValue = supplement[key as keyof typeof supplement];
        return codeValue?.toString().includes(value.toString());
      });
    });

    setFilteredSupplement(filtered);
  };

  const handleReset = () => {
    setFilteredSupplement(mockSupplements);
  };

  const makeReferralCode = () => {
    // TODO: 新規作成処理を書く
    console.log("サプリメントの新規作成");
    router.push(`/${ROUTES.SUPPLEMENT_MANAGEMENT}/${ROUTES.MAKE_SUPPLEMENT}`);
  };

  return (
    <div className="">
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          サプリメント管理
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
      <SupplementSearchForm onSearch={handleSearch} onReset={handleReset} />

      {/* 件数表示 */}
      <div className="pl-5 pb-1 body-cp-small text-cp-slate-gray text-left">
        合計 {filteredSupplement.length}件
      </div>
      <SupplementTable supplements={filteredSupplement} />
    </div>
  );
}
