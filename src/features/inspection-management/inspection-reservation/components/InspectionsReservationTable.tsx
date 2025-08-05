"use client";

import { useState } from "react";

import Pagination from "@/components/general/Pagination";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { InspectionReservation } from "@/features/inspection-management/inspection-reservation/mocks/inspectionReservation";

type Props = {
  inspectionReservations: InspectionReservation[];
};

const PER_PAGE = 10;

export default function InspectionReservationTable({
  inspectionReservations,
}: Props) {
  const router = useRouter();
  // ページネーションの計算
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(inspectionReservations.length / PER_PAGE);
  const paginatedData = inspectionReservations.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  // 編集ボタン
  const handleDetailClick = (reservationId: number) => {
    router.push(
      `${ROUTES.NOTIFICATION_MANAGEMENT}${ROUTES.NOTIFICATION_DETAIL}/${reservationId}`
    );
  };

  // テーブルの要素
  const columns = [
    {
      label: "予約番号",
      key: "reservationId",
      className: "w-[280px]",
    },
    { label: "検査日", key: "inspectionDate", className: "w-[150px]" },
    {
      label: "ミラレルID",
      key: "mirallelId",
      className: "w-[200px]",
    },
    {
      label: "受診者名",
      key: "medicalExaminee",
      className: "w-[300px]",
    },
    {
      label: "予約者名",
      key: "reservationName",
      className: "w-[200px]",
    },
    {
      label: "医療機関名",
      key: "medicalInstitution",
      className: "w-[150px]",
    },
    {
      label: "検査項目",
      key: "inspectionItem",
      className: "w-[150px]",
    },
    {
      label: "予約日",
      key: "reservationDate",
      className: "w-[150px]",
    },
    {
      label: "紹介コード",
      key: "referralCode",
      className: "w-[150px]",
    },
    {
      label: "予約ステータス",
      key: "reservationStatus",
      className: "w-[150px]",
    },
  ];

  const statusStyles: Record<string, string> = {
    本登録: "bg-cp-turquoise-blue/20 text-cp-blue",
    却下: "bg-cp-red/20 text-cp-red",
    仮登録: "bg-cp-light-gray text-cp-gray",
  };

  return (
    <div>
      <div className="p-4 h-full bg-cp-white overflow-x-auto mx-auto rounded">
        {/* --- テーブル部分 --- */}

        <table className="min-w-[1600px] w-full">
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
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-cp-gray py-4"
                >
                  データがありません
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  onClick={() => handleDetailClick(item.reservationId)}
                  key={item.reservationId}
                  className="h-[40] text-left border-cp-soft-gray border-b cursor-pointer hover:bg-cp-ghost-white"
                >
                  {columns.map((col) => {
                    const value = item[col.key as keyof InspectionReservation];
                    // 予約ステータスの処理
                    if (col.key === "reservationStatus") {
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
              ))
            )}
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
