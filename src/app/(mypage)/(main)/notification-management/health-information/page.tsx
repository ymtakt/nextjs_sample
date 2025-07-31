"use client";

// ネイティブライブラリ
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// 外部ライブラリ
import dayjs from "dayjs";
// 共通コンポーネント
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
// featureコンポーネント
import {
  HealthInformation,
  mockHealthInformation,
} from "@/features/notification-management/mocks/healthInformation";
import HealthInformationSearchForm, {
  HealthInformationSearchParams,
} from "@/features/notification-management/components/HealthInformationSearch";
import HealthInformationTable from "@/features/notification-management/components/HealthInformationTable";

export default function HealthInformationManagement() {
  // インスタンス化
  const router = useRouter();
  const searchParams = useSearchParams();

  // テーブル要素を組み合わせて追加
  const addTableItems = useCallback(
    (item: HealthInformation) => ({
      ...item,
      displayDate: `${dayjs(item.displayStartDate).format(
        "YYYY/MM/DD"
      )} ～ ${dayjs(item.displayEndDate).format("YYYY/MM/DD")}`,
    }),
    []
  );

  // フィルターしたテーブル要素のステート
  const [filteredTableItems, setFilteredTableItems] = useState<
    HealthInformation[]
  >(mockHealthInformation.map(addTableItems));

  // 検索時の処理
  const handleSearch = useCallback(
    (params: HealthInformationSearchParams) => {
      // 表示用のデータを作成
      const added = mockHealthInformation.map(addTableItems);
      // フィルター処理
      const filtered = added.filter((item) => {
        const itemStart = dayjs(item.displayStartDate);
        const itemEnd = dayjs(item.displayEndDate);
        // 開始日チェック
        if (params.displayStartDate) {
          const searchStart = dayjs(params.displayStartDate);
          if (itemStart.isBefore(searchStart, "day")) return false;
        }
        // 終了日チェック
        if (params.displayEndDate) {
          const searchEnd = dayjs(params.displayEndDate);
          if (itemEnd.isAfter(searchEnd, "day")) return false;
        }
        // 他の項目は部分一致で検索
        return Object.entries(params).every(([key, value]) => {
          if (!value) return true;
          if (key === "displayStartDate" || key === "displayEndDate")
            return true;
          const itemValue = item[key as keyof typeof item];
          return itemValue?.toString().includes(value.toString());
        });
      });
      setFilteredTableItems(filtered);
    },
    [addTableItems]
  );

  // リセット時の処理
  const handleReset = () => {
    const resetData = mockHealthInformation.map(addTableItems);
    setFilteredTableItems(resetData);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: HealthInformationSearchParams = {
      title: searchParams.get("title") || "",
      registerDate: searchParams.get("registerDate") || "",
      displayStartDate: searchParams.get("displayStartDate") || "",
      displayEndDate: searchParams.get("displayEndDate") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  // TODO: 健康情報の新規作成処理を書く
  const makeNewItem = () => {
    console.log("健康情報の新規作成");
    router.push(
      `/${ROUTES.HEALTH_INFORMATION}/${ROUTES.MAKE_HEALTH_INFORMATION}`
    );
  };

  return (
    <div className="overflow-x-scroll">
      {/* 検索フォーム */}
      <div className="min-w-[1000px] w-full">
        <HealthInformationSearchForm
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className="pt-5 justify-between bg-cp-white">
          {/* ボタンと件数表示 */}
          <div className="pr-5 text-right">
            <BaseButton
              onClick={makeNewItem}
              text={"新規作成"}
              color={"cp-white"}
              size={"small"}
            />
          </div>
          <div className="pl-5 body-cp-small text-cp-slate-gray text-left ">
            合計 {filteredTableItems.length}件
          </div>
        </div>

        {/* テーブル */}
        <div>
          <HealthInformationTable healthInformation={filteredTableItems} />
        </div>
      </div>
    </div>
  );
}
