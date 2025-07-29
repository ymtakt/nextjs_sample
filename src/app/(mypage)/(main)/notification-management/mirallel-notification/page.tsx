"use client";

import { useCallback, useEffect, useState } from "react";
import BaseButton from "@/components/general/Button/BaseButton";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { MirallelNotification, mockNotifications } from "@/mocks/notifications";
import NotificationTable from "@/components/general/Tables/NotificationManagement";
import NotificationSearchForm, {
  NotificationSearchParams,
} from "@/components/general/TableSearches/NotificationManagementSearch";
import dayjs from "dayjs";

export default function NotificationManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const enrichNotification = useCallback(
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
  const [filteredNotifications, setFilteredNotifications] = useState(() =>
    mockNotifications.map(enrichNotification)
  );

  const handleSearch = useCallback(
    (params: NotificationSearchParams) => {
      // 表示用のデータを作成
      const enriched = mockNotifications.map(enrichNotification);
      // フィルター処理
      const filtered = enriched.filter((item) => {
        return Object.entries(params).every(([key, value]) => {
          if (!value) return true;
          const codeValue = item[key as keyof typeof item];
          // 完全一致させたいキー
          if (
            key === "displayIsShowHome" ||
            key === "displayIsPushNotification"
          ) {
            return codeValue === value;
          }
          // 通常は部分一致
          return codeValue?.toString().includes(value.toString());
        });
      });
      setFilteredNotifications(filtered);
    },
    [enrichNotification]
  );

  const handleReset = () => {
    const resetData = mockNotifications.map(enrichNotification);
    setFilteredNotifications(resetData);
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

  const makeNotification = () => {
    // TODO: ダウンロード処理を書く
    console.log("お知らせの新規作成");
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${ROUTES.MAKE_NOTIFICATION}`
    );
  };

  return (
    <div className="overflow-x-scroll">
      <div className="min-w-[1080px] w-full">
        <NotificationSearchForm onSearch={handleSearch} onReset={handleReset} />

        {/* 件数表示 */}
        <div className="pt-5 justify-between bg-cp-white">
          <div className="pr-5 text-right">
            <BaseButton
              onClick={makeNotification}
              text={"新規作成"}
              color={"cp-white"}
              size={"small"}
            />
          </div>
          <div className="pl-5 body-cp-small text-cp-slate-gray text-left ">
            合計 {filteredNotifications.length}件
          </div>
        </div>
        <NotificationTable notifications={filteredNotifications} />
      </div>
    </div>
  );
}
