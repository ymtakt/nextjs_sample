"use client";

import { useState } from "react";

import BaseButton from "@/components/general/Button/BaseButton";
// import ButtonModal from "@/components/general/Modals/ButtonModal";
import ReferralCodeTable from "@/components/general/Tables/ReferralCodeManagement";
import ReferralCodeSearchForm, {
  ReferralCodeSearchParams,
} from "@/components/general/Tables/ReferralCodeManagementSearch";
import { mockReferralCodes, ReferralCode } from "@/mocks/referralCodes";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function UserManagement() {
  const router = useRouter();
  const [filteredReferralCodes, setFilteredReferralCodes] =
    useState<ReferralCode[]>(mockReferralCodes);

  const handleSearch = (params: ReferralCodeSearchParams) => {
    const filtered = mockReferralCodes.filter((code) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const codeValue = code[key as keyof typeof code];
        return codeValue?.toString().includes(value.toString());
      });
    });

    setFilteredReferralCodes(filtered);
  };

  const handleReset = () => {
    setFilteredReferralCodes(mockReferralCodes);
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
        合計 {filteredReferralCodes.length}件
      </div>
      <ReferralCodeTable referralCodes={filteredReferralCodes} />
    </div>
  );
}
