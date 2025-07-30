"use client";

import { useState } from "react";
import Pagination from "@/components/general/Pagination";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Consultation } from "@/mocks/consultations";

type Props = {
  consultations: Consultation[];
};

const USERS_PER_PAGE = 10;

export default function ConsultationTable({ consultations }: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(consultations.length / USERS_PER_PAGE);

  const paginatedConsultations = consultations.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleRowClick = (id: number) => {
    router.push(
      `/${ROUTES.CONSULTATION_RESERVATION}/${id}/${ROUTES.EDIT_CONSULTATION}`
    );
  };

  const columns = [
    { label: "相談日", key: "consultationDate", className: "w-[92px]" },
    { label: "ミラレルID", key: "mirallelId", className: "w-[108px]" },
    { label: "予約者名", key: "reservationName", className: "w-[108px]" },
    { label: "相談者名", key: "consultantName", className: "w-[91px]" },
    { label: "担当者名", key: "staffAssigned", className: "w-[108px]" },
    { label: "相談種類", key: "consultationType", className: "w-[132px]" },
    { label: "紹介コード", key: "referralCode", className: "w-[108px]" },
    { label: "紹介者名", key: "referralName", className: "w-[108px]" },
    {
      label: "予約ステータス",
      key: "reservationStatus",
      className: "w-[148px]",
    },
  ];

  const statusStyles: Record<string, string> = {
    本登録: "bg-cp-turquoise-blue/20 text-cp-blue",
    却下: "bg-cp-red/20 text-cp-red",
    仮登録: "bg-cp-light-gray text-cp-gray",
  };

  return (
    <div className="">
      <div className="p-4 h-full bg-cp-white overflow-x-auto mx-auto rounded">
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
            {paginatedConsultations.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                className="h-10 text-left cursor-pointer hover:bg-cp-ghost-white border-cp-soft-gray border-b"
              >
                {columns.map((col) => {
                  const value = item[col.key as keyof Consultation];
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
            ))}
          </tbody>
        </table>
      </div>

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
