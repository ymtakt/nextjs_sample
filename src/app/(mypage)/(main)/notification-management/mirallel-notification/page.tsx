"use client";

import { useCallback, useEffect, useState } from "react";
import BaseButton from "@/components/general/Button/BaseButton";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import {
  MirallelNotification,
  mockNotifications,
} from "@/features/notification-management/mocks/notifications";
import dayjs from "dayjs";
import NotificationSearchForm, {
  NotificationSearchParams,
} from "@/features/notification-management/components/NotificationSearch";
import NotificationTable from "@/features/notification-management/components/NotificationTable";

export default function NotificationManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const enrichTableItems = useCallback(
    (item: MirallelNotification) => ({
      ...item,
      displayDate: `${dayjs(item.displayStartDate).format(
        "YYYY/MM/DD"
      )} ～ ${dayjs(item.displayEndDate).format("YYYY/MM/DD")}`,
      displayIsShowHome: item.isShowHome ? "表示" : "非表示",
      displayIsPushNotification: item.isPushNotification ? "ON" : "OFF",
    }),
    []
  );
  const [filteredTableItems, setFilteredTableItems] = useState(() =>
    mockNotifications.map(enrichTableItems)
  );

  const handleSearch = useCallback(
    (params: NotificationSearchParams) => {
      // 表示用のデータを作成
      const enriched = mockNotifications.map(enrichTableItems);
      // フィルター処理
      const filtered = enriched.filter((item) => {
        return Object.entries(params).every(([key, value]) => {
          if (!value) return true;
          const itemValue = item[key as keyof typeof item];
          // 完全一致させたいキー
          if (
            key === "displayIsShowHome" ||
            key === "displayIsPushNotification"
          ) {
            return itemValue === value;
          }
          // 通常は部分一致
          return itemValue?.toString().includes(value.toString());
        });
      });
      setFilteredTableItems(filtered);
    },
    [enrichTableItems]
  );

  const handleReset = () => {
    const resetData = mockNotifications.map(enrichTableItems);
    setFilteredTableItems(resetData);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: NotificationSearchParams = {
      title: searchParams.get("title") || "",
      displayIsShowHome: searchParams.get("displayIsShowHome") || "",
      displayIsPushNotification:
        searchParams.get("displayIsPushNotification") || "",
      targetAudience: searchParams.get("targetAudience") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  const makeNemItem = () => {
    // TODO: お知らせの新規作成処理を書く
    console.log("お知らせの新規作成");
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${ROUTES.MAKE_NOTIFICATION}`
    );
  };

  return (
    <div className="overflow-x-scroll">
      <div className="min-w-[1400px] w-full">
        <NotificationSearchForm onSearch={handleSearch} onReset={handleReset} />

        {/* 件数表示 */}
        <div className="pt-5 justify-between bg-cp-white">
          <div className="pr-5 text-right">
            <BaseButton
              onClick={makeNemItem}
              text={"新規作成"}
              color={"cp-white"}
              size={"small"}
            />
          </div>
          <div className="pl-5 body-cp-small text-cp-slate-gray text-left ">
            合計 {filteredTableItems.length}件
          </div>
        </div>
        <NotificationTable notifications={filteredTableItems} />
      </div>
    </div>
  );
}
