"use client";

import { useState } from "react";
import { HealthInformation } from "@/mocks/healthInformation";
import Pagination from "@/components/general/Pagination";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type Props = {
  healthInformation: HealthInformation[];
};

const PER_PAGE = 10;

export default function HealthInformationTable({ healthInformation }: Props) {
  const router = useRouter();
  // ページネーションの計算
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(healthInformation.length / PER_PAGE);
  const paginatedNotifications = healthInformation.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  // 編集ボタン
  const handleDetailClick = (id: number) => {
    router.push(
      `/${ROUTES.HEALTH_INFORMATION}/${ROUTES.HEALTH_INFORMATION_DETAIL}/${id}`
    );
  };

  // テーブルの要素
  const columns = [
    {
      label: "健康情報のタイトル",
      key: "title",
      className: "w-[600px]",
    },
    { label: "登録日", key: "registerDate", className: "w-[150px]" },
    {
      label: "表示期間",
      key: "displayDate",
      className: "w-[300px]",
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
            {paginatedNotifications.map((item) => (
              <tr
                onClick={() => handleDetailClick(item.id)}
                key={item.id}
                className="h-[40] text-left border-cp-soft-gray border-b cursor-pointer hover:bg-cp-ghost-white"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-2 py-1 text-cp-black body-cp-small"
                  >
                    {String(item[col.key as keyof typeof item] ?? "")}
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
