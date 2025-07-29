"use client";

import { useState } from "react";
import BaseButton from "@/components/general/Button/BaseButton";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { MirallelNotification, mockNotifications } from "@/mocks/notifications";
import NotificationTable from "@/components/general/Tables/NotificationManagement";
import NotificationSearchForm, {
  NotificationSearchParams,
} from "@/components/general/TableSearches/NotificationManagementSearch";
import dayjs from "dayjs";

export default function NotificationManagement() {
  const router = useRouter();
  const getDisplayIsShowHome = (value: boolean) => (value ? "表示" : "非表示");
  const getDisplayIsPushNotification = (value: boolean) =>
    value ? "ON" : "OFF";
  const [filteredNotifications, setFilteredNotifications] =
    useState<MirallelNotification[]>(mockNotifications);

  const handleSearch = (params: NotificationSearchParams) => {
    // 表示用のデータを作成
    const enriched = mockNotifications.map((item) => ({
      ...item,
      displayDate: `${dayjs(item.displayStartDate).format(
        "YYYY/MM/DD"
      )} ～ ${dayjs(item.displayEndDate).format("YYYY/MM/DD")}`,
      displayIsShowHome: getDisplayIsShowHome(item.isShowHome),
      displayIsPushNotification: getDisplayIsPushNotification(
        item.isPushNotification
      ),
    }));
    // フィルター処理
    const filtered = enriched.filter((item) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const codeValue = item[key as keyof typeof item];
        // 完全一致させたいキーだけ === にする
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
  };

  const handleReset = () => {
    const resetData = mockNotifications.map((item) => ({
      ...item,
      displayDate: `${dayjs(item.displayStartDate).format(
        "YYYY/MM/DD"
      )} ～ ${dayjs(item.displayEndDate).format("YYYY/MM/DD")}`,
      displayIsShowHome: getDisplayIsShowHome(item.isShowHome),
      displayIsPushNotification: getDisplayIsPushNotification(
        item.isPushNotification
      ),
    }));
    setFilteredNotifications(resetData);
  };

  const makeNotification = () => {
    // TODO: ダウンロード処理を書く
    console.log("お知らせの新規作成");
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${ROUTES.MAKE_NOTIFICATION}`
    );
  };

  return (
    <div className="">
      <NotificationSearchForm onSearch={handleSearch} onReset={handleReset} />

      {/* 件数表示 */}
      <div className="px-5 flex justify-between">
        <div className="pl-5 pb-1 body-cp-small text-cp-slate-gray text-left">
          合計 {filteredNotifications.length}件
        </div>
        <div className="py-2.5">
          <BaseButton
            onClick={makeNotification}
            text={"新規作成"}
            color={"cp-white"}
            size={"small"}
          />
        </div>
      </div>
      <NotificationTable notifications={filteredNotifications} />
    </div>
  );
}
