"use client";

import { useState } from "react";
import { MirallelNotification } from "@/features/notification-management/mocks/notifications";
import Pagination from "@/components/general/Pagination";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type Props = {
  notifications: MirallelNotification[];
};

const PER_PAGE = 10;

export default function NotificationTable({ notifications }: Props) {
  const router = useRouter();
  // ページネーションの計算
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notifications.length / PER_PAGE);
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  // 編集ボタン
  const handleDetailClick = (id: number) => {
    router.push(
      `${ROUTES.NOTIFICATION_MANAGEMENT}${ROUTES.NOTIFICATION_DETAIL}/${id}`
    );
  };

  // テーブルの要素
  const columns = [
    {
      label: "お知らせのタイトル",
      key: "title",
      className: "w-[280px]",
    },
    { label: "登録日", key: "registerDate", className: "w-[150px]" },
    {
      label: "ホーム画面に表示設定",
      key: "displayIsShowHome",
      className: "w-[200px]",
    },
    {
      label: "表示させる場合の表示期間",
      key: "displayDate",
      className: "w-[300px]",
    },
    {
      label: "お知らせ配信対象者",
      key: "targetAudience",
      className: "w-[200px]",
    },
    {
      label: "push通知設定",
      key: "displayIsPushNotification",
      className: "w-[150px]",
    },
  ];

  return (
    <div className="">
      <div className="px-4 pb-4 w-full bg-cp-white rounded">
        {/* --- テーブル部分 --- */}

        <table className="">
          <thead>
            <tr className="h-[40px] text-left title-cp-small px-2.5 text-cp-sky-blue bg-cp-white border-cp-soft-gray border-b">
              {columns.map((col) => (
                <th key={col.key} className={`${col.className} pl-2.5`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedNotifications.map((notification) => (
              <tr
                onClick={() => handleDetailClick(notification.id)}
                key={notification.id}
                className="h-[40] text-left border-cp-soft-gray border-b cursor-pointer hover:bg-cp-ghost-white"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-2 py-1 text-cp-black body-cp-small"
                  >
                    {String(
                      notification[col.key as keyof typeof notification] ?? ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* --- ページネーション --- */}
        <div className="pb-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
