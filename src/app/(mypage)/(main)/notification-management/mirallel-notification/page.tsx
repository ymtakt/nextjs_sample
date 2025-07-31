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
  MirallelNotification,
  mockNotifications,
} from "@/features/notification-management/mocks/notifications";

import NotificationSearchForm, {
  NotificationSearchParams,
} from "@/features/notification-management/components/NotificationSearch";
import NotificationTable from "@/features/notification-management/components/NotificationTable";

export default function NotificationManagement() {
  // インスタンス化
  const router = useRouter();
  const searchParams = useSearchParams();

  // テーブル要素を組み合わせて追加
  const addTableItems = useCallback(
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

  // フィルターしたテーブル要素のステート
  const [filteredTableItems, setFilteredTableItems] = useState(() =>
    mockNotifications.map(addTableItems)
  );

  // 検索時の処理
  const handleSearch = useCallback(
    (params: NotificationSearchParams) => {
      // 表示用のデータを作成
      const added = mockNotifications.map(addTableItems);
      // フィルター処理
      const filtered = added.filter((item) => {
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
    [addTableItems]
  );

  // リセット時の処理
  const handleReset = () => {
    const resetData = mockNotifications.map(addTableItems);
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

  // TODO: お知らせの新規作成処理を書く
  const makeNemItem = () => {
    console.log("お知らせの新規作成");
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${ROUTES.MAKE_NOTIFICATION}`
    );
  };

  return (
    <div className="overflow-x-scroll">
      <div className="min-w-[1400px] w-full">
        {/* 検索フォーム */}
        <div>
          <NotificationSearchForm
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </div>

        {/* ボタンと件数表示 */}
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

        {/* テーブル */}
        <div>
          <NotificationTable notifications={filteredTableItems} />
        </div>
      </div>
    </div>
  );
}
