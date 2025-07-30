"use client";

import { useCallback, useEffect, useState } from "react";
import BaseButton from "@/components/general/Button/BaseButton";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import dayjs from "dayjs";
import {
  HealthInformation,
  mockHealthInformation,
} from "@/mocks/healthInformation";
import HealthInformationSearchForm, {
  HealthInformationSearchParams,
} from "@/features/notification-management/components/HealthInformationSearch";
import HealthInformationTable from "@/features/notification-management/components/HealthInformationTable";

export default function HealthInformationManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const enrichTableItems = useCallback(
    (item: HealthInformation) => ({
      ...item,
      displayDate: `${dayjs(item.displayStartDate).format(
        "YYYY/MM/DD"
      )} ～ ${dayjs(item.displayEndDate).format("YYYY/MM/DD")}`,
    }),
    []
  );

  const [filteredTableItems, setFilteredTableItems] = useState<
    HealthInformation[]
  >(mockHealthInformation.map(enrichTableItems));

  const handleSearch = useCallback(
    (params: HealthInformationSearchParams) => {
      // 表示用のデータを作成
      const enriched = mockHealthInformation.map(enrichTableItems);
      // フィルター処理
      const filtered = enriched.filter((item) => {
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
    [enrichTableItems]
  );

  const handleReset = () => {
    const resetData = mockHealthInformation.map(enrichTableItems);
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

  const makeNewItem = () => {
    // TODO: 健康情報の新規作成処理を書く
    console.log("健康情報の新規作成");
    router.push(
      `/${ROUTES.HEALTH_INFORMATION}/${ROUTES.MAKE_HEALTH_INFORMATION}`
    );
  };

  return (
    <div className="overflow-x-scroll">
      <div className="min-w-[1000px] w-full">
        <HealthInformationSearchForm
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* 件数表示 */}
        <div className="pt-5 justify-between bg-cp-white">
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
        <HealthInformationTable healthInformation={filteredTableItems} />
      </div>
    </div>
  );
}
