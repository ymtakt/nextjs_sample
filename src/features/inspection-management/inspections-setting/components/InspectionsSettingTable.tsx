"use client";

import { useState } from "react";

import Pagination from "@/components/general/Pagination";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { InspectionSetting } from "@/mocks/inspectionSetting";

type Props = {
  inspectionSettings: InspectionSetting[];
};

const PER_PAGE = 10;

export default function InspectionSettingTable({ inspectionSettings }: Props) {
  const router = useRouter();
  // ページネーションの計算
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(inspectionSettings.length / PER_PAGE);
  const paginatedNotifications = inspectionSettings.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  // 編集ボタン
  const handleDetailClick = (id: number) => {
    router.push(
      `/${ROUTES.INSPECTION_MANAGEMENT}/${ROUTES.INSPECTION_SETTING}/${id}`
    );
  };

  // テーブルの要素
  const columns = [
    {
      label: "区分",
      key: "section",
      className: "w-[100px]",
    },
    { label: "検査名", key: "inspectionName", className: "w-[100px]" },
    {
      label: "検査項目",
      key: "inspectionItem",
      className: "w-[100px]",
    },
    {
      label: "公開設定",
      key: "publishSetting",
      className: "w-[100px]",
    },
  ];

  const statusStyles: Record<string, string> = {
    ON: "bg-cp-turquoise-blue/20 text-cp-blue",
    OFF: "bg-cp-red/20 text-cp-red",
  };

  return (
    <div className="">
      <div className="p-4 h-full bg-cp-white overflow-x-auto mx-auto rounded">
        {/* --- テーブル部分 --- */}

        <table className="min-w-[1000px] w-full">
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
            {paginatedNotifications.map((item) => (
              <tr
                onClick={() => handleDetailClick(item.id)}
                key={item.id}
                className="h-[40] text-left border-cp-soft-gray border-b cursor-pointer hover:bg-cp-ghost-white"
              >
                {columns.map((col) => {
                  const value = item[col.key as keyof InspectionSetting];
                  // 予約ステータスの処理
                  if (col.key === "publishSetting") {
                    const badgeClass = `inline-block w-[80px] text-center px-2 py-0.5 rounded text-sm font-medium ${
                      statusStyles[value as string] ??
                      "bg-gray-50 text-gray-500"
                    }`;
                    return (
                      <td key={col.key} className="px-2 py-1">
                        <span className={badgeClass}>{value}</span>
                      </td>
                    );
                  }
                  // 通常の表
                  return (
                    <td key={col.key} className="px-2 py-1 text-black">
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* --- ページネーション --- */}
      <div className="pb-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
