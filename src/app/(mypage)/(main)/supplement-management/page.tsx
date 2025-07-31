"use client";

// ネイティブライブラリ
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// 共通コンポーネント
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
// featureコンポーネント
import {
  mockSupplements,
  Supplement,
} from "@/features/supplement-management/mocks/supplement";
import SupplementSearchForm, {
  SupplementSearchParams,
} from "@/features/supplement-management/components/SupplementSearch";
import SupplementTable from "@/features/supplement-management/components/SupplementTable";

export default function SupplementManagement() {
  // インスタンス化
  const router = useRouter();
  const searchParams = useSearchParams();

  // フィルターしたテーブル要素のステート
  const [filteredTableItems, setFilteredTableItems] =
    useState<Supplement[]>(mockSupplements);

  // 検索時の処理
  const handleSearch = useCallback((params: SupplementSearchParams) => {
    const filtered = mockSupplements.filter((item) => {
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
    setFilteredTableItems(mockSupplements);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: SupplementSearchParams = {
      id: searchParams.get("id") || "",
      registerDate: searchParams.get("registerDate") || "",
      supplementName: searchParams.get("supplementName") || "",
      supplementBrand: searchParams.get("supplementBrand") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  // TODO: 新規作成処理を書く
  const makeNewItem = () => {
    console.log("サプリメントの新規作成");
    router.push(`/${ROUTES.SUPPLEMENT_MANAGEMENT}/${ROUTES.MAKE_SUPPLEMENT}`);
  };

  return (
    <div>
      {/* タイトル */}
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          サプリメント管理
        </p>
        <div className="py-2.5">
          <BaseButton
            onClick={makeNewItem}
            text={"新規作成"}
            color={"cp-white"}
            size={"small"}
          />
        </div>
      </div>

      {/* 検索フォーム */}
      <div>
        <SupplementSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* 件数表示 */}
      <div className="pl-5 pb-1 body-cp-small text-cp-slate-gray text-left">
        合計 {filteredTableItems.length}件
      </div>

      {/* テーブル */}
      <div>
        <SupplementTable supplements={filteredTableItems} />
      </div>
    </div>
  );
}
