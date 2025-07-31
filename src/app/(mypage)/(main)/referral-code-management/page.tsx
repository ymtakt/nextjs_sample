"use client";

// ネイティブライブラリ
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// 共通コンポーネント
import { ROUTES } from "@/constants/routes";
import BaseButton from "@/components/general/Button/BaseButton";
// featureコンポーネント
import {
  mockReferralCodes,
  ReferralCode,
} from "@/features/referral-code-management/mocks/referralCodes";
import ReferralCodeSearchForm, {
  ReferralCodeSearchParams,
} from "@/features/referral-code-management/components/ReferralCodeSearch";
import ReferralCodeTable from "@/features/referral-code-management/components/ReferralCodeTable";

export default function ReferralCodeManagement() {
  // インスタンス化
  const router = useRouter();
  const searchParams = useSearchParams();

  // フィルターしたテーブル要素のステート
  const [filteredTableItems, setFilteredTableItems] =
    useState<ReferralCode[]>(mockReferralCodes);

  // 検索時の処理
  const handleSearch = useCallback((params: ReferralCodeSearchParams) => {
    const filtered = mockReferralCodes.filter((item) => {
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
    setFilteredTableItems(mockReferralCodes);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: ReferralCodeSearchParams = {
      id: searchParams.get("id") || "",
      referralCode: searchParams.get("referralCode") || "",
      referredName: searchParams.get("referredName") || "",
      section: searchParams.get("section") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  // TODO: ダウンロード処理を書く
  const makeReferralCode = () => {
    console.log("紹介コードの新規作成");
    router.push(
      `/${ROUTES.REFERRAL_CODE_MANAGEMENT}/${ROUTES.MAKE_REFERRAL_CODE}`
    );
  };

  return (
    <div>
      {/* タイトル */}
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

      {/* 検索フォーム */}
      <div>
        <ReferralCodeSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* 件数表示 */}
      <div className="pl-5 pb-1 body-cp-small text-cp-slate-gray text-left">
        合計 {filteredTableItems.length}件
      </div>

      {/* テーブル */}
      <div>
        <ReferralCodeTable referralCodes={filteredTableItems} />
      </div>
    </div>
  );
}
